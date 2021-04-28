<template>

    <div style="width: 100%; position: relative; z-index: 0; text-align: left;" id="ddd-scene-parent" class="ddd-scene-parent">

        <canvas class="ddd-scene" id="ddd-scene" style="width: 100%; outline:none; height: 100%;">
        </canvas>

        <div class="ddd-scene-overlay" id="ddd-scene-overlay" style="width: 100%; height: 100%; position: absolute; z-index: 2; top: 0px; pointer-events: none;">
            <SceneViewMode v-if="myViewerState.sceneVisible && myViewerState.sceneViewModeShow" :viewerState="myViewerState" />
        </div>

    </div>

</template>

<script>

import * as olProj from 'ol/proj';
import * as extent from 'ol/extent';
import 'babylonjs-loaders';
//import waterMaterial from '@/plugins/js/waterMaterial.js';

import SceneViewer from '@/dddviewer/SceneViewer.js';
import ModelGeoTileLayer3D from '@/dddviewer/layers/ModelGeoTileLayer3D.js';
import SceneViewMode from '@/components/scene/SceneViewMode.vue';

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  components: {
      SceneViewMode
  },
  data() {
    return {
    }
  },
  props: [
      //'viewerState',
  ],
  inject: [
      'getViewerState',
      'setSceneViewer',
  ],
  computed: {
      'myViewerState': function() {return this.getViewerState();}
  },
  beforeDestroy() {
      console.debug("Disposing BabylonJS scene.");
      window.removeEventListener('resize', this.resize);
      clearTimeout(this._timeout);
      this.sceneViewer.dispose();
      this.getViewerState().sceneViewer = null;
      this.sceneViewer = null;
  },
  mounted() {
    console.debug('Creating 3D scene.');

    this.sceneParent = this.$el; // .querySelector('.ddd-scene-parent');

    const height = window.innerHeight - 40;
    //console.debug("Resizing 3D canvas: " + height);
    this.$el.querySelector('.ddd-scene').style.height = height + "px";
    if (this.$el.querySelector('canvas')) { this.$el.querySelector('canvas').height = height; }
    //this.map.updateSize();

    const canvas = document.getElementById('ddd-scene');

    this.sceneViewer = new SceneViewer(this.getViewerState());
    this.setSceneViewer(this.sceneViewer);  // Set the reference to App so it can be accessed by other components
    this.sceneViewer.initialize(canvas);
    //this.getViewerState().sceneViewer = this.sceneViewer;  // Suspicious: setting sceneViewer as part of a Vue component?

    const layerDddOsm3d = new ModelGeoTileLayer3D();
    this.sceneViewer.layerManager.addLayer("ddd-osm-3d", layerDddOsm3d);

    // Events
    window.addEventListener('resize', this.resize);

    // Filter drag event for clicks
    let drag = false;
    let that = this;
    canvas.addEventListener('pointerdown', () => {drag = false;});
    canvas.addEventListener('pointermove', () => {drag = true;});
    canvas.addEventListener('pointerup', () => {if (!drag) { that.click(); } } );
    //canvas.addEventListener('click', () => { that.click(); } );

    //canvas.addEventListener('keydown', (e) => { if (e.keyCode === 16) { that.cycleMoveSpeed(); } });
    canvas.addEventListener('keyup', (e) => { if (e.keyCode === 16) { that.cycleMoveSpeed(); } });

    let timeSkipIntervalSec = 30 * 60;
    canvas.addEventListener('keyup', (e) => { if (String.fromCharCode(e.which) === 'N') { that.cycleTime(-timeSkipIntervalSec); } });
    canvas.addEventListener('keyup', (e) => { if (String.fromCharCode(e.which) === 'M') { that.cycleTime(timeSkipIntervalSec); } });

    this._timeout = setTimeout(this.checkUpdateHref, 1500);

    // Resize initially
    //setTimeout(() => { this.resize(); }, 100);
    this.sceneViewer.engine.resize();

  },

  methods: {

      checkUpdateHref: function() {

          // Check movement and camera are stopped

          // Update route
          const posString = this.sceneViewer.positionString();

          if (posString !== null) {

              localStorage.setItem('dddLastPositionString', posString);

              //this.$router.replace('/maps/' + posString);
              if (this.$route.name === 'sceneMain') {
                  this.$router.replace('/3d/' + posString).catch(()=>{});
              } else if (this.$route.name === 'scenePos') {
                  this.$router.replace('/3d/pos/' + posString).catch(()=>{});
              } else if (this.$route.name === 'sceneItem')  {
                  this.$router.replace('/3d/item/' + this.$route.params.id + '/' + posString).catch(()=>{});
              }
          }

          this._timeout = setTimeout(this.checkUpdateHref, 1500);

      },

      cycleMoveSpeed: function() {
          this.sceneViewer.cycleMoveSpeed();
      },

      resize: function() {

        console.debug("Resizing DDDScene.");
        if (!this.sceneParent) { return; }

        let panel = document.querySelector('.ddd-front .row div');
        //let panel = this.$refs.dddViewPanel;


        let width = null;
        let height = window.innerHeight;
        if (this.sceneParent.parentNode.id === 'ddd-scene-insert') {
            width = this.sceneParent.parentNode.clientWidth;
            height = this.sceneParent.parentNode.clientHeight;
        } else {
            width = document.body.clientWidth - (panel ? panel.offsetWidth : 0);
            height = window.innerHeight - 40;
        }

        let el = this.sceneParent.querySelector('.ddd-scene');
        if (el) {
            //console.debug("Resizing scene: " + width + " " + height);
            el.style.height = height + "px";
            el.style.width = width + "px";
        }

        let elOverlay = this.sceneParent.querySelector('.ddd-scene-overlay');
        if (elOverlay) {
            //console.debug("Resizing scene: " + width + " " + height);
            //el.style.height = height + "px";
            elOverlay.style.height = height + "px";
            elOverlay.style.width = width + "px";
        }

        this.sceneViewer.engine.resize();
      },

      addLayer: function(layer) {
          console.debug("Adding layer: " + layer);
      },

      cycleTime: function(seconds) {
            this.sceneViewer.viewerState.positionDate.setSeconds(this.sceneViewer.viewerState.positionDate.getSeconds() + seconds);
            this.sceneViewer.viewerState.positionDateSeconds = this.sceneViewer.viewerState.positionDate / 1000;
            this.sceneViewer.lightSetupFromDatePos();
      },

      click: function() {

        if (! this.getViewerState().scenePickingEnabled) { return; }

        // Easy way of computing dragging (still clicks if mouse is stopped before button release
        if (this.sceneViewer.camera.inertialAlphaOffset || this.sceneViewer.camera.inertialBetaOffset) {
            return;
        }
        event.preventDefault();

        const pickResult = this.sceneViewer.scene.pick(this.sceneViewer.scene.pointerX, this.sceneViewer.scene.pointerY);

        //console.debug("Scene click: " + pickResult.pickedMesh.id);
        //console.log(pickResult.pickedMesh.id);
        //console.log(pickResult);

        // Direct to /3d/mesh/
        //const point = olProj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        //const pointString = point[1].toFixed(7) + "," + point[0].toFixed(7);
        //const posString = this.positionString();

        if (!pickResult.pickedMesh || pickResult.pickedMesh.id === "skyBox") {
            this.$router.push('/3d/pos/').catch(()=>{});
            return;
        } else {
            //that.$router.push('/3d/item/test/').catch(()=>{});

            this.sceneViewer.selectMesh(pickResult.pickedMesh);

            // WARN: TODO: this transformation is done in other places
            let meshName = pickResult.pickedMesh.id.split("/").pop().replaceAll('#', '_'); // .replaceAll("_", " ");
            this.$router.push('/3d/item/' + meshName + '/' + this.sceneViewer.positionString()).catch(()=>{});

            return;
        }
    }


  }

}
</script>
