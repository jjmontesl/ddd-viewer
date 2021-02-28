<template>
  <v-app>

    <Toolbar />

    <v-main class="text-center">

    <div style="margin-top: 40px;">

        <DDDMap v-if="mapVisible" :viewerState="viewerState" @dddPosition="dddPosition" />
        <DDDMap3DSwitch v-if="mapVisible" />

        <DDDScene v-if="sceneVisible" :viewerState="viewerState" @dddPosition="dddPosition" @dddScenePosition="dddScenePosition" />

    </div>

  <div class="ddd-front">

      <loading />

      <v-container fluid style="padding: 0px;">
          <router-view :viewerState="viewerState" @dddViewerMode="dddViewerMode"  />
        <!-- <transition name="fade" mode="out-in">
        </transition> -->
      </v-container>
  </div>

    <v-row :justify="'end'" style="margin-top: -10px;">
        <v-col>
          <div class="ddd-render-back">


          </div>
        </v-col>
        <v-col>


        </v-col>
    </v-row>

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

import DDDViewerState from '@/viewer/DDDViewerState.js';

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
  },
  computed: {
    appTitle() {
      return this.$store.getters.appTitle
    }
  },
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      //viewer: dddViewer,
      //mapVisible: true,
      //sceneVisible: false
      viewerState: new DDDViewerState(),
      //viewerState: null,
    }
  },
  props: {
    mapVisible: Boolean,
    sceneVisible: Boolean,
    //viewerState: DDDViewerState,
  },
  created() {
      //this.mapVisible = true;
      //this.$set(this, 'mapVisible', true);
  },
  methods: {

      dddViewerMode(mode) {
        console.debug("Received Viewer Mode change event to: " + mode);
        this.$set(this, 'mapVisible', mode === 'map');
        this.$set(this, 'sceneVisible', mode === 'scene');
      },

      dddPosition(coords, zoom) {
          //console.debug("Received Viewer coords: " + coords);
          this.viewerState.positionWGS84 = coords;
          this.viewerState.positionTileZoomLevel = zoom;
      },

      dddScenePosition(coords) {
          //console.debug("Received Viewer coords: " + coords);
          this.viewerState.positionScene = coords;
      }
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
    position: relative;
    left: 0;
    right: 0;
    top: 38px;
    bottom: 0;
    /* z-index: 0; */
}

.ddd-front {
    position: fixed;
    top: 38px;
    right: 0px;
    z-index: 5;
    width: 400px;
}

</style>
