<template>

    <div>
    </div>

</template>

<script>
import DDDScene from '@/components/ddd/DDDScene.vue';

export default {
  mounted() {
    console.debug('Enabling DDD Scene');
    this.$emit('dddViewerMode', 'scene');

    //dddViewer.setMode('scene');
    //dddViewer.showScene(true);
      //const that = this;
    //const centerDefault = [-8.723, 42.238];
  },
  metaInfo() {
    return {
      //title: this.$store.getters.appTitle,
      //titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
    }
  },
  components: {
    DDDScene
  }
}
</script>
