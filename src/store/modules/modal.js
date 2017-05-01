
export default {
  state: {
    alertBox: false,
    qrcode: false,
    checkout: false,
    product: false,
    login: false,
    cart: false,
    orderRecord: false,
    memberPw: false,
    storeMap: false,
    phoneVerify: false,
    newsDetail: false,
  },
  getters: {
  },
  mutations: {
    controlModal(state, {target, boo, timeout = false}) {
      state[target] = boo
      if(timeout) {
        setTimeout(() => {
          state[target] = false
        }, timeout)
      }
    }
  },
  actions: {

  }
}
