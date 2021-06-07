<template>

    <div style="padding: 0px;">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="4" offset-lg="8" >

            <div style="background-color: white;">

                <v-card class="">

                    <DDDSceneInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">View Sequence</v-card-title>

                    <v-card-text class="text-left">
                        <div>
                            <!-- <h3>Attributes</h3> -->
                            <v-simple-table dense>
                            <tbody>
                            </tbody>
                            </v-simple-table>
                        </div>
                    </v-card-text>

                    <div style="height: 20px;"> </div>

                    <v-card-text class="text-left">
                        <v-btn @click="selectCameraOrbit" class="mx-2" dark color="primary"><v-icon dark>mdi-rotate-orbit</v-icon> Orbital</v-btn>
                        <v-btn @click="selectCameraFree" class="mx-2" dark color="primary"><v-icon dark>mdi-axis-arrow</v-icon> Free</v-btn>
                    </v-card-text>

                </v-card>

            </div>

        </v-col>
    </v-row>

  </div>

</template>

<style>
tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
}
/*
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 2px;
}
*/
</style>


<script>
import DDDScene from '@/components/ddd/DDDScene.vue';
import DDDSceneInsert from '@/components/ddd/DDDSceneInsert.vue';
import OSMImage from '@/components/ddd/OSMImage.vue';
import NodeHierarchy from '@/components/scene/NodeHierarchy.vue';

export default {
  mounted() {

    window.addEventListener( 'resize', this.resize );
    this.resize();

    this.$emit( 'dddViewerMode', 'scene' );
    //this.setMesh(this.viewerState.selectedMesh);

    /*
    if (!this.viewerState.selectedMesh) {
        let urlNodeId = this.$route.params.id;
        this.viewerState.sceneSelectedMeshId = urlNodeId;
    }
    */

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
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      //mesh: null,
      //nodeId: this.$route.params.id,
      //nodeName: null,
      metadata: {},
      steps: [
          { 'time': 1.0, 'position': null, },
          { 'label': 1.0, 'text': 'This is a demostration of DDD OSM Viewer', }

      ],
      //loading: true,
      nodeGetter: () => { return this.viewerState.selectedMesh; },
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
    DDDScene,
    DDDSceneInsert,
    OSMImage,
    NodeHierarchy,
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

      resize() {
        let el = this.$el.querySelector( '.v-card' );
        //this.$el.style.height = '' + (window.innerHeight - 40) + 'px';
        el.style.minHeight = '' + ( window.innerHeight - 38 ) + 'px';
      },

      selectCameraOrbit() {
          this.viewerState.sceneViewer.selectCameraOrbit();
      },

      selectCameraFree() {
          this.viewerState.sceneViewer.selectCameraFree();
      },

  },

}
</script>

