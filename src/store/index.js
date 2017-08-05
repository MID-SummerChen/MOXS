import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import modal from './modules/modal'
import order from './modules/order'
import db from './modules/db'
import alertBox from './modules/modals/alertBox'
import productModal from './modules/modals/productModal'
import storeMapModal from './modules/modals/storeMapModal'
import {fakeHost, devMode, apiHost, apiModule, resHttpPath } from '../cfg/apiBasic'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    db,
    api,
    modal,
    order,
    alertBox,
    productModal,
    storeMapModal,
  },
  state: {
    isLogin: null,
    account: {},
    menu: [],
    modules: {},
    pageMsgs: {
      title: ""
    },
    org: {},
    sev: {},
    resources: {},
    colors: {},
    paySets: [],
    storeList: [],
    googleKey: 'AIzaSyCJwqPoYKWtOxe2xnb3tneHV1Vu9EdKZAQ',
    checkoutType: "",
    resHttpPath,
  },
  getters: {
    isLogin: state => state.isLogin,
    account: state => state.account,
    menu: state => state.menu,
    modules: state => state.modules,
    storeList: state => state.storeList,
    checkoutType: state => state.checkoutType,
    pageMsgs: state => state.pageMsgs,
    resHttpPath: state => state.resHttpPath,
  },
  mutations: {
    switchLoginStatus(state, status) {
      state.isLogin = status
    },
    gotAccount(state, account) {
      state.account = account
    },
    GOT_CONFIG(state, data) {

      /*
        動態主題顏色
      */
      var link = document.createElement('link');
      // link.id = 'customLink';
      link.rel = 'stylesheet';
      link.href = `${resHttpPath}/${data.sev_theme.CSS_URL}`;
      document.head.appendChild(link);

      state.menu = data.modules_menu_web
      state.modules = data.modules_config
      // state.checkoutType = "resv"
      if(state.modules.ORD) {
        state.checkoutType = 'ord'
      }else {
        state.checkoutType = "resv"
      }
      state.org = data.organization
      state.sev = data.service
      state.resources = data.sev_theme_res
      state.colors = data.sev_theme
      state.paySets = data.org_pay_set
      state.pageMsgs = _.assign({}, state.pageMsgs, {
        title: state.resources.indexTitle
      })

      sessionStorage.setItem("sevSn", state.sev.sevSn)
      sessionStorage.setItem("orgSn", state.org.orgSn)

      // TAB標題及TAB_ICON
      document.title = state.sev.sevName
    },
    GOT_STORE_LIST(state, storeList) {
      state.storeList = storeList
    }
  },
  actions: {
    async getSiteConfig({ state, commit, dispatch, rootState }) {
      var data = {
        domainType: location.hostname.indexOf("moxs") > -1 ? "SUBDOMAIN" : "DOMAIN",
        domain: devMode ? fakeHost : location.hostname.split('.')[0]
      }
      var res = await dispatch("getDomainConfig", data)
      if(res.code === 10) commit("GOT_CONFIG", res.data)
      var res = await dispatch("getStoreList")
      if(res.code === 10) commit("GOT_STORE_LIST", res.data.items)
      return
    },
    async checkLoginStatus({ state, commit, dispatch, rootState }) {
      var res = await dispatch('checkLogin')
      if(res.code === 10) {
        commit('switchLoginStatus', true)
        commit('gotAccount', res.data)
      }else {
        commit('switchLoginStatus', false)
      }
      return res
    },
    async onLogout({ state, commit, dispatch, rootState }) {
      var res = await dispatch('logout')
      if(res.code === 10) {
        commit('setAlertBox', {msg: "登出成功"})
        commit('displayAlertBox', true)
        commit('switchLoginStatus', false)
      }
      return res
    },
    async onLogin({ state, commit, dispatch, rootState }, data) {
      var res = await dispatch('login', data)
      if(res.code === 10) {
        commit('CONTROL_MODAL', {target: 'login', boo: false})
        commit('setAlertBox', {msg: "登入成功"})
        commit('displayAlertBox', true)
        commit('switchLoginStatus', true)
        dispatch('checkLoginStatus')
      }
      return 
      
    }
  }
})
