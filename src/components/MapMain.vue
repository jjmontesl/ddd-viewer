<template>

    <div>

    </div>

</template>

<script>
import DDDMap from '@/components/ddd/DDDMap.vue';
import DDDMap3DSwitch from '@/components/ddd/DDDMap3DSwitch.vue';

export default {
  mounted() {
    //console.debug('Enabling DDD Scene');
    this.$emit('dddViewerMode', 'map');
  },
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
    }
  },
  components: {
    DDDMap,
    DDDMap3DSwitch
  }
}
</script>
