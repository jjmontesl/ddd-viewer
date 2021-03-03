<template>

    <div style="width: 100%; height: 100px; position: relative; z-index: 0;">
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
      'getViewerState'
  ],
  computed: {
      //'viewerState': function() {return this.getViewerState();}
  },
  beforeDestroy() {
      console.debug("Disposing BabylonJS scene.");
      this.sceneViewer.dispose();
      window.removeEventListener('resize', this.resize);
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

    // Resize initially
    //setTimeout(() => { this.resize(); }, 100);
    this.sceneViewer.engine.resize();

  },

  methods: {

      resize: function() {
        const height = window.innerHeight - 40;
        //console.debug("Resizing map: " + height);
        this.$el.querySelector('.ddd-scene').style.height = height + "px";
        if (this.$el.querySelector('canvas')) { this.$el.querySelector('canvas').height = height; }
        this.sceneViewer.engine.resize();
      },

      addLayer: function(layer) {
          console.debug("Adding layer: " + layer);
      },

      click: function() {

        // Easy way of computing dragging (still clicks if mouse is stopped before button release
        if (this.sceneViewer.camera.inertialAlphaOffset || this.sceneViewer.camera.inertialBetaOffset) {
            return;
        }
        event.preventDefault();

        const pickResult = this.sceneViewer.scene.pick(this.sceneViewer.scene.pointerX, this.sceneViewer.scene.pointerY);

        console.debug("Scene click: " + pickResult.pickedMesh.id);
        //console.log(pickResult.pickedMesh.id);
        console.log(pickResult);

        // Direct to /3d/mesh/
        //const point = olProj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        //const pointString = point[1].toFixed(7) + "," + point[0].toFixed(7);
        //const posString = this.positionString();

        if (pickResult.pickedMesh.id === "skyBox") {
            this.$router.push('/3d/pos/').catch(()=>{});
            return;
        } else {
            this.$router.push('/3d/item/' + pickResult.pickedMesh.id).catch(()=>{});
            //that.$router.push('/3d/item/test/').catch(()=>{});

            // Highlight
            //that.highlightLayer.addMesh(pickResult.pickedMesh, BABYLON.Color3.White()); // , true);
            //pickResult.pickedMesh.material = that.materialHighlight;
            //pickResult.pickedMesh.material = that.materialGrass;
            pickResult.pickedMesh.showBoundingBox = true;

            //this.sceneViewer.engine.switchFullscreen(true);

            return;
        }
    }


  }

}
</script>
