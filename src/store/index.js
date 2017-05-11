import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import modal from './modules/modal'
import alertBox from './modules/modals/alertBox'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    api,
    modal,
    alertBox,
  },
  state: {
    isLogin: false,
    account: {}
  },
  getters: {
    isLogin: state => state.isLogin,
    account: state => state.account,
  },
  mutations: {
    switchLoginStatus(state, status) {
      state.isLogin = status
    },
    gotAccount(state, account) {
      state.account = account
    }
  },
  actions: {
    async onCheckLogin({ state, commit, dispatch, rootState }) {
      var res = await dispatch('checkLogin')
      if(res.code === 10) {
        commit('switchLoginStatus', true)
        commit('gotAccount', res.data.mb)
      }else {
        commit('switchLoginStatus', false)
      }
      return
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
        commit('controlModal', {target: 'login', boo: false})
        commit('setAlertBox', {msg: "登入成功"})
        commit('displayAlertBox', true)
        commit('switchLoginStatus', true)
      }
      return 
      
    }
  }
})
