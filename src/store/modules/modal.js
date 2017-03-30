
export default {
  state: {
    isShowQRCodeModal: false,
    isShowSidebar: false,
  },
  getters: {
    isShowQRCodeModal: (state) => state.isShowQRCodeModal,
    isShowSidebar: (state) => state.isShowSidebar,
  },
  mutations: {
    controlQRCodeModal(state, boo) {
      state.isShowQRCodeModal = boo
    },
    controlSidebar(state, boo) {
      state.isShowSidebar = boo
    }
  },
  actions: {

  }
}
