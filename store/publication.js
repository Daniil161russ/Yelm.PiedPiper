export const state = () => ({
  step: 1,
  errors: [],
  redirected: false,
})

export const getters = {
  getErrors: state => {
    return state.errors
  },
  getRedirected: state => {
    return state.redirected
  }
}

export const mutations = {
  setStep(state, data) {
    state.step = data
  },

  setError(state, payload) {
    switch (payload) {
      case 402:
        state.errors.push('Недостаточно средств')
        break;
    }
  },

  emptyErrors(state) {
    state.errors = []
  },

  setRedirected(state, payload) {
    state.redirected = payload
  }
}

export const actions = {
  async addPublication ({commit, state}, payload) {
    if(state.errors.length) {
      commit("emptyErrors")
    }
    try {
      await this.$axios.$post('/published', payload)
    } catch(error) {
      if(error.response.status === 402) {
        commit('setError', error.response.status)
      }
    }
  },

  async updatePublication({commit, state,}, payload) {
    try {
      await this.$axios.$put('/published', payload)
    } catch (e) {
      console.log(e)
    }
  }
}


