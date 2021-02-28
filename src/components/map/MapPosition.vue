<template>

    <div style="position: fixed; left: 10px; top: 50px;">

        <v-card class="pa-1" outlined>
            <v-card-title>Position</v-card-title>

            <v-card-text class="text-left">
                <div>
                    <div><b>Coords:</b> {{ placeName }}</div>
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
  },
}
</script>
