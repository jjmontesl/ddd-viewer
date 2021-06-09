import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/styles/main.sass'
// import colors from 'vuetify/es5/util/colors'
// import VuetifyConfirm from 'vuetify-confirm'
import '@mdi/font/css/materialdesignicons.css'

Vue.use( Vuetify )

const theme: string | null = JSON.parse( localStorage.getItem( 'dark' ) || "null" );
const opts = {
  theme: {
    dark: theme !== null
  },
  iconfont: 'mdi'
}

export default new Vuetify( opts )
