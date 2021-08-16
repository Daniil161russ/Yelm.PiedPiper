import { _ } from "core-js"

export const state = () => ({
  selectedWindow: 'Index',
  clients: null,
  promocodes: null,
  client: null,
  client_id: null
})

export const getters = {
  getSelectedWindow: (state) => {
    return state.selectedWindow
  },
  getClients: (state) => {
    return state.clients
  },
  getPromocodes: (state) => {
    return state.promocodes
  },
  getClient: (state) => {
    return state.client
  }
}

export const mutations = {
  setSelectedWindow: (state, window) => {
    state.selectedWindow = window
  },
  setClients: (state, clients) => {
    state.clients = clients
  },
  setPromocodes: (state, promocodes) => {
    state.promocodes = promocodes
  },
  clearPromocodes: (state, promocodes) => {
    state.promocodes = null
  },
  setClient: (state, client) => {
    state.client = client
  },
  setClientID: (state, id) => {
    state.client_id = id
  }
}

export const actions = {
  async getterClients({ commit }) {
    await this.$axios.$get('/users').then(response => {
      commit('setClients', response)
    })
  },
  async setterClient({ commit, state }) {
    await this.$axios.$get('/user-about', { params: { id: state.client_id }}).then(response => {
      commit('setClient', response)
    })
  },
  getPromocodes({ commit }) {
    this.$axios.$get('/yelm/promocodes').then(response => {
      commit('clearPromocodes', response)
      commit('setPromocodes', response)
    })
  },
  async addPromocod({}, promoForm) {
    return await this.$axios.$post(`/yelm/promocode/use`, promoForm).then(response => {
      return response;
    }).catch(e => {
      if (e.response.status === 404) return 404;
    })
  },
  async deletePromo({ dispatch }, id) {
    await this.$axios.$delete('/yelm/promocode', {
      data: {
        id: id,
        version: 3
      }
    })
    await dispatch('getPromocodes')
  }
}
