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
  /*
  inject: [
      'getViewerState'
  ],
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
      DDDMap,
      DDDMap3DSwitch
  },
  methods: {
      request3DTileGenerate: function() {
          //console.debug("Generate");
          tiles.request3DTileGenerate(this.$route.params.name);
      },
      showDebugView: function() {
          console.debug("Show debug view.");

          this.viewerState.sceneViewer.showDebugView();

          this.viewerState.scenePickingEnabled = false;

      }

  }
}
</script>
