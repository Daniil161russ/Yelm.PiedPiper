//https://delivery.yelm.io/api/user
export const state = () => ({
  users: []
})

export const getters = {
  getUsers: (state) => {
    return state.users
  }
}

export const mutations = {
  setUsers (state, payload) {
    state.users = payload
  }
}

export const actions = {
  async getUsers ({ commit }, payload) {
    try {
      const users = await this.$axios.$get('https://delivery.yelm.io/api/user')
      commit ('setUsers', users)
    } catch (e) {
      console.log(e)
    }
  }
}
