import Vue from 'vue'
import router from './router/'
import store from './store/'
import './registerServiceWorker'
import './plugins/vuetify'
import './theme/default.sass'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import '@mdi/font/css/materialdesignicons.css'
import 'jodit/build/jodit.css'
import VFormBuilder from '@/components/form-builder/VFormBuilder'

import 'dropzone/dist/dropzone.css'

Vue.config.productionTip = false
Vue.component('VFormBuilder', VFormBuilder)

const app = new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
})
app.$mount('#app')
