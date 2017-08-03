// var apiHost = "106.1.80.127:33266" 
import {apiHost, apiModule, apiPath} from '../../cfg/apiBasic'


var orgSn = "ORG"
var sevSn = "SEV"
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
    getDomainConfig: async (store, data) => await apiInit(store, "GET", "form", 'sys', `cs/sev/conf`, data),
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
    getItemsCls: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/item/cls`, data),
    getItems: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/item`, data),
    getItem: async (store, itemSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/item/${itemSn}`),

    // 預約
    getAllResv: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv`, data),
    // getAllStoreResv: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/sto/${data.stoSn}/resv`, data),
    getResvOpt: async (store, stoSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/sto/${stoSn}/resv_opt`),
    addResv: async (store, data) => await apiInit(store, "POST", "json", 'sev', `cs/org/${orgSn}/sev/${sevSn}/sto/${data.stoSn}/resv/add`, data),
    sendResvVerify: async (store, resvSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv/${resvSn}/send/verify`),
    verifyResv: async (store, data) => await apiInit(store, "POST", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv/${data.resvSn}/verify`, data),
    getAllowResvDate: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/sto/${data.stoSn}/resv/date`, data),
    getAllowResvTime: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/sto/${data.stoSn}/resv/time`, data),
    getAllResvItems: async (store, resvSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv/${resvSn}/tm`),
    getResvChk: async (store, resvSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv/${resvSn}/chk`),
    getResv: async (store, resvSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/resv/${resvSn}`),

    // 訂單
    getAllOrd: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/ord`, data),
    getOrd: async (store, ordSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/ord/${ordSn}`),
    addOrd: async (store, data) => await apiInit(store, "POST", "json", 'sev', `cs/org/${orgSn}/sev/${sevSn}/sto/${data.stoSn}/ord/add`, data),
    sendOrdVerify: async (store, ordSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/ord/${ordSn}/send/verify`),
    verifyOrd: async (store, data) => await apiInit(store, "POST", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/ord/${data.ordSn}/verify`, data),
    getAllOrdItems: async (store, ordSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/ord/${ordSn}/item`),
    getOrdItem: async (store, data) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/ord/${data.ordSn}/item/${data.otmId}`),
    getOrdChk: async (store, ordSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/ord/${ordSn}/chk`),

    // 結帳
    // resvCheckout: async (store, data) => await apiInit(store, "POST", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/chk/${data.chkSn}/pay`, data),
    // getResvChkCb: async (store, chkSn) => await apiInit(store, "POST", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/chk/${chkSn}/callback`),

    getNewsList: async (store) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/news`),
    getNews: async (store, newsSn) => await apiInit(store, "GET", "form", 'sev', `cs/org/${orgSn}/sev/${sevSn}/news/${newsSn}`),
    
  }
}


async function apiInit(store, method, contentType = 'form', moduleType = 'sys', route, data, showErrMsg = true) {
  var headers = {}
  console.log(route)
  route = route.replace("ORG", sessionStorage.getItem("orgSn"))
  route = route.replace("SEV", sessionStorage.getItem("sevSn"))
  console.log(route)

  var url = `http://${apiHost}/${apiModule[moduleType]}/${apiPath}/${route}`
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
