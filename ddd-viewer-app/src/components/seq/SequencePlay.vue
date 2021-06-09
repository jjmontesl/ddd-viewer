<template>

    <div style="padding: 0px;">

    </div>

</template>

<style>
/*
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 2px;
}
*/
</style>


<script>
// import DDDScene from '@/components/ddd/DDDScene.vue';
// import DDDSceneInsert from '@/components/ddd/DDDSceneInsert.vue';

export default {
  mounted() {

    window.addEventListener( 'resize', this.resize );

    this.$emit( 'dddViewerMode', 'scene' );
    //this.setMesh(this.viewerState.selectedMesh);

    if ( this.$route.query.sb ) {
        let skybox = decodeURIComponent( this.$route.query.sb )
        this.$nextTick( function () {
            this.getSceneViewer().loadSkybox( skybox );
        });
    }

    let seq = null;
    let that = this;

    // Get sequence JSON
    let seqUrl = this.$route.query.u;
    if ( seqUrl ) {

        // Fetch from URL
        seqUrl = decodeURIComponent( seqUrl );
        fetch( seqUrl ).then(( response ) => {
            response.json().then(( data ) => {
                  //console.debug(data);
                  seq = data;
                  that.getSceneViewer().sequencer.play( seq );
            })
        })

    } else {

        // Parse from string
        let seqb64 = this.$route.query.s;
        if ( seqb64 ) {
            let seqJSON = atob( seqb64 );
            let bytes = new Uint8Array( seqJSON.length );
            for ( let i = 0; i < seqJSON.length; ++i ) {
                bytes[i] = seqJSON.charCodeAt( i );
            }
            let decoder = new TextDecoder( 'utf-8' );
            let decodedJSON = decoder.decode( bytes.buffer );

            seq = JSON.parse( decodedJSON );

            if ( seq ) {
                setTimeout(() => {
                    that.getSceneViewer().sequencer.play( seq );
                }, 1000 );
            }

        }
    }



  },

  metaInfo() {
    return {
      //title: this.$store.getters.appTitle,
      //titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  inject: [
      'getSceneViewer',
  ],
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      //mesh: null,
      //nodeId: this.$route.params.id,
      //nodeName: null,
      //metadata: {},
      //steps: [
      // {'time': 1.0, 'position': null, },
      // {'label': 1.0, 'text': 'This is a demostration of DDD OSM Viewer', }
      //],
      //loading: true,
      //nodeGetter: () => { return this.viewerState.selectedMesh; },
    }
  },
  computed: {
    /*
    sortedMetadata: function () {
      this.viewerState.sceneSelectedMeshId;
      this.$route;  // force dependency on property
      let keys = Object.keys(this.metadata);
      keys = keys.filter((key) => { return ! (key.indexOf('_') === 0); });
      //keys = keys.filter((key) => { return (key.indexOf('osm:') === 0); });
      keys.sort();
      keys.sort((a, b) => { return (b.indexOf('osm:') - a.indexOf('osm:'));});
      return keys; // Do your custom sorting here
    },
    */
  },
  props: [
      'viewerState',
  ],
  watch: {
    /*
    '$route' () {
        this.setMesh(this.viewerState.selectedMesh);
    },
    'viewerState.sceneSelectedMeshId' () {
        this.$forceUpdate();
        this.setMesh(this.viewerState.selectedMesh);
        //if (! this.metadata['_updated']) {this.metadata['_updated'] = 0;}
        //this.metadata['_updated']++;
    }
    */
  },

  components: {
  },

  methods: {
      /*
      setMesh(mesh) {
          //this.mesh = mesh;
          if (!mesh) { return; }
          this.loading = false;
          this.nodeName = mesh.id.split("/").pop().replaceAll("_", " ");
          if (mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras) {
              this.metadata = mesh.metadata.gltf.extras;
              if (this.metadata['osm:name']) {
                  this.nodeName = this.metadata['osm:name'];
              }
          }
          this.nodeGetter = () => { return this.viewerState.selectedMesh; };
          console.debug("Scene Item setMesh called.");
      },
      */

  },

}
</script>

