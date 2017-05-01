var apiHost = "moxs.com:8080"
var apiPath = "moxs_sys/api"
var orgSn = "ORG17041916230000"
var sevSn = "SEV17041917210000"
import axios from 'axios'
import Qs from 'querystring'


export default {
  state: {
    host: apiHost, // 52.221.138.6:8080
    path: apiPath,
    isLoading: false,
    loadingApis: []
  },
  getters: {
  },
  mutations: {
    pushLoadingApi(state, apiUrl) {
      console.log(Pace)
      state.isLoading = true
      state.loadingApis = state.loadingApis.concat([apiUrl])
      
    },
    pullLoadingApi(state, apiUrl) {
      state.loadingApis = state.loadingApis.filter(url => url !== apiUrl)
      if(state.loadingApis.length === 0) {
        state.isLoading = false
      }
    }
  },
  actions: {
    handleError,
    login: async (store, data) => await apiInit(store, "POST", "form", `cs/org/${orgSn}/sev/${sevSn}/ac/signin`, data),
    logout: async (store, data) => await apiInit(store, "POST", "form", `cs/ac/signout`, data),
    checkLogin: async (store, data) => await apiInit(store, "GET", "form", `cs/ac/signed`, data, false),
    register: async (store, data) => await apiInit(store, "POST", "json", `cs/org/${orgSn}/sev/${sevSn}/ac/mb/reg`, data),
    getPw: async (store, data) => await apiInit(store, "POST", "form", `cs/ac/pw`, data),
  }
}


async function apiInit(store, method, type, route, data, showErrMsg = true) {
  var headers = {}
  if(type === "json") {
    headers["Content-Type"] = "application/json"
    // data = JSON.stringify(data)
  }else if(type === "multi") {
    headers["Content-Type"] = "multipart/form-data"
  }else {
    headers["Content-Type"] = "application/x-www-form-urlencoded"
    data = Qs.stringify(data)
  }

  var url = `http://${apiHost}/${apiPath}/${route}`

  store.commit('pushLoadingApi', url)

  var response = await axios({
    method,
    url,
    headers,
    data,
    withCredentials: true
  });

  store.commit('pullLoadingApi', url)

  var myRes = new Response(response)
  if(myRes.code !== 10 && showErrMsg) {
    store.dispatch('handleError', myRes)
  }

  return myRes


}


class Response {
  constructor(response) {
    this.code = response.data.resultCode
    this.data = response.data.data
    this.errMsg = response.data.exMessage
  }
}

function handleError(store, res) {
  store.commit('setAlertBox', {msg: res.errMsg, color: "red darken-3"})
  store.commit('displayAlertBox', true)
}