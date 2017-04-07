
export default {
  state: {
    qrcode: false,
    checkout: false,
    product: false,
    login: false,
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
