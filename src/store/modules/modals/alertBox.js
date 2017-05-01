
export default {
  state: {
    display: false,
    msg: "",
    color: "",
  },
  getters: {
  },
  mutations: {
    setAlertBox(state, {msg, color = 'default'}) {
      state.msg = msg
      state.color = color
    },
    displayAlertBox(state, boo) {
      state.display = boo
      if(boo) {
        setTimeout(() => {
          state.display = false
          state.msg = ""
          state.color = ""
        }, 2000)
      }else{
        state.msg = ""
        state.color = ""
      }
    }
  },
  actions: {

  }
}
