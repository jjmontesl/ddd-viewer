<template>

    <div style="height: 400px; position: relative; z-index: 0;">
        <div class="ddd-map" id="ddd-map" style="height: 400px; position: relative; z-index: -1;">
        </div>
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
  computed: {
      //'viewerState': function() {return this.getViewerState();}
  },
  inject: [
      'getViewerState'
  ],

  methods: {

      resize: function() {
        const height = window.innerHeight - 40;
        //console.debug("Resizing map: " + height);
        this.$el.querySelector('.ddd-map').style.height = height + "px";
        if (this.$el.querySelector('canvas')) { this.$el.querySelector('canvas').height = height; }
        this.map.updateSize();
      },

      positionWGS84: function() {
        const extent = this.map.getView().calculateExtent(this.map.getSize());
        let point = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
        point = olProj.transform(point, 'EPSG:3857', 'EPSG:4326');
        return point;
      },

      positionString: function() {
        const point = this.positionWGS84();
        const zoom = this.map.getView().getZoom();
        const posString = "@" + point[1].toFixed(7) + "," + point[0].toFixed(7) + "," + zoom.toFixed(1) + "z";
        return posString;
      },

      move: function(event) {

          //console.debug(event);
          //console.debug(this.positionWGS84());

          const posString = this.positionString();

          //this.$router.replace('/maps/' + posString);
          if (this.$route.name === 'mapMain') {
              this.$router.push('/maps/' + posString).catch(()=>{});
          } else if (this.$route.name === 'mapPlace')  {
              this.$router.push('/maps/place/' + this.$route.params.name + '/' + posString).catch(()=>{});
          }

          const that = this;
          //that.$emit('dddPosition', that.positionWGS84(), this.map.getView().getZoom());
          this.getViewerState().positionWGS84 = that.positionWGS84();
          this.getViewerState().positionTileZoomLevel = this.map.getView().getZoom();
          this.getViewerState().positionHeading = - this.map.getView().getRotation() * 180.0 / Math.PI;
          this.getViewerState().positionTilt = 0.01;
          this.getViewerState().positionGroundHeight = 150.0;

          this.map.once('rendercomplete', function () {

              const image = that.exportImage();
              const switchEl = document.getElementById('ddd-map-3d-switch');
              if (switchEl) {
                  switchEl.style.backgroundColor = '#ffffff';
                  const canvas = document.getElementById('ddd-map-3d-switch');
                  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                  canvas.getContext('2d').drawImage(image.canvas, 0, 0, canvas.width, canvas.height);
              }

          });

      },

      click: function(event) {
          console.debug("Map click: " + event.coordinate);

          // Redirect to appropriate click handler

          // Direct to /map/place
          const point = olProj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
          const pointString = point[1].toFixed(7) + "," + point[0].toFixed(7);

          const posString = this.positionString();

          this.$router.push('/maps/place/' + pointString + '/' + posString).catch(()=>{});

      },

      exportImage: function() {
        const map = this.map;

        const mapCanvas = document.createElement('canvas');
        const size = map.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        const mapContext = mapCanvas.getContext('2d');
        Array.prototype.forEach.call(
          document.querySelectorAll('.ol-layer canvas'),
          function (canvas) {
            if (canvas.width > 0) {
              const opacity = canvas.parentNode.style.opacity;
              mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
              const transform = canvas.style.transform;
              // Get the transform parameters from the style's transform matrix
              const matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
              // Apply the transform to the export map context
              CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
              mapContext.drawImage(canvas, 0, 0);
            }
          }
        );
        //console.debug(mapContext);

        return mapContext;

      }

  },


  mounted() {
    console.debug('Creating DDD map.');

    const that = this;
    this.getViewerState().dddMap = this;

    //const el = that.$el.querySelector('.ddd-map');
    //el.style.height = "calc(100%)";

    const scaleLine = new ScaleLine({
          units: 'metric',
    });

    that.map = new Map({
      controls: defaultControls().extend([scaleLine]),
      layers: [

        new TileLayer({
          source: new OSM({
          }),
          maxZoom: 19
        }),

        new TileLayer({
             source: new XYZ({
                 url: this.getViewerState().dddConfig.tileUrlBase + '{z}/{x}/{y}.png',
             }),
            minZoom: 16,
            maxZoom: 17,
        }),

        new TileLayer({
          source: new TileDebug({
          }),
          minZoom: 16,
          maxZoom: 17
        }) ],



      target: 'ddd-map',
      view: new View({
        center: olProj.transform(that.getViewerState().positionWGS84, 'EPSG:4326', 'EPSG:3857'),
        zoom: that.getViewerState().positionTileZoomLevel,
        maxZoom: 18,
        rotation: -that.getViewerState().positionHeading * Math.PI / 180.0,
      }),
    });

    const map = that.map;

    // Events
    map.on('singleclick', that.click);
    map.on("moveend", that.move);
    window.addEventListener('resize', this.resize);

    // Resize initially
    //setTimeout(() => { that.resize(); }, 100);
    this.resize();

  },

  beforeDestroy() {
      console.debug("Destroying map.");

    window.removeEventListener('resize', this.resize);

    this.map.un('singleclick', this.click);
    this.map.un('moveend', this.move);
    this.map.setTarget(null);
    this.map = null;

  }

}

</script>
