export default {
  state: {
    newPhone: ''
  },

  mutations: {
    SET_NEWPHONE: (state, newPhone) => {
      state.newPhone = newPhone
    }
  }
}
