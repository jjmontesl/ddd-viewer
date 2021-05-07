<template>

    <div style="padding: 2px;" class="hidden-sm-and-up">
        <div class="ddd-scene-insert" id="ddd-scene-insert" style="height: 400px;">
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
          this.checkMountScene();

          if (this.getViewerState().sceneViewer) {
              this.getViewerState().sceneViewer.engine.resize();
          }
      },

      checkMountScene: function() {
            // Check if insert is visible as per https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
            let el = this.$el.querySelector('.ddd-scene-insert').parentNode;
            let visible = window.getComputedStyle(el).display !== 'none'; // ; (el.parentNode.parentOffset !== null);

            if (visible) {
                if (this.mountedScene === null) {
                    this.mountScene();
                }
            } else {
                if (this.mountedScene !== null) {
                    this.unmountScene();
                }
            }
      },

      mountScene: function() {
        let el = document.getElementById('ddd-scene-parent'); //.firstChild;
        if (el) {
            //console.debug('Mounting DDD scene insert.');

            this.renderBackEl = el.parentNode;
            this.$el.querySelector('.ddd-scene-insert').appendChild(el);
            this.mountedScene = el;


            el.style.height = 400 + 'px';
            el.style.width = '100%';
            //el.style.height = this.$el.querySelector('.ddd-scene-insert').height + "px";
            //if (el.querySelector('canvas')) { el.querySelector('canvas').height = 400; }
            //this.sceneViewer.engine.resize();
            window.dispatchEvent(new Event('resize'));
        }
      },

      unmountScene: function() {
        let el = this.$el.querySelector('.ddd-scene-insert').firstChild;
        if (el) {
            //console.debug("Unmounting DDD scene insert.");
            //document.getElementById('ddd-scene-parent').insertBefore(el, document.getElementById('ddd-scene-parent').firstChild);  // Must be first child as used in mount
            this.renderBackEl.appendChild(el);  // Must be first child as used in mount
            this.mountedScene = null;
            this.renderBackEl = null;

            window.dispatchEvent(new Event('resize'));
        }
      }

  },


  mounted() {
      this.mountedScene = null;
    this.checkMountScene();
    window.addEventListener('resize', this.resize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.unmountScene();
  }

}

</script>
