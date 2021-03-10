<template>

    <div>
        <div>{{ nodeLabel }}</div>
        <div style="margin-left: 15px;">
            <NodeHierarchy v-if="childPathGetter() !== null" :nodeGetter="nodeGetter" :pathGetter="childPathGetter"></NodeHierarchy>
        </div>
    </div>

</template>

<style>

</style>

<script>

//import NodeHierarchy from './NodeHierarchy.vue';

const NodeHierarchy = {

  mounted() {
  },
  created() {
    this.updateNode();
  },
  metaInfo() {
    return {
      //title: this.$store.getters.appTitle,
      //titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  inject: [
      //'getViewerState',
  ],
  data() {
    return {
      nodeLabel: null,

      childPathGetter: () => {
          return this.childPath;
      }

    }
  },
  computed: {
  },
  watch: {
    'nodeGetter' () {
        //console.debug("NodeHierarchy node updated.");
        //this.pathGetter = null;
        this.childPath = null;
        this.updateNode();
        //this.$forceUpdate();
    }
  },
  props: [
      'nodeGetter',
      'pathGetter',
  ],

  //components: {
  //   NodeHierarchy,
  //},

  methods: {
    updateNode() {

      let path = null;

      if (this.pathGetter) { path = this.pathGetter(); }

      if (path === null) {
          // Create path from root
          let n = this.nodeGetter();
          path = [ n ];

          while (n.parent) {
                n = n.parent;
                path.splice(0, 0, n);
          }
      }

      this.childPath = null;
      if (path.length > 1) {
          this.childPath = path.slice(1);
      }

      //console.debug(this.childPath);
      if (path.length > 0) {
          this.nodeLabel = path[0].id.split("/").slice(-1)[0];
      } else {
            this.nodeLabel = "ERROR";
      }

    }
  },

}

NodeHierarchy.components = { NodeHierarchy };
export default NodeHierarchy;

</script>

