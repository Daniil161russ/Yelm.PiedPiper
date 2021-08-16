export const state = () => ({
  selectedComponent: 'firstStep',
  showGuide: false,
})

export const getters = {
  getSelectedComponent (state) {
    return state.selectedComponent
  },

  getShowGuide (state) {
    return state.showGuide
  }
}

export const mutations = {
  setSelectedComponent (state, payload) {
    state.selectedComponent = payload
  },

  setShowGuide (state, payload) {
    state.showGuide = payload
  }
}
