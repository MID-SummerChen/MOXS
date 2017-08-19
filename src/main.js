// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-TW'
import Vuelidate from 'vuelidate'
import moment from 'moment'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
// require('vuetify/dist/vuetify.min.css')
require(`./style/muse-custom.less`)
require(`../theme/index.css`)
require(`./style/tme01.styl`)
    

Vue.use(Vuetify)
Vue.use(ElementUI, { locale })
Vue.use(Vuelidate)
Vue.use(MuseUI)

Vue.config.productionTip = false

moment.locale("zh-tw")



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
