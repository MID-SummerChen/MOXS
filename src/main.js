// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import ElementUI from 'element-ui'


entry()

async function entry() {

  var res = await $.get("/static/theme.json");

  require(`./style/${res.current_theme}.styl`)
  require(`../${res.current_theme}/index.css`)
  Vue.use(Vuetify)
  Vue.use(ElementUI)

  Vue.config.productionTip = false

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
  })
}
