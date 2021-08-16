export const state = () => ({
	selectedWindow: 'Phone',
	authWindow: null,
	hashCode: null,
	phone: null,
	region_code: 'RU'
})

export const getters = {
	getSelectedWindow: (state) => {
		return state.selectedWindow
	},
	getAuthWindow: (state) => {
		return state.authWindow
	},
	getHashCode: (state) => {
		return state.hashCode
	},
	getPhone: (state) => {
		return state.phone
	},
	getRegionCode: (state) => {
		return state.region_code
	}
}

export const mutations = {
	setSelectedWindow: (state, window) => {
    state.selectedWindow = window
  },
	setAuthWindow: (state, window) => {
		state.authWindow = window
	},
	setHashCode: (state, code) => {
    state.hashCode = code
  },
	setPhone: (state, phone) => {
		state.phone = phone
	},
	setRegionCode: (state, region_code) => {
		state.region_code = region_code
	}
}

export const actions = {
  async getCode({ commit, state }) {
    await this.$axios.$post('/code', { email: state.phone }).then(response => {
      commit('setHashCode', response.hash)
    })
  }
}
