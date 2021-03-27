<template>

    <div style="position: fixed; left: 10px; top: 50px; width: 280px; padding: 0px;">

        <v-card class="pa-1" outlined>

            <!-- <v-card-title style="padding: 0px;">Position</v-card-title> -->

            <v-card-text style="padding: 0px;" class="text-left">
                <div>
                    <div><b>Coords WGS84:</b> {{ parseFloat(viewerState.positionWGS84[0]).toFixed(5) }}, {{ parseFloat(viewerState.positionWGS84[1]).toFixed(5) }}</div>
                    <div><b>Coords Scene:</b> {{ parseFloat(viewerState.positionScene[0]).toFixed(1) }}, {{ parseFloat(viewerState.positionScene[2]).toFixed(1) }}, {{ parseFloat(viewerState.positionScene[1]).toFixed(0) }} <span style="color: gray;">m</span></div>
                    <!--<div><b>TMS XYZ:</b> </div>-->

                    <div style="height: 5px;"></div>
                    <div><b>Altitude MSL:</b> {{ parseFloat(viewerState.positionScene[1]).toFixed(1) }} <span style="color: gray;">m</span></div>
                    <div><b>Altitude Ground:</b> {{ 0 }} <span style="color: gray;">m</span></div>
                    <div><b>Terrain Height:</b> {{ 0 }} <span style="color: gray;">m</span></div>

                    <div style="height: 5px;"></div>
                    <div style="overflow: hidden; white-space: nowrap;"><b>{{ viewerState.positionName }}</b>&nbsp;</div>

                    <div><small>{{ viewerState.sceneFPS }} FPS</small> <small>{{ viewerState.sceneDrawCalls }} drawcalls</small></div>

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

</template>

<script>
import DDDMap from '@/components/ddd/DDDMap.vue';
import DDDMap3DSwitch from '@/components/ddd/DDDMap3DSwitch.vue';
import tiles from '@/services/ddd_http/tiles.js';

export default {
  mounted() {
    this.$emit('dddViewerMode', 'scene');
    if (this.viewerState.sceneViewer) {this.viewerState.sceneViewer.deselectMesh();}
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
  /*
  inject: [
      'getViewerState'
  ],
  computed: {
      'viewerState': function() { return this.getViewerState(); }
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
      DDDMap3DSwitch
  },
  methods: {
  }
}
</script>
