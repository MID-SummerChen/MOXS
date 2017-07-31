
var noScrollModals = ['product', 'checkout', 'newsDetail']
export default {
  state: {
    alertBox: false,
    qrcode: false,
    resvCheckout: false,
    ordCheckout: false,
    product: false,
    login: false,
    cart: false,
    orderRecord: false,
    memberPw: false,
    storeMap: false,
    phoneVerify: false,
    resvSuccess: false,
    newsDetail: false,
    noScroll: false,
  },
  getters: {
  },
  mutations: {
    CONTROL_MODAL(state, {target, boo, timeout = false}) {
      state[target] = boo
      if(noScrollModals.indexOf(target) > -1) {
        state.noScroll = boo
      }
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
