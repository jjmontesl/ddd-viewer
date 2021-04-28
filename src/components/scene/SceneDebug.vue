<template>

    <div style="position: fixed; left: 10px; top: 50px; width: 280px; padding: 0px;">

    </div>

</template>

<script>
import DDDMap from '@/components/ddd/DDDMap.vue';
import DDDMap3DSwitch from '@/components/ddd/DDDMap3DSwitch.vue';
import tiles from '@/services/ddd_http/tiles.js';

export default {
  mounted() {
    this.$emit('dddViewerMode', 'scene');
    this.viewerState.sceneViewModeShow = false;
    this.showDebugView();
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
  inject: [
    'getSceneViewer',
  ],
  /*
  computed: {
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
      DDDMap,
      DDDMap3DSwitch
  },
  methods: {
      request3DTileGenerate: function() {
          //console.debug("Generate");
          tiles.request3DTileGenerate(this.$route.params.name);
      },
      showDebugView: function() {
          if (this.viewerState) {
                //console.debug("Show debug view.");
              this.viewerState.scenePickingEnabled = false;
              this.getSceneViewer().showDebugView();
          }
      }

  }
}
</script>
