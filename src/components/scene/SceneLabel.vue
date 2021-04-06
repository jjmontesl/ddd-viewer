<template>

    <div>

        <div style="color: white; pointer-events: auto;">
            <v-btn @click="showMapInsert" class="" style="margin-right: 10px; padding: 2px;" dark color="primary"><small><v-icon dark>mdi-map</v-icon></small></v-btn>
            <b>{{ viewerState.positionName }}</b>
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
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      //placeName: this.$route.params.name.replace(",", ", ")
    }
  },
  components: {
  },
  methods: {
        showMapInsert() {
          this.$router.push('/3d/mapinsert').catch(()=>{});
      },
  }
}
</script>
