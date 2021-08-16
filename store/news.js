export const state = () => ({
  news: [],
  loading: false
})

export const mutations = {
  emptyNews (state) {
    state.news = []
  },
  updateLoading (state, payload) {
    state.loading = payload
  },
  setNews (state, payload) {
    payload = payload.map((item, index) => {
      item.publication_format = { type: '', message: '' }
      if (item.publication != null) {
        if(0 > (this.$moment().unix() - this.$moment(item.publication).unix())) {
          item.publication_format.message = 'Будет опубликовано ' + this.$moment(item.publication).fromNow()
          item.publication_format.type = 'danger'
        } else {
          item.publication_format.type = 'success'
          item.publication_format.message = 'Опубликовано ' + this.$moment(item.publication).utc(true).fromNow()
        }
      }
      return item
    })
    state.news = payload
  }
}

export const getters = {
  getNews: (state) => {
    return state.news
  },

  getLoading: (state) => {
    return state.loading
  }
 }

export const actions = {
  async addNews ({ dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.$post('/news', payload)
        await dispatch('refreshNews')
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
  },
  async deleteNews ({ dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.$delete('/news', { data: { id: payload.id } })
        await dispatch('refreshNews')
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },
  async updateNews ({ dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.$put('/news', payload)
        await dispatch('refreshNews')
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
  },
  async getNews ({}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.$axios.$get('/news', { params: { id: payload.id } })
        resolve(response[0])
      } catch (e) {
        reject (e)
      }
    })
  },
  async refreshNews ({ commit }, payload) {
    commit('emptyNews')
    commit('updateLoading', true)
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$get('/all-news')
        commit('setNews', data)
        commit('updateLoading', false)
        resolve(data)
      } catch(e) {
        reject(e)
      }
    })
  }
}
