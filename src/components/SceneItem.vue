<template>

    <div style="padding: 0px;">

    <v-row style="margin: 0px;">
        <v-col style="margin: 0px; padding: 0px;">

            <div style="background-color: white; padding: 5px;">

                <v-card class="pa-1" outlined>
                    <v-card-title>{{ nodeId }}</v-card-title>

                    <v-card-text class="text-left">
                        <div>
                            <div><b></b> {{ nodeId }}</div>
                        </div>
                    </v-card-text>

                    <v-card-text class="text-left">
                        <div>
                            <h3>Attributes</h3>
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

                </v-card>

            </div>

        </v-col>
    </v-row>

  </div>

</template>

<script>
import DDDScene from '@/components/ddd/DDDScene.vue';

export default {
  mounted() {
    this.$emit('dddViewerMode', 'scene');
    this.setItem(this.$route.params.id);
  },
  metaInfo() {
    return {
      //title: this.$store.getters.appTitle,
      //titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      nodeId: this.$route.params.id
    }
  },
  watch: {
    '$route' () {
        this.setItem(this.$route.params.id);
    }
  },

  components: {
    DDDScene
  },

  methods: {
      setItem(nodeId) {
        this.nodeId = nodeId;
      }
  },

}
</script>
