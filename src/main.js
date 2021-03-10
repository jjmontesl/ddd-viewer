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

Vue.config.productionTip = false
Vue.use(VuetifyConfirm, { vuetify })

Vue.prototype.dddConfig = {
    tileUrlBase: 'http://' + location.hostname + ':8000/cache/ddd_http/',
    //tileUrlBase: 'http://' + location.hostname + '/cache/ddd_http/',

    defaultCoords: [-8.723, 42.238]
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
