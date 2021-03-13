<template>

    <div style="padding: 0px;">

      <v-row style="margin: 0px;">
        <v-col style="padding: 40px; pointer-events: auto;"  >

            <div style="background-color: white;">

                <v-card class="">

                    <!-- <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" @click="$router.back();" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn> -->

                    <v-card-title></v-card-title>

                    <div style="padding-left: 40px; padding-right: 40px; text-align: left;">

                        <h2>About DDD-OSM</h2>

                        <p>
                            DDD-OSM is a set of tools designed to generate 3D scenes out of
                            <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> data.
                        </p>

                        <!--
                        <h3>Usage</h3>
                        <p>
                        </p>
                        -->

                        <h3>OpenStreetMap</h3>

                        <p>
                            OpenStreetMap is a collectively maintained global mapping database, which includes data that spans ways,
                            roads, shops, train stations and much more.
                        </p>

                        <p>
                            Everybody can contribute to OpenStreetMap, so if one of your areas of interest is not entirely mapped, you can always step in and contribute to one of the larger collaborative open-data projects in the world. Head to OpenStreetMap site, contact your local OSM Mapping community and start mapping!
                        </p>

                        <h3>DDD</h3>

                        <p>
                            OSM 3D data is rendered using the <a href="https://github.com/jjmontesl/ddd">DDD(123) Procedural Geometry Generation Tool</a>.
                        </p>

                        <p>
                            DDD is an Open Source library, the project looking for contributors. If you are interested in the development of DDD or
                            this HTML5 viewer, please head over to the GitHub site and get in contact with the developer community.
                        </p>

                        <h3><!--Patreon / Buymeacoffee-->Author</h3>

                        <p>
                            This site is run by <a href="https://twitter.com/jjmontes" target="_blank">Jose Juan Montes</a>.
                            I have developed the viewer and software used for 3D generation, and I also
                            maintain this demostration server. You can contribute to the codebase
                            of the generator (DDD), this viewer, or to the OpenStreetMap database.
                        </p>
                        <p>
                            You can also <a href="https://twitter.com/jjmontes" target="_blank">follow Jose Juan Montes on Twitter</a> to stay up to date.
                        </p>

                        <h3>Coverage</h3>
                        <p>
                             <center><i>Current Coverage (limited by elevation data disponibility)</i></center>
                             <center><img src="/img/about-map.png" style="height: 300px;" /></center>
                        </p>

                    </div>

                    <div style="height: 20px;"> </div>

                    <v-btn @click="$router.back();" class="mx-2" dark color="primary"><v-icon dark>mdi-close</v-icon> Close</v-btn>

                    <div style="height: 20px;"> </div>


                </v-card>

            </div>

        </v-col>
    </v-row>

  </div>

</template>


<script>
export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('about.TITLE')} - %s`
    }
  }
}
</script>
