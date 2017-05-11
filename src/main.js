// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import ElementUI from 'element-ui'
import Vuelidate from 'vuelidate'
import moment from 'moment'
require('vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)
Vue.use(ElementUI)
Vue.use(Vuelidate)

Vue.config.productionTip = false

moment.locale("zh-tw")

window.fbAsyncInit = function() {
  FB.init({
    appId      : '119590558602110',
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


entry()

async function entry() {

  var res = await $.get("/static/theme.json");

  require(`./style/${res.current_theme}.styl`)
  require(`../${res.current_theme}/index.css`)
  

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
  })
}
