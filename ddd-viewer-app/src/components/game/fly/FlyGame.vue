<template>

    <div style="padding: 0px;">

    </div>

</template>

<style>
</style>

<script>

import FlyGameProcess from '@/games/fly/FlyGameProcess.js';

export default {
  mounted() {

    this.$emit( 'dddViewerMode', 'scene' );


    // Get sequence JSON
    let gameUrl = this.$route.query.u;
    gameUrl = '/games/fly-vigo-1.json';
    if ( gameUrl ) {
        // Fetch from URL
        gameUrl = decodeURIComponent( gameUrl );
        fetch( gameUrl ).then(( response ) => {
            response.json().then(( data ) => {
                  let gameData = data;
                  console.debug( data );

                  // Launch game
                  const flyGameProcess = new FlyGameProcess( gameData );
                  this.getSceneViewer().processes.add( flyGameProcess );

            })
        })

    }

    setTimeout(() => {
        this.getSceneViewer().loadSkybox( '@dynamic' );
    }, 2000 );

  },

  inject: [
      'getSceneViewer',
  ],

  props: [
      'viewerState',
  ]

}
</script>

