import Vue from 'vue'
import '@/plugins/axios'
import vuetify from '@/plugins/vuetify'
import '@/plugins/veevalidate'
import '@/plugins/common'
import '@/plugins/googleAnalytics'
import i18n from '@/plugins/i18n'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'
import VuetifyConfirm from 'vuetify-confirm'
import VueGtag from "vue-gtag";

Vue.config.productionTip = false

Vue.use(VuetifyConfirm, { vuetify })

Vue.use(VueGtag, {
  config: { id: "G-C94KZNB3L3" },
  //params: {
  //    send_page_view: false
  //}
});

Vue.prototype.dddConfig = {
    tileUrlBase: 'http://' + location.hostname + ':8000/cache/ddd_http/',
    //tileUrlBase: 'http://' + location.hostname + '/cache/ddd_http/',

    sceneGroundLayers: {
        'osm': {text: 'OpenStreetMap', url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"},
        'es-pnoa': {text: 'ES - PNOA (Orthophotos)', url: "http://localhost:8090/wmts/ign_ortho/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg"},
    },

    //defaultCoords: [-5.666, 40.960],  // Salamanca Cathedral
    defaultCoords: [[-8.723, 42.238]],  // Vigo Castro
}

const app = new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App),
  created() {
    store.dispatch('setLocale', store.getters.locale)
    if (store.getters.isTokenSet) {
      store.dispatch('autoLogin')
    }
  },

}).$mount('#app')

if (window.Cypress) {
  // Only available during E2E tests
  window.app = app
}
