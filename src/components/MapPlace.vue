<template>

    <div style="padding: 0px;">

        <!-- <DDDMap /> -->

        <!-- <DDDMap3DSwitch /> -->

      <!--
      <v-container fluid>

        <v-layout row wrap>
          <div class="text-center">
            <v-dialog v-model="showVerifyDialog" width="500" persistent>
              <v-card>
                <v-card-title
                  class="headline grey lighten-2 black--text dlgVerifyAccount"
                  primary-title
                >
                  <v-icon class="orange--text">mdi-information</v-icon>
                  &nbsp;{{ $t('home.VERIFY_YOUR_ACCOUNT') }}
                </v-card-title>
                <v-card-text class="mt-4">
                  {{ $t('home.VERIFY_YOUR_ACCOUNT_DESCRIPTION') }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="showVerifyDialog = false"
                    class="btnClose"
                    >{{ $t('home.CLOSE') }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

        </v-layout>

          </v-container>
      -->

    <v-row style="margin: 0px;">
        <v-col style="margin: 0px; padding: 0px;">

            <div style="background-color: white; padding: 5px;">

                <v-card class="pa-1" outlined>
                    <v-card-title>{{ placeName }}</v-card-title>

                    <v-card-text class="text-left">
                        <div>
                            <div><b></b> {{ placeName }}</div>
                            <div><b></b> {{ placeName }} E</div>
                        </div>
                    </v-card-text>

                    <v-card-text class="text-left">
                        <div>
                            <h3>Nominatim Place</h3>
                            <p>
                            </p>
                        </div>

                        <div>
                            <h3>Nominatim Results</h3>
                        </div>

                    </v-card-text>

                    <v-card-text class="text-left">
                        <div>
                            <h3>Street level imagery</h3>
                            <p>
                            </p>
                        </div>
                    </v-card-text>

                    <v-card-text class="text-left">
                        <div>
                            <h3>Links</h3>
                            <div><a href="">OpenStreetMap</a></div>
                            <div><a href="">OSMCha (Change Analyzer)</a></div>
                            <div><a href="">Google Maps</a></div>
                        </div>
                    </v-card-text>

                    <v-card-text class="text-left">
                        <div>
                            <h3>3D Tiles</h3>
                            <div><a v-on:click="request3DTileGenerate">Generate 3D Tile</a></div>
                        </div>
                    </v-card-text>

                </v-card>

            </div>

        </v-col>
    </v-row>

  </div>

</template>

<script>
import DDDMap from '@/components/ddd/DDDMap.vue';
import DDDMap3DSwitch from '@/components/ddd/DDDMap3DSwitch.vue';
import tiles from '@/services/ddd_http/tiles.js';

export default {
  mounted() {
    this.$emit('dddViewerMode', 'map');
  },
  metaInfo() {
    return {
      //title: this.$store.getters.appTitle,
      //titleTemplate: `${this.$t('home.TITLE')} - %s`
      //placeName: this.$route.params.name
    }
  },
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      placeName: this.$route.params.name.replace(",", ", ")
    }
  },
  components: {
      DDDMap,
      DDDMap3DSwitch
  },
  methods: {
      request3DTileGenerate: function() {
          console.debug("Generate");
          tiles.request3DTileGenerate(this.$route.params.name);
      }
  }
}
</script>
