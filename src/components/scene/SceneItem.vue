<template>

    <div style="padding: 0px;">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="4" offset-lg="8" >

            <div style="background-color: white;">

                <v-card class="">

                    <DDDSceneInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">{{ nodeName }}</v-card-title>

                    <OSMImage v-if="metadata['osm:image']" :imageUrl="metadata['osm:image']" />

                    <v-card-text class="text-left">
                        <div>
                            <!-- <h3>Attributes</h3> -->

                            <v-simple-table dense>
                            <tbody>
                            <tr v-for="key in sortedMetadata" :key="key">
                                <td style="max-width: 160px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"><b :style="[key.indexOf('osm:') !== 0 ? {'color': 'gray'} : {}]">{{key}}</b></td>
                                <td style="white-space: nowrap;">
                                    <div v-if="metadata[key] && metadata[key].indexOf && (metadata[key].indexOf('http://') === 0 || metadata[key].indexOf('https://') === 0)" >
                                        <a :href="metadata[key]" target="_blank">{{ metadata[key] }}</a>
                                    </div>
                                    <div v-else-if="key === 'osm:changeset'">
                                        {{ metadata[key] }}  <v-icon small>mdi-link-box-variant</v-icon> <a :href="osmchaLink" target="_blank">OSMCha</a>
                                    </div>
                                    <div v-else-if="key === 'osm:id'">
                                        {{ metadata[key] }}  <v-icon small>mdi-link-box-variant</v-icon> <a :href="osmLink" target="_blank">OpenStreetMap</a>
                                    </div>
                                    <div v-else>
                                        {{ metadata[key] }}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                            </v-simple-table>
                        </div>
                    </v-card-text>

                    <v-card-text class="text-left">
                        <div>
                            <h3>Links</h3>
                            <div><a :href="osmLink">OpenStreetMap Object</a></div>
                            <div><a :href="osmchaLink">OSMCha (Change Analyzer)</a></div>
                            <div><a :href="sceneLinkGoogleMaps" target="_blank">Google Maps View</a></div>
                        </div>
                    </v-card-text>

                    <div style="height: 20px;"> </div>

                    <v-card-text class="text-left">
                        <v-btn @click="selectCameraOrbit" class="mx-2" dark color="primary"><v-icon dark>mdi-rotate-orbit</v-icon> Orbital</v-btn>
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

export default {
  mounted() {
    this.$emit('dddViewerMode', 'scene');
    this.setMesh(this.viewerState.selectedMesh);

    window.addEventListener('resize', this.resize);
    this.resize();
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
      nodeId: this.$route.params.id,
      nodeName: null,
      metadata: {},
    }
  },
  computed: {
    sortedMetadata: function () {
      let keys = Object.keys(this.metadata);
      keys = keys.filter((key) => { return ! (key.indexOf('_') === 0); });
      //keys = keys.filter((key) => { return (key.indexOf('osm:') === 0); });
      keys.sort();
      keys.sort((a, b) => { return (b.indexOf('osm:') - a.indexOf('osm:'));});
      return keys; // Do your custom sorting here
    },
    sceneLinkGoogleMaps: function() {
        let url = null;
        if (this.viewerState.sceneViewer) {
            url = 'https://www.google.com/maps/' +  this.viewerState.sceneViewer.positionString() + '/data=!3m1!1e3';  // ?hl=es-ES
        }
        return url;
    },
    osmchaLink: function() {
        let url = null;
        if (this.metadata['osm:changeset']) {
            url = 'https://osmcha.org/changesets/' + this.metadata['osm:changeset'] + '/';
        }
        return url;
    },
    osmLink: function() {
        let url = null;
        if (this.metadata['osm:id']) {
            let element = this.metadata['osm:element'];
            let id = this.metadata['osm:id'].split("-")[1];
            url = 'https://www.openstreetmap.org/' + element + '/' + id;
        }
        return url;
    }
  },
  props: [
      'viewerState',
  ],
  watch: {
    '$route' () {
        this.setMesh(this.viewerState.selectedMesh);
    }
  },

  components: {
    DDDScene,
    DDDSceneInsert,
    OSMImage,
  },

  methods: {
      setMesh(mesh) {
          if (!mesh) { return; }
          this.nodeName = mesh.id.split("/").pop().replaceAll("_", " ");
          if (mesh.metadata.gltf) {
              this.metadata = mesh.metadata.gltf.extras;
              if (this.metadata['osm:name']) {
                  this.nodeName = this.metadata['osm:name'];
              }
          }
      },

      resize() {
        let el = this.$el.querySelector('.v-card');
        //this.$el.style.height = '' + (window.innerHeight - 40) + 'px';
        el.style.minHeight = '' + (window.innerHeight - 38) + 'px';
      },

      selectCameraOrbit() {
          this.viewerState.sceneViewer.selectCameraOrbit();
      },

  },

}
</script>

