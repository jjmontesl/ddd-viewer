<template>

    <div style="padding: 0px;">

    </div>

</template>

<style>
</style>

<script>
import DDDScene from '@/components/ddd/DDDScene.vue';
import DDDSceneInsert from '@/components/ddd/DDDSceneInsert.vue';
import FlyGameProcess from '@/games/fly/FlyGameProcess.js';

export default {
  mounted() {

    this.$emit('dddViewerMode', 'scene');


    // Get sequence JSON
    let gameUrl = this.$route.query.u;
    gameUrl = "/games/fly-vigo-1.json";
    if (gameUrl) {
        // Fetch from URL
        gameUrl = decodeURIComponent(gameUrl);
        fetch(gameUrl).then((response) => {
            response.json().then((data) => {
                  let gameData = data;
                  console.debug(data);

                  // Launch game
                  const flyGameProcess = new FlyGameProcess(gameData);
                  this.getSceneViewer().processes.add(flyGameProcess);

            })
        })

    }

    const that = this;
    setTimeout(function() {
        that.getSceneViewer().loadSkybox("@dynamic");
    }, 2000);

  },

  inject: [
      'getSceneViewer',
  ],

  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      //mesh: null,
      //nodeId: this.$route.params.id,
      //nodeName: null,
      //metadata: {},
      //steps: [
      // {'time': 1.0, 'position': null, },
      // {'label': 1.0, 'text': 'This is a demostration of DDD OSM Viewer', }
      //],
      //loading: true,
      //nodeGetter: () => { return this.viewerState.selectedMesh; },
    }
  },
  computed: {
    /*
    sortedMetadata: function () {
      this.viewerState.sceneSelectedMeshId;
      this.$route;  // force dependency on property
      let keys = Object.keys(this.metadata);
      keys = keys.filter((key) => { return ! (key.indexOf('_') === 0); });
      //keys = keys.filter((key) => { return (key.indexOf('osm:') === 0); });
      keys.sort();
      keys.sort((a, b) => { return (b.indexOf('osm:') - a.indexOf('osm:'));});
      return keys; // Do your custom sorting here
    },
    */
  },
  props: [
      'viewerState',
  ],
  watch: {
    /*
    '$route' () {
        this.setMesh(this.viewerState.selectedMesh);
    },
    'viewerState.sceneSelectedMeshId' () {
        this.$forceUpdate();
        this.setMesh(this.viewerState.selectedMesh);
        //if (! this.metadata['_updated']) {this.metadata['_updated'] = 0;}
        //this.metadata['_updated']++;
    }
    */
  },

  components: {
  },

  methods: {
      /*
      setMesh(mesh) {
          //this.mesh = mesh;
          if (!mesh) { return; }
          this.loading = false;
          this.nodeName = mesh.id.split("/").pop().replaceAll("_", " ");
          if (mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras) {
              this.metadata = mesh.metadata.gltf.extras;
              if (this.metadata['osm:name']) {
                  this.nodeName = this.metadata['osm:name'];
              }
          }
          this.nodeGetter = () => { return this.viewerState.selectedMesh; };
          console.debug("Scene Item setMesh called.");
      },
      */

  },

}
</script>

