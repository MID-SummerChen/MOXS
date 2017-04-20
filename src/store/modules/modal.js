
export default {
  state: {
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
    controlModal(state, {target, boo}) {
      state[target] = boo

    }
  },
  actions: {

  }
}
