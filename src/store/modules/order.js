export default {
  state: {
    orderItems: [],
    currentResv: {},
  },
  getters: {
    orderItems: state => state.orderItems,
    currentResv: state => state.currentResv,
    orderItemsTotalPrice: state => {
      return _.sumBy(state.orderItems, item => item.unitPrice * item.count)
    }
  },
  mutations: {
    SAVE_CURRENT_RESV(state, resv) {
      state.currentResv = _.assign({}, state.currentResv, resv)
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