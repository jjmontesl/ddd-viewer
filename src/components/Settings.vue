<template>

    <div style="padding: 0px;">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="5" offset-sm="7" md="4" offset-md="8" >

            <div style="background-color: white;">

                <v-card class="">

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" @click="$router.back();" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title>Settings</v-card-title>

                    <v-card-text class="text-left">
                        <div>
                            <h3 style="margin-bottom: 5px;">2D Layers</h3>

                            OpenStreetMap Default<br/>
                            DDD 2D<br/>
                            XYZ Tile Coordinates<br />
                            DDD Coverage<br />
                            ...
                        </div>
                    </v-card-text>

                    <v-card-text class="text-left">
                        <div>
                            <h3 style="margin-bottom: 5px;">3D View</h3>
                        </div>
                        <div>
                            Textures<br />
                            ...<br />
                        </div>
                        <div>
                            Movement speed<br />
                            ...<br />
                        </div>
                    </v-card-text>

                    <!--
                    <v-card-text class="text-left">
                        <div>
                            <h3>Street level imagery</h3>
                            <p>
                                To be done?
                            </p>
                        </div>
                    </v-card-text>
                    -->

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

        </v-col>
    </v-row>

  </div>

</template>

<script>
import DDDMap from '@/components/ddd/DDDMap.vue';
import DDDMapInsert from '@/components/ddd/DDDMapInsert.vue';
import DDDMap3DSwitch from '@/components/ddd/DDDMap3DSwitch.vue';
import NominatimSearch from '@/components/NominatimSearch.vue';
import tiles from '@/services/ddd_http/tiles.js';

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `Settings - %s`
    }
  },
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
    }
  },
  components: {
      DDDMap,
  },
  methods: {

  },

  mounted() {
  },

  beforeDestroy() {
  }

}
</script>
