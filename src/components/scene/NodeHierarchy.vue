<template>

    <div>
        <div><a @click="selectNode">
            <span v-show="nodeSelRel !== 0">{{ nodeLabel }}</span>
            <span v-show="nodeSelRel === 0" style="font-weight: bold;">{{ nodeLabel }}</span>
        </a> <small>({{ nodeChildrenCount }})</small></div>
        <div style="margin-left: 15px;">
            <NodeHierarchy v-if="childPathGetter() !== null" :nodeGetter="nodeGetter" :pathGetter="childPathGetter" :depth="depth - 1"></NodeHierarchy>
            <div>
                <div v-for="child in nodeChildren" :key="child.id">{{ child.label }}</div>
            </div>
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
      nodeChildrenCount: null,
      nodeChildren: null,
      nodeSelRel: 0,

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
      'depth',
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


      this.nodeSelRel = path.length - 1;

      //console.debug(this.childPath);
      if (path.length > 0 && path[0].id) {
          this.nodeLabel = path[0].id.split("/").slice(-1)[0];
          this.nodeChildrenCount = path[0].getChildren().length;
          this.nodeChildren = [];
          if (path.length === 1) {
                for (let i = 0; i < path[0].getChildren().length; i++) {
                    let cn = path[0].getChildren()[i];
                    this.nodeChildren.push({
                        'id': cn.id,
                        'label': cn.id.split("/").slice(-1)[0] });
                }
                //this.nodeChildren = path[0].getChildren();
          }
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

