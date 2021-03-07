<template>

    <div class="ddd-map-3d-switch unselectable">
        <v-card class="pa-1" outlined style="width: 60px; height: 60px;">
            <canvas id="ddd-map-3d-switch" width="50" height="50" style="width: 50px; height: 50px;" v-on:click="switch3D"></canvas>
            <span style="position: absolute; left: 0; right: 0; top: 18px; pointer-events: none; text-align: center; width: 100%; padding-right: 2px;">
                    <i class="v-icon notranslate mdi mdi-earth"></i><b>3D</b>
            </span>
        </v-card>
    </div>

</template>

<style>
.ddd-map-3d-switch {
    position: fixed;
    z-index: 2;
    bottom: 70px;
    left: 10px;
    //opacity: .75;
    cursor: pointer;
}
*.unselectable {
   -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;

   /*
     Introduced in Internet Explorer 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
   -ms-user-select: none;
   user-select: none;
}
</style>

<script>
import 'ol/ol.css';
import * as olProj from 'ol/proj';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileDebug from 'ol/source/TileDebug';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {createXYZ, extentFromProjection} from 'ol/tilegrid.js';
import {ScaleLine, defaults as defaultControls} from 'ol/control';

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

  methods: {

      switch3D: function() {
          //console.debug("3D Switcher Switch: " + event.coordinate);
          this.$router.push('/3d/'); // place/' + pointString + '/' + posString);

      },

  },

}

</script>
