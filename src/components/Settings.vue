<template>
  <v-container fluid>
    <v-layout row wrap>
    </v-layout>

    <h2>About DDD-OSM</h2>

    <p>
        DDD-OSM is a set of tools designed to generate 3D scenes out of
        <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> data.
    </p>

    <h3>Usage</h3>

    <p>
    </p>

    <h3>OpenStreetMap</h3>

    <p>

    </p>

    <h3>DDD</h3>

    <p>
        OSM 3D data is rendered using <a href="https://github.com/jjmontesl/ddd">DDD(123)</a> Procedural Generation Tool
    </p>

    <!--
    <h3>YourCity Racing</h3>

    -->

    <h3><!--Patreon / Buymeacoffee-->Contact</h3>

    <p>
        This site is run by Jose Juan Montes. I have developed the viewer and 3D generation pipeline, and I
        maintain this demostration server. If you like it, please consider contributing to the codebase
        of the generator (DDD), this viewer, or to the OpenStreetMap database.
    </p>



  </v-container>
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
