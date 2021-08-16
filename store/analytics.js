export const state = () => ({
	selectedWindow: 'Installation',
  sessions: [],
  installation: null
})

export const getters = {
	getSelectedWindow: (state) => {
		return state.selectedWindow
	},
  getSessions: (state) => {
	  return state.sessions
  },
  getInstallation: (state) => {
	  return state.installation
  }
}
export const mutations = {
	setSelectedWindow: (state, window) => {
    state.selectedWindow = window
  },
  setSessions: (state, payload) => {
	  state.sessions = payload
  },
  setInstallation: (state, payload) => {
	  state.installation = payload
  },
}

export const actions = {
  async getSessionsData({commit}, payload) {
    try {
     await this.$axios.$get(`https://rest.yelm.io/api/analytics/sessions?time=${payload}`, {
        params: {
          platform: this.$auth.user.platform,
        },
      }).then(response => commit('setSessions', response))

    } catch (e) {
      console.log(e)
    }
  },
  async getInstallationData({commit}, payload) {
    try {
     await this.$axios.$get(`https://rest.yelm.io/api/analytics/installation?time=${payload}`)
      .then(response => commit('setInstallation', response))
    } catch (e) {
      console.log(e)
    }
  }
}
