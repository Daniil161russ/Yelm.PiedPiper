export const state = () => ({
  orders: []
})

export const getters = {
  getOrders: (state) => {
    return state.orders
  }
}

export const mutations = {
  setOrders(state, payload) {
    state.orders = payload
  },

  setEmptyOrders(state) {
    state.orders = []
  }
}

export const actions = {
  async getOrders({ commit }) {
    commit("setEmptyOrders")
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.$axios.$get('/orders')
        console.log(response, 'новый список заказов')
        await commit('setOrders', response)
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })
  },

  async deleteOrder({dispatch}, payload) {
    console.log(payload)
    await this.$axios.$delete('/order', {
      params: {
        id: payload
      }
    })
    .then(() => dispatch('getOrders'))
    .catch(e => console.log(e))
  }
}
