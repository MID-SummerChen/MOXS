
export default {
  state: {
    isShowQRCodeModal: false,
    isShowCheckoutModal: false,
  },
  getters: {
    isShowQRCodeModal: (state) => state.isShowQRCodeModal,
    isShowCheckoutModal: (state) => state.isShowCheckoutModal,
  },
  mutations: {
    controlQRCodeModal(state, boo) {
      state.isShowQRCodeModal = boo
    },
    controlCheckoutModal(state, boo) {
      state.isShowCheckoutModal = boo
    },
  },
  actions: {

  }
}
