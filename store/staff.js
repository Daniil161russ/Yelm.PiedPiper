export const state = () => ({
  staff: [],
  points: [],
  selectedStaff: null,
  selectedStaffIndex: null,
  selectedWindow: 'MapStaff'
})

export const getters = {
  getStaff: (state) => {
    return state.staff
  },
  getPoints: (state) => {
    return state.points
  },
  getSelectedWindow: (state) => {
    return state.selectedWindow
  },
  getSelectedStaff: (state) => {
    return state.selectedStaff
  }
}

export const mutations = {
  setStaff(state, response) {
    state.staff = response
  },
  setPoints(state, response) {
    for(let index in response) { 
      response[index].movements.forEach((element, i) => {
        if (i < 100) state.staff.push([element.latitude, element.longitude])
      });
    }
  },
  addStaff(state, response) {
    state.staff.unshift(response)
  },
  updateStaff(state, response) {
    state.staff[state.selectedStaffIndex] = response
  },
  deleteStaff(state, id) {
    state.staff.splice(state.staff.findIndex(staff => staff.id === parseInt(id)), 1)
  },
  setSelectedWindow: (state, window) => {
    state.selectedWindow = window
  },
  updateSelectedStaff(state, staff) {
    state.selectedStaff = staff
  },
  setSelectedStaff: (state, id) => {
    let index = state.staff.findIndex(staff => staff.id === parseInt(id))
    state.selectedStaff = state.staff[index]
    state.selectedStaffIndex = index
  },
}

export const actions = {
  async getAll({ commit }, platform) {
    await this.$axios.$get('https://delivery.yelm.io/api/user', { params: { platform: platform } }).then(response => {
      commit('setStaff', response)
    })
  },
  async remove({ commit }, id) {
    await this.$axios.$delete('https://delivery.yelm.io/api/user', { data: { id: id } }).then(() => {
      commit('deleteStaff', id)
    })
  },
  async empty({ state }) {
    return (!state.staff.length) ? true : false
  }
}