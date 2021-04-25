<template>

    <div style="padding: 0px;" ref="dddViewPanel">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="4" offset-lg="8"  >

            <div style="background-color: white;">

                <v-card class="" style="overflow-x: hidden;">

                    <DDDSceneInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">Tools</v-card-title>

                    <div style="height: 20px;"> </div>

                    <v-card-text class="text-left">
                           <v-slider v-model="sceneTime" @change="sceneTimeChange" step="0.1" min="0" max="24" thumb-label ticks label="Hour (Day/Night)"></v-slider>
                    </v-card-text>

                    <!--
                    <v-card-text class="text-left">
                        <v-btn @click="selectCameraOrbit" :disabled="viewerState.sceneSelectedMeshId === null" class="mx-2" dark color="primary"><v-icon dark>mdi-rotate-orbit</v-icon> Orbit</v-btn>
                        <v-btn @click="selectCameraFree" class="mx-2" dark color="primary"><v-icon dark>mdi-axis-arrow</v-icon> Free</v-btn>
                        <v-btn @click="selectCameraWalk" class="mx-2" dark color="primary"><v-icon dark>mdi-walk</v-icon> Walk</v-btn>
                    </v-card-text>
                    -->

                    <v-card-text class="text-left">

                        <v-slider v-model="viewerState.sceneTileDrawDistance" step="1" min="0" max="4" thumb-label ticks label="Draw Distance"></v-slider>

                        <v-select v-model="viewerState.sceneTextureSet" @change="sceneTextureSetChange" :items="textureModeItems" label="Textures" ></v-select>

                        <v-select v-model="viewerState.sceneGroundTextureOverride" @change="groundTextureLayerChange" :items="groundTextureLayerItems" label="Ground texture override" ></v-select>

                        <v-select v-model="viewerState.sceneSkybox" @change="skyboxChange" :items="skyBoxItems" label="Environment" ></v-select>

                        <!--
                        <v-checkbox label="Items" disabled style="margin-top: 2px;"></v-checkbox>
                        -->
                        <v-checkbox v-model="viewerState.sceneShadowsEnabled" @change="sceneShadowsEnabledChange" label="Shadows" style="margin-top: 2px;"></v-checkbox>
                    </v-card-text>

                    <v-card-text class="text-left">
                        <div>
                            <h3>Links</h3>

                            <div><router-link to="/3d/inspector">Inspector</router-link></div>
                            <!--
                            <div><a :href="osmLink" target="_blank">OpenStreetMap Object</a></div>
                            <div><a :href="osmchaLink" target="_blank">OSMCha (Change Analyzer)</a></div>
                            -->
                            <div><a :href="sceneLinkGoogleMaps" target="_blank">Google Maps View</a></div>
                        </div>
                    </v-card-text>

                    <v-card-text class="text-left">
                        <v-btn @click="sceneFullScreen" class="mx-2" dark color="primary"><v-icon dark>mdi-fullscreen</v-icon> Fullscreen</v-btn>
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

export default {
  mounted() {

    window.addEventListener('resize', this.resize);
    this.resize();

    this.$emit('dddViewerMode', 'scene');
    this.setMesh(this.viewerState.selectedMesh);

    if (!this.viewerState.selectedMesh) {
        let urlNodeId = this.$route.params.id;
        this.viewerState.sceneSelectedMeshId = urlNodeId;
    }

    window.dispatchEvent(new Event('resize'));

  },

  metaInfo() {
    return {
      //title: this.$store.getters.appTitle,
      //titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  inject: [
    'getSceneViewer',
  ],
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      //mesh: null,
      nodeId: this.$route.params.id,
      nodeName: null,
      metadata: {},
      loading: true,
      nodeGetter: () => { return this.viewerState.selectedMesh; },

      sceneTime: this.viewerState.positionDate.getHours(),

      textureModeItems: [
          //{value: 'minimal', text: 'Minimal'},
          {value: 'default256', text: 'Default Set (256x256)'},
          {value: 'default512', text: 'Default Set (512x512)'},
          {value: null, text: 'None'},
      ],

      skyBoxItems: [
          {value: '/textures/TropicalSunnyDay', text: 'Sunny'},
          {value: '/textures/skybox', text: 'Cloudy'},
          {value: '@dynamic', text: 'Dynamic Sky (slower)'},
          {value: null, text: 'None'},
      ]
    }
  },
  computed: {
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

    groundTextureLayerItems: function() {
        let result = [];
        result.push({value: null, text: 'None'});
        result.push({value: 'divider1', divider: true});
        for (let key in this.dddConfig.sceneGroundLayers) {
            result.push({value: key, text: this.dddConfig.sceneGroundLayers[key].text},)
        }
        return result;
    },

    sceneLinkGoogleMaps: function() {
        this.$route;  // force dependency on property
        this.viewerState.sceneSelectedMeshId;
        let url = null;
        if (this.getSceneViewer()) {
            url = 'https://www.google.com/maps/' +  this.getSceneViewer().positionString() + '/data=!3m1!1e3';  // ?hl=es-ES
        }
        return url;
    },
    osmchaLink: function() {
        this.$route;  // force dependency on property
        this.viewerState.sceneSelectedMeshId;
        let url = null;
        if (this.metadata['osm:changeset']) {
            url = 'https://osmcha.org/changesets/' + this.metadata['osm:changeset'] + '/';
        }
        return url;
    },
    osmLink: function() {
        this.$route;  // force dependency on property
        this.viewerState.sceneSelectedMeshId;
        let url = null;
        if (this.metadata['osm:id']) {
            let element = this.metadata['osm:element'];
            let id = this.metadata['osm:id'].split("-")[1];
            url = 'https://www.openstreetmap.org/' + element + '/' + id;
        }
        return url;
    },
  },
  props: [
      'viewerState',
  ],
  watch: {
    '$route' () {
        this.setMesh(this.viewerState.selectedMesh);
    },
    'viewerState.sceneSelectedMeshId' () {
        this.$forceUpdate();
        this.setMesh(this.viewerState.selectedMesh);
        //if (! this.metadata['_updated']) {this.metadata['_updated'] = 0;}
        //this.metadata['_updated']++;
    }
  },

  components: {
    DDDScene,
    DDDSceneInsert,
  },

  methods: {
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
          //console.debug("Scene Item setMesh called.");
      },

      resize() {
        let el = this.$el.querySelector('.v-card');
        //this.$el.style.height = '' + (window.innerHeight - 40) + 'px';
        el.style.minHeight = '' + (window.innerHeight - 38) + 'px';
      },



      selectCameraOrbit() {
          this.getSceneViewer().selectCameraOrbit();
      },
      selectCameraFree() {
          this.getSceneViewer().selectCameraFree();
      },
      selectCameraWalk() {
          this.getSceneViewer().selectCameraWalk();
      },

      sceneFullScreen() {
            this.getSceneViewer().showFullScreen();
      },

      removeNode() {
         //this.getViewerState().sceneViewer.selectMesh(node);
         let mesh = this.viewerState.selectedMesh;
         this.getSceneViewer().deselectMesh();
         mesh.setParent(null);
         mesh.dispose();
      },

      groundTextureLayerChange(value) {
          //console.debug("Changing ground texture: ", value);
          this.getSceneViewer().groundTextureLayerSetKey(value);
      },

      skyboxChange(value) {
            //console.debug("Changing skybox: ", value);
            this.getSceneViewer().loadSkybox(value);
      },

      sceneShadowsEnabledChange(value) {
          this.getSceneViewer().sceneShadowsSetEnabled(value);
      },

      sceneTextureSetChange(value) {
          this.getSceneViewer().sceneTextureSet(value);
      },

      sceneTimeChange(value) {
            let currentDate = this.viewerState.positionDate;
            currentDate.setHours(parseInt(value));
            currentDate.setMinutes(parseInt((value - parseInt(value)) * 60));
            //this.viewerState.positionDate = currentDate;
      }

  },

}
</script>

