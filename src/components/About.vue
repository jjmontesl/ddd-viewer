<template>

    <div style="padding: 0px;">

      <v-row style="margin: 0px;">
        <v-col style="padding: 40px; pointer-events: auto;"  >

            <div style="background-color: white;">

                <v-card class="">

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" @click="$router.back();" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title></v-card-title>

                    <div style="padding-left: 40px; padding-right: 40px; text-align: left;">

                        <h2>About DDD-OSM</h2>

                        <p>
                            DDD-OSM is a set of tools designed to generate 3D scenes from
                            <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> data.
                        </p>

                        <h3>Usage</h3>
                        <p>
                            In the 3D view:
                            <ul>
                                <li>Free & walk mode: Left click to view around. Use <b>W,A,S,D</b> or cursor keys to move. Q and W to move up / down.</li>
                                <li>Orbit mode: Left click to orbit. Right click to pan. Mouse wheel to zooms in/out.</li>
                            </ul>
                            <ul>
                                <li><b>SHIFT</b> key: change movement speed.</li>
                                <li><b>N/M</b>: change time (affects light).</li>
                            </ul>
                        </p>
                        <p>
                            Tiles are loaded dynamically. Tiles shown as gray squares are being loaded. Tiles
                            shown in 3D as OpenStreetMap squares are enqueued for server generation (this may
                            take minutes or hours depending on server load). Generated tiles are currently
                            shown after reloading the 3D view. Tiles shown as red squares have errored and cannot
                            be generated in current version.
                        </p>
                        <p>
                            <b>NOTE this software is in development stage.</b> Loading and generation times vary
                            depending on server load. <b>Performance degrades after loading a few tiles</b>
                            (try reloading or switching to 2D and back to 3D to restore performance). <b>Camera
                            may appear far above surface</b> at times during loading. If this happens,
                            try switching to <i>walk</i> mode as it will set the camera above the ground.
                            Orthophotos layers may not be available.
                        </p>


                        <h3>OpenStreetMap</h3>

                        <p>
                            OpenStreetMap is a collectively maintained global mapping database, which includes data that spans ways,
                            roads, shops, train stations and much more.
                        </p>

                        <p>
                            Everybody can contribute to OpenStreetMap, so if one of your areas of interest is not entirely mapped,
                            you can always step in and contribute to one of the larger collaborative open-data projects in the world.
                            Head to OpenStreetMap site, contact your local OSM Mapping community and start mapping!
                        </p>

                        <h3>DDD</h3>

                        <p>
                            OSM 3D data is rendered using the <a href="https://github.com/jjmontesl/ddd">DDD123 Procedural Geometry Generation Tool</a>.
                        </p>

                        <p>
                            DDD is an Open Source library, looking for contributors. If you are interested in the development of DDD or
                            this HTML5 viewer, please head over to the GitHub site and get in contact with the developer community
                            or <a href="https://twitter.com/jjmontes" target="_blank">contact me</a>.
                        </p>

                        <h3><!--Patreon / Buymeacoffee-->Author</h3>

                        <p>
                            I have developed the viewer and software used for 3D generation, and I also
                            maintain this demostration server. You can contribute to the codebase
                            of the generator (DDD), this viewer, or to the OpenStreetMap database.
                        </p>
                        <p>
                            You can also <a href="https://twitter.com/jjmontes" target="_blank">follow on Twitter</a> to stay up to date.
                        </p>

                        <h3>Coverage</h3>
                        <p>
                             <center><i>Current Coverage (limited by disk space available for elevation data)</i></center>
                             <center><img src="/img/about-map.png" style="height: 300px;" /></center>
                        </p>

                        <h3>Copyright and Attribution</h3>

                        <p>
                            <ul>
                                <li>Map Data: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap Contributors</a></li>
                                <li>Textures: <a href="https://cc0textures.com/">CC0Textures</a></li>
                                <li>Vector Icons: <a href="http://fontawesome.com/">FontAwesome</a></li>
                                <li>Graphic Engine: <a href="https://www.babylonjs.com/">BabylonJS</a></li>
                                <li>3D OSM Generation: <a href="https://github.com/jjmontesl/ddd">DDD123</a></li>
                                <li>Elevation Data (ES): CC-BY 4.0 ign.es 2010 (data from 2015-2021)</li>
                                <li>Elevation Data (EU): EU-DEM v1.1 Copernicus Data by the European Union</li>
                                <li>Elevation Data (US): US Geographical Survey</li>
                                <li>Elevation Data (Other): SRTM Mission</li>
                            </ul>
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
  },
  mounted() {

    this.$emit('dddViewerMode', null);

  },

}
</script>
