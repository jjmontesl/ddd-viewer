<template>

    <div>

    <div style="position: fixed; left: 10px; top: 50px; width: 280px; padding: 0px;">

        <v-card class="pa-1" outlined>

            <!-- <v-card-title style="padding: 0px;">Position</v-card-title> -->

            <v-card-text style="padding: 0px;" class="text-left">
                <div>
                    <div><b>Coords WGS84:</b> {{ parseFloat(viewerState.positionWGS84[0]).toFixed(5) }}, {{ parseFloat(viewerState.positionWGS84[1]).toFixed(5) }}</div>
                    <div><b>Coords Scene:</b> {{ parseFloat(viewerState.positionScene[0]).toFixed(1) }}, {{ parseFloat(viewerState.positionScene[2]).toFixed(1) }}, {{ parseFloat(viewerState.positionScene[1]).toFixed(0) }} <span style="color: gray;">m</span></div>
                    <!--<div><b>TMS XYZ:</b> </div>-->

                    <div style="height: 5px;"></div>
                    <div><b>Heading:</b> {{ parseFloat(viewerState.positionHeading).toFixed(1) }}</div>
                    <!--<div><b>Altitude MSL:</b> </div> -->
                    <div><b>Altitude:</b> {{ parseFloat(viewerState.positionGroundHeight).toFixed(1) }} <span style="color: gray;">m</span> <small>({{ parseFloat(viewerState.positionScene[1]).toFixed(1) }} MSL)</small></div>
                    <div><b>Terrain Height:</b> {{ (parseFloat(viewerState.positionScene[1]) - parseFloat(viewerState.positionGroundHeight)).toFixed(0) }} <span style="color: gray;">m</span></div>

                    <!--
                    <div style="height: 5px;"></div>
                    <div style="overflow: hidden; white-space: nowrap;"><b></b>&nbsp;</div>
                    -->

                    <div><small>{{ viewerState.sceneFPS }} FPS</small> <small>{{ viewerState.sceneTriangles }} tris / {{ viewerState.sceneDrawCalls }} drawcalls</small></div>

                </div>
            </v-card-text>

            <!--
            <v-card-text class="text-left">
                <div>
                    <h3>3D Tiles</h3>
                    <div><a v-on:click="request3DTileGenerate">Generate 3D Tile</a></div>
                </div>
            </v-card-text>
            -->

        </v-card>

    </div>

    <div  style="position: fixed; left: 10px; bottom: 10px; padding: 0px; z-index: 10;">
        <SceneLabel :viewerState="viewerState"></SceneLabel>
    </div>

    </div>

</template>

<script>
import DDDMap from '@/components/ddd/DDDMap.vue';
import DDDMap3DSwitch from '@/components/ddd/DDDMap3DSwitch.vue';
import SceneLabel from '@/components/scene/SceneLabel.vue';
import tiles from '@/services/ddd_http/tiles.js';

export default {
  mounted() {
    this.$emit('dddViewerMode', 'scene');
    if (this.getSceneViewer()) {this.getSceneViewer().deselectMesh();}
    if (this.getSceneViewer() && !(this.getSceneViewer().sequencer.playing)) {this.viewerState.sceneViewModeShow = true;}
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
  inject: [
      'getSceneViewer'
  ],
  /*
  computed: {
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
      DDDMap,
      DDDMap3DSwitch,
      SceneLabel
  },
  methods: {
  }
}
</script>
