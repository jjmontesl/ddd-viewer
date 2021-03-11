<template>

    <div>
        <div><a @click="selectNode">{{ nodeLabel }}</a></div>
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
      'getViewerState',
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
        this.$forceUpdate();
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

      let n = null;
      if (this.nodeGetter) { n = this.nodeGetter(); }
      if (!n) {
        this.childPath = null;
        this.nodeLabel = "LOADING";
          return;
      }

      if (path === null && n) {
          // Create path from root
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

    },

    selectNode() {
          // Select current node

          let path = null;
          if (this.pathGetter) { path = this.pathGetter(); }

          if (path === null) { return; }

          let node = path[0];

          this.getViewerState().sceneViewer.selectMesh(node);
          let meshName = node.id.split("/").pop().replaceAll('#', '_'); // .replaceAll("_", " ");
          this.$router.push('/3d/item/' + meshName + '/' + this.getViewerState().sceneViewer.positionString()).catch(()=>{});

    }
  },
}

NodeHierarchy.components = { NodeHierarchy };
export default NodeHierarchy;

</script>

