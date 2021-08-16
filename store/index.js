export const state = () => ({
  Languages: [],
  Currency: []
})

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  },
  getLanguages(state) {
    return state.Languages
  },
  getCurrency(state) {
    return state.Currency
  }
}

export const mutations = {
  setLanguages(state, payload) {
    state.Languages = payload
  },
  setCurrency(state, payload) {
    state.Currency = payload
  }
}

export const actions = {
  async getLanguages({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      if (!state.Languages.length) {
        try {
          const response = await this.$axios.$get('/localization')
          if ( typeof response.lang_options ) {
            commit('setLanguages', response.lang_options)
          }
          if ( typeof response.price_options ) {
            commit('setCurrency', response.price_options)
          }
          resolve({
            Languages: response.lang_options,
            Currency: response.price_options
          })
        } catch(e) {
          reject (e)
        }
      } else {
        resolve({
          Languages: state.Languages,
          Currency: state.Currency
        })
      }
    })
  }
}
