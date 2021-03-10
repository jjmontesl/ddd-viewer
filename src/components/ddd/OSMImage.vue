<template>

    <div >
        <img :src="imageUrl" style="max-height: 200px;" />
    </div>

</template>

<script>

export default {

  inject: [
      'getViewerState'
  ],

  props: [
      'imageUrl',
  ],

  methods: {


  },


  mounted() {
  },

  beforeDestroy() {
  }

}

</script>
