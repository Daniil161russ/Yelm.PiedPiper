export const state = () => ({
  userData: {
    published: []
  },
  Administrator: 0,
  integration: null,
  filePondLoading: false
});

export const mutations = {
  setUserData(state, data) {
    state.userData = data;
  },
  setPublicationData(state, data) {
    state.userData.published[data.key] = data.value;
  },
  setIntegration(state) {
    state.integration = state.userData.settings.integrations;
  },
  setIntegrations(state, data) {
    state.integration = data;
  },
  setIntegrationOne(state, data, status) {
    switch (data) {
      case 'iiko':
        state.integration.iiko.status = status
        break;
      case 'yandex_delivery':  
        state.integration.yandex_delivery.status = status
      default:
        break;
    }
  },
  setFilepondLoading(state, payload) {
    state.filePondLoading = payload
  }
};

export const getters = {
  getUser: state => {
    return state.userData;
  },

  getIntegration: state => {
    return state.integration;
  },
  getFilepondLoading: state => {
    return state.filePondLoading
  }
}

export const actions = {
  async getUserData({
    commit
  }) {
    try {
      const user = this.$auth.user
      await commit('setUserData', user)
    } catch (error) {
      console.log(error)
    }
  },

  async refreshUser({
    commit
  }) {
    try {
      await this.$auth.fetchUser().then(response => commit('setUserData', response.data))
    } catch (error) {
      console.log(error)
    }
  },

  async updateUserData({
    state
  }) {
    try {
      await this.$axios.$post(`/user`, state.userData)
    } catch (e) {
      console.log(e)
    }
  },
}
