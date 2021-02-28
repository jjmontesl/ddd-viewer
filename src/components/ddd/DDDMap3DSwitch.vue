<template>

    <div class="ddd-map-3d-switch">
        <v-card class="pa-1" outlined style="width: 60px; height: 60px;" @v-click="switch3D()">
            <canvas id="ddd-map-3d-switch" width="50" height="50" style="width: 50px; height: 50px;"></canvas>
            <span style="position: absolute; left: 0; right: 0; top: 15px;"><b>3D</b></span>
        </v-card>
    </div>

</template>

<style>
.ddd-map-3d-switch {
    position: fixed;
    z-index: 15;
    bottom: 70px;
    left: 10px;
    //opacity: .75;
    cursor: pointer;
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

      click: function(event) {
          console.debug("Map click: " + event.coordinate);

          // Get tile grid coordinates
          const tileGrid = createXYZ({
            extent: extentFromProjection('EPSG:3857'),
            //maxResolution: options.maxResolution,
            //maxZoom: options.maxZoom,
            //minZoom: options.minZoom,
            //tileSize: options.tileSize,
          });

          const tileCoords = tileGrid.getTileCoordForCoordAndZ(event.coordinate, 17);
          console.debug(tileCoords);

          // Redirect to appropriate click handler

          // Direct to /map/place
          const point = olProj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
          const pointString = point[1].toFixed(7) + "," + point[0].toFixed(7);

          const posString = this.positionString();

          this.$router.push('/maps/place/' + pointString + '/' + posString);

      },

  },

}

</script>
