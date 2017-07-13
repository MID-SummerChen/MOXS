// var apiHost = "106.1.80.127:33266" 
var apiHost = "114.33.8.32:8890" 
var apiModule = {
  sys: "moxs_sys",
  sev: "moxs_sev"
}
var orgSn = "ORG17041916230000"
var sevSn = "SEV17041917210000"
import axios from 'axios'
import Qs from 'query-string'


export default {
  state: {
    isLoading: false,
    loadingApis: [],
  },
  getters: {
    apiHost: state => apiHost,
    apiModule: state => apiModule,
    orgSn: state => orgSn,
    sevSn: state => sevSn,
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
    // system
    getGeo: async (store, data) => await apiInit(store, "GET", "form", 'sys', `xs/sys/geo`, data),
    getConfig: async (store) => await apiInit(store, "GET", "form", 'sys', `cs/org/${orgSn}/sev/${sevSn}/conf`),
    getService: async (store) => await apiInit(store, "GET", "form", 'sys', `cs/org/${orgSn}/sev/${sevSn}`),
    login: async (store, data) => await apiInit(store, "POST", "form", 'sys', `cs/org/${orgSn}/sev/${sevSn}/ac/signin`, data),
    logout: async (store, data) => await apiInit(store, "POST", "form", 'sys', `cs/ac/signout`, data),
    checkLogin: async (store, data) => await apiInit(store, "GET", "form", 'sys', `cs/ac/signed`, data, false),
    register: async (store, data) => await apiInit(store, "POST", "json", 'sys', `cs/org/${orgSn}/sev/${sevSn}/ac/mb/reg`, data),
    getPw: async (store, data) => await apiInit(store, "POST", "form", 'sys', `cs/ac/pw`, data),
    updatePw: async (store, data) => await apiInit(store, "POST", "form", 'sys', `cs/ac/pw/update`, data),
    updateMember: async (store, data) => await apiInit(store, "POST", "json", 'sys', `cs/ac/mb/update`, data),
    memImgUpload: async (store, data) => await apiInit(store, "POST", "multi", 'sys', `res/img/add`, data),
    getStoreList: async (store, data) => await apiInit(store, "GET", "form", 'sys', `cs/org/${orgSn}/sev/${sevSn}/sto`, data),
    getStore: async (store, stoSn) => await apiInit(store, "GET", "form", 'sys', `cs/org/${orgSn}/sev/${sevSn}/sto/${stoSn}`),

    
    // service
    getItemsCls: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/item/cls`),
    getItems: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/item`, data),
    getItem: async (store, itemSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/item/${itemSn}`),

    // 預約
    getAllResv: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv`, data),
    getResvOpt: async (store, stoSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/sto/${stoSn}/resv_opt`),
    addResv: async (store, data) => await apiInit(store, "POST", "json", 'sev', `cs/org/${orgSn}/sev/${sevSn}/sto/${data.stoSn}/resv/add`, data),
    sendResvVerify: async (store, resvSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv/${resvSn}/send/verify`),
    verifyResv: async (store, data) => await apiInit(store, "POST", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv/${data.resvSn}/verify`, data),
    getAllowResvDate: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/sto/${data.stoSn}/resv/date`, data),
    getAllowResvTime: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/sto/${data.stoSn}/resv/time`, data),
    getResvList: async (store, resvSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv/${resvSn}/chk`),
    resvCheckout: async (store, data) => await apiInit(store, "POST", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/chk/${data.chkSn}/pay`, data),
    getResvItems: async (store, resvSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv/${resvSn}/tm`),
    
  }
}


async function apiInit(store, method, contentType = 'form', moduleType = 'sys', route, data, showErrMsg = true) {
  var headers = {}

  var url = `http://${apiHost}/${apiModule[moduleType]}/api/${route}`
  if(contentType === "json") {
    headers["Content-Type"] = "application/json"
  }else if(contentType === "multi") {
    headers["Content-Type"] = "multipart/form-data"
  }else {
    headers["Content-Type"] = "application/x-www-form-urlencoded"
    if(method === 'GET') {
      url+= `?${Qs.stringify(data)}`
    }else {
      data = Qs.stringify(data)
    }
  }
  store.commit('pushLoadingApi', url)

  var res = await axios({
    method,
    url,
    headers,
    data,
    withCredentials: true
  });

  store.commit('pullLoadingApi', url)

  var myRes = new Response(res)
  if(myRes.code !== 10 && showErrMsg) {
    store.dispatch('handleError', myRes)
  }

  return myRes


}


class Response {
  constructor(res) {
    this.code = res.data.resultCode
    this.data = res.data.response
    this.errMsg = res.data.exMessage
  }
}

function handleError(store, res) {
  store.commit('setAlertBox', {msg: res.errMsg, color: "red darken-3"})
  store.commit('displayAlertBox', true)
}
