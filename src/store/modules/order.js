export default {
  state: {
    orderItems: [],
    currentResv: {},
    checkedOutResv: {},
  },
  getters: {
    orderItems: state => state.orderItems,
    currentResv: state => state.currentResv,
    checkedOutResv: state => state.checkedOutResv,
    orderItemsTotalPrice: state => {
      return _.sumBy(state.orderItems, item => item.unitPrice * item.count)
    }
  },
  mutations: {
    SAVE_CURRENT_RESV(state, resvForm) {
      state.currentResv = _.assign({}, state.currentResv, resvForm)
    },
    SAVE_CHECKED_OUT_RESV(state, data) {
      state.checkedOutResv = _.assign({}, data)
    },
    ADD_ORDER_ITEM(state, item) {
      // if(_.findIndex(state.orderItems, {sn: item.sn}) === -1) {
      //   state.orderItems = _.concat(state.orderItems, [item])
      // }
      state.orderItems = _.concat(state.orderItems, [item])
    },
    REMOVE_ORDER_ITEM(state, itemSn) {
      state.orderItems = _.filter(state.orderItems, item => item.sn !== itemSn)
    }
  },
  actions: {
    
  }
}