<template>

    <div>

        <div style="color: white; margin: 5px;">
            <small><b>Server Generation Queue: ~{{ serverInfo.queue_size }} jobs</b></small>
        </div>

    </div>

</template>

<script>
import tiles from '@/services/ddd_http/tiles.js'

import OSMImage from '@/components/ddd/OSMImage.vue';

export default {
  mounted() {
      this.updateInfo();
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
      serverInfo: {}
    }
  },
  components: {
  },
  watch: {
  },
  methods: {
      updateInfo() {

          tiles.getQueueSize().then(( r ) => {
              //console.debug(r);
              this.serverInfo = r.data;
          });

          setTimeout(() => { this.updateInfo() }, 60000 );

      }
  }
}
</script>
