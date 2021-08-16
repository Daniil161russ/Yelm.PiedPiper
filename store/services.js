export const state = () => ({
	selectedWindow: 'Design'
})

export const getters = {
	getSelectedWindow: (state) => {
		return state.selectedWindow
	},
}

export const mutations = {
	setSelectedWindow: (state, window) => {
    state.selectedWindow = window
  }
}


