
export default {
  state: {
    isShowQRCodeModal: false
  },
  getters: {
    isShowQRCodeModal: (state) => state.isShowQRCodeModal
  },
  mutations: {
    controlQRCodeModal(state, boo) {
      state.isShowQRCodeModal = boo
    }
  },
  actions: {

  }
}
