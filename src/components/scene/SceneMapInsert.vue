<template>

    <div style="position: fixed; left: 10px; bottom: 10px; padding: 0px; pointer-events: auto;">

        <v-card class="pa-1" outlined>

            <!-- <v-card-title style="padding: 0px;">Position</v-card-title> -->

            <v-card-text style="padding: 0px;" class="text-left">
                <div class="ddd-map-insert" id="ddd-map-insert" style="height: 140px; width: 140px;">
                </div>
            </v-card-text>

        </v-card>

    </div>

</template>

<script>
import 'ol/ol.css';
import * as olProj from 'ol/proj';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import TileDebug from 'ol/source/TileDebug';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {createXYZ, extentFromProjection} from 'ol/tilegrid.js';
import {ScaleLine, defaults as defaultControls} from 'ol/control';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import DragPan from 'ol/interaction/DragPan';
import { defaults as defaultInteractions } from 'ol/interaction';
import ZoomControl from 'ol/control/Zoom';
//import DragControl from 'ol/control/Drag';

import tiles from '@/services/ddd_http/tiles.js';


export default {
  mounted() {
    this.$emit('dddViewerMode', 'scene');
    if (this.viewerState.sceneViewer) {this.viewerState.sceneViewer.deselectMesh();}
    this.initializeMap();
  },
  beforeDestroy() {
    //console.debug("Destroying map.");

    window.removeEventListener('resize', this.resize);

    this.map.un('singleclick', this.click);
    this.map.un('moveend', this.move);
    this.map.setTarget(null);
    this.map = null;

  },
  metaInfo() {
    return {
      //title: this.$store.getters.appTitle,
      //titleTemplate: `${this.$t('home.TITLE')} - %s`
      //placeName: this.$route.params.name
    }
  },
  props: [
      'viewerState',
  ],
  /*
  inject: [
      'getViewerState'
  ],
  */
  /*
  computed: {
      'viewerState': function() { return this.getViewerState(); }
  },
  */
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      //placeName: this.$route.params.name.replace(",", ", ")
    }
  },
  components: {
  },
  methods: {

      initializeMap: function() {
          this.map = new Map({
              controls: [], // new ZoomControl()    defaultControls(), //.extend([scaleLine]),
              interactions: [ new MouseWheelZoom(), new DragPan() ], // defaultInteractions(), // .extend([new MouseWheelZoom()]),
              layers: [
                new TileLayer({
                  source: new OSM({
                  }),
                  maxZoom: 18
                }),
              ],
              target: 'ddd-map-insert',
              view: new View({
                center: olProj.transform(this.viewerState.positionWGS84, 'EPSG:4326', 'EPSG:3857'),
                zoom: 17, // this.viewerState.positionTileZoomLevel,
                minZoom: 10,
                maxZoom: 18,
                rotation: -this.viewerState.positionHeading * Math.PI / 180.0,
              }),
          });

          this.scheduleUpdate();
      },

      scheduleUpdate: function() {
          setTimeout(() => {
              if (!this.map) { return; }
              this.updatePos();
              this.scheduleUpdate();
          }, 2000);
      },

      updatePos: function() {
        this.map.getView().animate({
            center: olProj.transform(this.viewerState.positionWGS84, 'EPSG:4326', 'EPSG:3857'),
            rotation: -this.viewerState.positionHeading * Math.PI / 180.0,
            duration: 250,
        });

      },
  },

}
</script>
