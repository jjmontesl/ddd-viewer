<template>

    <div>

        <table>
            <tbody>
                <tr v-for="(item, index) in results" :key="index">
                    <td style="vertical-align: top; min-width: 24px;">
                        <img v-show="item.icon" :src="item.icon" style="height: 20px;" />
                        <i v-show="! item.icon" class="v-icon notranslate mdi mdi-map-marker" style="font-size: 130%;"></i>
                    </td>
                    <td style="vertical-align: top;">
                        <span>{{ item.display_name }}</span>

                    </td>
                </tr>
            </tbody>
        </table>


    </div>

</template>

<script>

import axios from 'axios';

export default {

  inject: [
      'getViewerState'
  ],

  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      results: [],
    }
  },

  props: [
      'query',
  ],

  watch: {
    'query' () {
        this.nominatimSearch(this.query);
    }
  },

  methods: {

      nominatimSearch: async function(query) {
        if (!query) { return; }

        let url = "https://nominatim.openstreetmap.org/search?";
        url = url + "format=json&q=" + query;

        console.debug("Running nominating query: " + url);
        let result = await axios.get(url);

        console.debug(result);
        this.results = result.data;


      },


  },


  mounted() {
  },

  beforeDestroy() {
  }

}

</script>
