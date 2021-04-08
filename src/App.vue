<template>
  <v-app>

    <Toolbar :viewerState="viewerState" />

    <v-main class="text-center">

        <div class="ddd-render-back">

            <DDDMap v-if="viewerState.mapVisible" /> <!-- :viewerState="viewerState" /> -->
            <DDDMap3DSwitch v-if="viewerState.mapVisible" />

            <DDDScene v-if="viewerState.sceneVisible" /> <!--  :viewerState="viewerState" -->

        </div>

        <div class="ddd-front">

          <loading />

          <v-container fluid style="padding: 0px;">
              <router-view :viewerState="viewerState" @dddViewerMode="dddViewerMode" />
            <!-- <transition name="fade" mode="out-in">
            </transition> -->
          </v-container>
        </div>

    </v-main>

    <!--<Footer />-->

  </v-app>
</template>

<script>
import Toolbar from '@/components/core/Toolbar.vue'
import Loading from '@/components/core/Loading.vue'
//import Footer from '@/components/core/Footer.vue'

import DDDMap from '@/components/ddd/DDDMap.vue';
import DDDMap3DSwitch from '@/components/ddd/DDDMap3DSwitch.vue';
import DDDScene from '@/components/ddd/DDDScene.vue';
import SceneViewMode from '@/components/scene/SceneViewMode.vue';

import ViewerState from '@/dddviewer/ViewerState.js';

export default {
  name: 'App',

  metaInfo() {
    return {
      title: this.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { name: 'msapplication-TileColor', content: '#ffc40d' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'apple-mobile-web-app-title',
          content: this.appTitle
        },
        { name: 'application-name', content: this.appTitle }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
        { rel: 'favicon', href: '/favicon.ico' }
      ]
    }
  },
  components: {
    Toolbar,
    Loading,
    //Footer
    DDDMap,
    DDDMap3DSwitch,
    DDDScene,
    SceneViewMode,
  },
  computed: {
    appTitle() {
      return this.$store.getters.appTitle
    },
  },
  inject: [
  ],
  provide: function () {
      const that = this;
      return {
        getViewerState: function() { return that.viewerState; },
      }
  },
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      //viewer: dddViewer,
      viewerState: new ViewerState(this.dddConfig.defaultCoords),
      //viewerState: null,
    }
  },
  props: {
    //mapVisible: Boolean,
    //sceneVisible: Boolean,
    //viewerState: Object,
  },
  beforeCreate() {
      //this._viewerState = new ViewerState();
      //this.mapVisible = true;
      //this.$set(this, 'mapVisible', true);
      //Object.freeze(this.viewerState);
  },
  created() {
      this.parseHref();
      this.viewerState.dddConfig = this.dddConfig;
  },
  mounted() {
  },
  methods: {

      dddViewerMode(mode) {
        console.debug("Received Viewer Mode change event to: " + mode);
        this.viewerState.mapVisible = mode === 'map';
        this.viewerState.sceneVisible = mode === 'scene';
        //this.$set(this, 'mapVisible', mode === 'map');
        //this.$set(this, 'sceneVisible', mode === 'scene');

        window.dispatchEvent(new Event('resize'));
      },

      dddPosition(coords, zoom) {
          //console.debug("Received Viewer coords: " + coords);
          this.viewerState.positionWGS84 = coords;
          this.viewerState.positionTileZoomLevel = zoom;
      },

      dddScenePosition(coords) {
          //console.debug("Received Viewer coords: " + coords);
          this.viewerState.positionScene = coords;
      },

      resize() {

      },

      parseHref() {
          //console.debug("Route: " + window.location.href);

          try {
                // Parse at location
                //http://localhost:8080/maps/@42.1354407,-0.4126472,17.0z
                let href = window.location.href;
                const regexp = /.*@([0-9.\-]+),([0-9.\-]+)((,(([0-9.\-]+)[ayhtz]))*).*/;
                let matches = href.match(regexp);
                //console.debug(matches);

                if (matches.length >= 3) {
                    this.viewerState.positionWGS84 = [parseFloat(matches[2]),parseFloat(matches[1])];
                }
                if (matches.length >= 4) {
                    for (let match of matches[3].split(",")) {
                        if (match === "") { continue; }
                        let value = parseFloat(match.slice(0, -1));
                        let code = match.slice(-1);
                        if (code === 'z') {
                            this.viewerState.positionTileZoomLevel = value;
                        } else if (code === 'a') {
                            this.viewerState.positionGroundHeight = value;
                        } else if (code === 'h') {
                            this.viewerState.positionHeading = value;
                        } else if (code === 't') {
                            this.viewerState.positionTilt = value;
                        }
                        //console.debug(value, code);
                    }

                }
            } catch(e) {
                console.debug("Error parsing location from href: " + e);
            }

          //let positionWgs84 = this.getViewerState().positionWGS84;
      },
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

header.v-app-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
}

div.ol-zoom {
    left: 5px;
    top: 10px;
}


div.ol-rotate {
    left: 5px;
    top: 70px;
    right: inherit;
}

div.ol-attribution.ol-uncollapsible {
    left: 8px;
    bottom: 5px;
    right: auto;
    font-size: 80%;
}

div.ol-scale-line {
    bottom: 35px;
}

aside.v-navigation-drawer--absolute {
    z-index: 30;
}

.ddd-render-back {
    position: fixed;
    left: 0;
    right: 0;
    top: 40px;
    /* z-index: 0; */
}

.ddd-front {
    /*position: fixed;*/
    margin-top: 38px;
    /*top: 38px;*/
    right: 0px;
    z-index: 5;
    /*width: 400px;*/
    bottom: 0;
    max-height: 100%;
    /*height: 100%;*/
    overflow: auto;
    width: 100%;
    pointer-events: none;
}

</style>
