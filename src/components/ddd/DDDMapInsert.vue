<template>

    <div style="padding: 2px; pointer-events: auto;" class="hidden-sm-and-up">
        <div class="ddd-map-insert" id="ddd-map-insert" style="height: 400px;">
        </div>
    </div>

</template>

<script>

export default {

  inject: [
      'getViewerState'
  ],

  methods: {

      resize: function() {
          this.checkMountMap();
      },

      checkMountMap: function() {
            // Check if insert is visible as per https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
            let el = this.$el.querySelector('.ddd-map-insert').parentNode;
            let visible = window.getComputedStyle(el).display !== 'none'; // ; (el.parentNode.parentOffset !== null);

            if (visible) {
                this.mountMap();
            } else {
                this.unmountMap();
            }
      },

      mountMap: function() {
        let el = document.getElementById('ddd-map').firstChild;
        if (el) {
            console.debug('Mounting DDD map insert.');
            this.$el.querySelector('.ddd-map-insert').appendChild(el);
        }
      },

      unmountMap: function() {
        let el = this.$el.querySelector('.ddd-map-insert').firstChild;
        if (el) {
            console.debug("Unmounting DDD map insert.");
            document.getElementById('ddd-map').appendChild(el);
        }
      }

  },


  mounted() {
    this.checkMountMap();
    window.addEventListener('resize', this.resize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.unmountMap();
  }

}

</script>
