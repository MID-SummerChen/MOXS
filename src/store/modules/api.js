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

  },
  getters: {
  },
  mutations: {
  },
  actions: {
    login: async (store, data) => await apiInit(store, "POST", "form", `cs/org/${orgSn}/sev/${sevSn}/ac/signin`, data),
    register: async (store, data) => await apiInit(store, "POST", "json", `cs/org/${orgSn}/sev/${sevSn}/ac/mb/reg`, data),
    getPw: async (store, data) => await apiInit(store, "POST", "form", `cs/ac/pw`, data),
  }
}


async function apiInit(store, method, type, route, data) {
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

  var response = await axios({
    method,
    url,
    headers,
    data,
    withCredentials: true
  });
  console.log(response)

  return {
    code: response.data.resultCode,
    data: response.data.data
  }


}
