import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import modal from './modules/modal'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    api,
    modal,
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
})
