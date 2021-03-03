<template>

    <div style="padding: 0px;">

        <!-- <DDDMap /> -->

        <!-- <DDDMap3DSwitch /> -->

    <v-row style="margin: 0px;">
        <v-col style="margin: 0px; padding: 0px;">

            <div style="background-color: white; padding: 5px;">

                <v-card class="pa-1" outlined>
                    <v-card-title>{{ placeId }}</v-card-title>

                    <v-card-text class="text-left">
                        <div>
                            <div><b></b> {{ placeId }}</div>
                            <div><b></b> {{ placeId }} E</div>
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
    this.setPlace(this.$route.params.name);
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
      placeId: null,
    }
  },
  components: {
      DDDMap,
      DDDMap3DSwitch
  },
  watch: {
    '$route' () {
        this.setPlace(this.$route.params.name);
    }
  },
  methods: {
      request3DTileGenerate: function() {
          console.debug("Generate");
          tiles.request3DTileGenerate(this.$route.params.name);
      },

      setPlace(placeId) {
        this.placeId = placeId;
      }
  }
}
</script>
