<template>

    <div>

        <div style="color: white; pointer-events: auto;">
            <v-btn @click="showMapInsert" class="" style="margin-right: 10px; padding: 2px;" dark color="primary"><small><v-icon dark>mdi-map</v-icon></small></v-btn>
            <b :style="[!isPositionNameCurrent ? {'color': 'gray'} : {}]">{{ lastPositionName }}</b>
        </div>

    </div>

</template>

<script>
export default {
  mounted() {
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
      lastPositionName: null,
      isPositionNameCurrent: false,
    }
  },
  components: {
  },
  watch: {
    'viewerState.positionName': function() {
        if ( this.viewerState.positionName ) {
            this.lastPositionName = this.viewerState.positionName;
            this.isPositionNameCurrent = true;
        } else {
            this.isPositionNameCurrent = false;
        }
    }
  },
  methods: {
        showMapInsert() {
          this.$router.push( '/3d/mapinsert' ).catch(()=>{});
      },
  }
}
</script>
