
export default {
  state: {
    itemSn: "",
    orderIndex: null
  },
  getters: {
  },
  mutations: {
    SAVE_CURRENT_PRODUCT(state, itemSn) {
      state.itemSn = itemSn
    },
    SET_CURRENT_PRODUCT(state, orderIndex) {
      state.orderIndex = orderIndex
    },
    CLEAR_CURRENT_PRODUCT(state) {
      state.itemSn = ""
      state.orderIndex = null
    }
  },
  actions: {

  }
}
