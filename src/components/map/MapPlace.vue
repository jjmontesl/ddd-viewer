<template>

    <div style="padding: 0px;">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="5" offset-sm="7" md="4" offset-md="8" >

            <div style="background-color: white;">

                <v-card class="">

                    <DDDMapInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/maps" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title>{{ placeId }}</v-card-title>

                    <v-card-text class="text-left">
                        <div>
                            <div><b></b> {{ placeCoordsWGS84 }}</div>
                            <!-- <div><b></b> {{ placeId }} E</div> -->
                        </div>
                    </v-card-text>

                    <v-card-text class="text-left">
                        <div>
                            <h3 style="margin-bottom: 5px;">Nominatim</h3>
                            <NominatimSearch :query="placeId" />
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

                    <v-card-text class="text-left">
                        <div>
                            <h3>Links</h3>
                            <div style="margin-left: 10px;">
                                See at: <a href="https://www.openstreetmap.org/#map=17/49.75277/13.00271">OpenStreetMap</a> -
                                <a href="https://www.google.es/maps/@42.232518,-8.7248621,17z">Google Maps</a>
                            </div>
                            <!--
                            <div><a href="">OSMCha (Change Analyzer)</a></div>
                            -->
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
      placeTitle: null,
      placeCoordsWGS84: null,
    }
  },
  components: {
      DDDMap,
      DDDMap3DSwitch,
      DDDMapInsert,
      NominatimSearch
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

      setPlace(placeCoordsWGS84) {
        this.placeId = placeCoordsWGS84;
        this.placeTitle = placeCoordsWGS84;
        this.placeCoordsWGS84 = placeCoordsWGS84;

      },

      resize() {
        let el = this.$el.querySelector('.v-card');
        //this.$el.style.height = '' + (window.innerHeight - 40) + 'px';
        el.style.minHeight = '' + (window.innerHeight - 38) + 'px';
      }
  },

  mounted() {
    this.$emit('dddViewerMode', 'map');
    this.setPlace(this.$route.params.name);
    window.addEventListener('resize', this.resize);
    this.resize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  }

}
</script>
