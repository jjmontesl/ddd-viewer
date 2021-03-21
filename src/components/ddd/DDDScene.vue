<template>

    <div style="width: 100%; position: relative; z-index: 0;" id="ddd-scene-parent">
        <canvas class="ddd-scene" id="ddd-scene" style="width: 100%; outline:none; height: 100px;">
        </canvas>
    </div>

</template>

<script>

import * as olProj from 'ol/proj';
import * as extent from 'ol/extent';
import 'babylonjs-loaders';
//import waterMaterial from '@/plugins/js/waterMaterial.js';

import SceneViewer from '@/dddviewer/SceneViewer.js';
import ModelGeoTileLayer3D from '@/dddviewer/layers/ModelGeoTileLayer3D.js';

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
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
  ],
  computed: {
      //'viewerState': function() {return this.getViewerState();}
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

    const height = window.innerHeight - 40;
    //console.debug("Resizing 3D canvas: " + height);
    this.$el.querySelector('.ddd-scene').style.height = height + "px";
    if (this.$el.querySelector('canvas')) { this.$el.querySelector('canvas').height = height; }
    //this.map.updateSize();

    const canvas = document.getElementById('ddd-scene');

    this.sceneViewer = new SceneViewer(this.getViewerState());
    this.sceneViewer.initialize(canvas);
    this.getViewerState().sceneViewer = this.sceneViewer;

    const layerDddOsm3d = new ModelGeoTileLayer3D();
    this.sceneViewer.layerManager.addLayer("ddd-osm-3d", layerDddOsm3d);

    // Events
    window.addEventListener('resize', this.resize);

    // Filter drag event for clicks
    let drag = false;
    let that = this;
    canvas.addEventListener('mousedown', () => {drag = false;});
    canvas.addEventListener('mousemove', () => {drag = true;});
    canvas.addEventListener('mouseup', () => {if (!drag) { that.click(); } } );

    //canvas.addEventListener('keydown', (e) => { if (e.keyCode === 16) { that.setSlow(true); } });
    canvas.addEventListener('keyup', (e) => { if (e.keyCode === 16) { that.setSlow(false); } });

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

          //this.$router.replace('/maps/' + posString);
          if (this.$route.name === 'sceneMain') {
              this.$router.push('/3d/' + posString).catch(()=>{});
          } else if (this.$route.name === 'scenePos') {
              this.$router.push('/3d/pos/' + posString).catch(()=>{});
          } else if (this.$route.name === 'sceneItem')  {
              this.$router.push('/3d/item/' + this.$route.params.id + '/' + posString).catch(()=>{});
          }

          this._timeout = setTimeout(this.checkUpdateHref, 1500);

      },

      setSlow: function(slow) {
          if (this.sceneViewer.camera.speed < 1.0) {
              this.sceneViewer.camera.speed = 1.0;
          } else if (this.sceneViewer.camera.speed < 3.0) {
              this.sceneViewer.camera.speed = 3.0;
          //} else if (this.sceneViewer.camera.speed < 2.5) {
          } else {
              this.sceneViewer.camera.speed = 0.35;
          }
        //this.sceneViewer.camera.speed = (slow ? 0.5 : 2.5);
      },

      resize: function() {
        const height = window.innerHeight - 40;
        let el = this.$el.querySelector('.ddd-scene');
        if (el) {
            console.debug("Resizing scene: " + height);
            el.style.height = height + "px";
            //if (this.$el.querySelector('canvas')) { this.$el.querySelector('canvas').height = height; }
        }
        this.sceneViewer.engine.resize();
      },

      addLayer: function(layer) {
          console.debug("Adding layer: " + layer);
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

        if (pickResult.pickedMesh.id === "skyBox") {
            this.$router.push('/3d/pos/').catch(()=>{});
            return;
        } else {
            //that.$router.push('/3d/item/test/').catch(()=>{});

            this.sceneViewer.selectMesh(pickResult.pickedMesh);

            // WARN: TODO: this transformation is done in other places
            let meshName = pickResult.pickedMesh.id.split("/").pop().replaceAll('#', '_'); // .replaceAll("_", " ");
            this.$router.push('/3d/item/' + meshName + '/' + this.sceneViewer.positionString()).catch(()=>{});

            //this.sceneViewer.engine.switchFullscreen(true);

            return;
        }
    }


  }

}
</script>
