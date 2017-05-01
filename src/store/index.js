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
    alertBox
  },
  state: {
    isLogin: false
  },
  getters: {
  },
  mutations: {
    switchLoginStatus(state, status) {
      state.isLogin = status
    }
  },
  actions: {
    async onCheckLogin({ state, commit, dispatch, rootState }) {
      var res = await dispatch('checkLogin')
      if(res.code === 10) {
        commit('switchLoginStatus', true)
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
      return 
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
