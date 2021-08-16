export const state = () => ({
  shops: []
})

export const mutations = {
  emptyShops (state) {
    state.shops = []
  },
  setShops (state, payload) {
    state.shops = payload
  }
}

export const getters = {
  getShops: (state) => {
    return state.shops
  }
}

export const actions = {
  async getShops ({ commit }) {
    commit('emptyShops')
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$get('/shops')
        commit('setShops', data)
        resolve(data)
      } catch(e) {
        reject(e)
      }
    })
  },
  async addShop ({ dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.$post('/shop', payload)
        await dispatch('getShops')
        resolve ()
      } catch (e) {
        reject (e)
      }
    })
  },
  async addPolygon ({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.$axios.$post('/polygon', { shop_id: payload.id, points: payload.data })
        resolve (response)
      } catch (e) {
        reject (e)
      }
    })
  },
  async deletePolygon ({}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.$axios.$delete('/polygon', { data: { id: payload.id } })
        resolve (response)
      } catch (e) {
        reject (e)
      }
    })
  },
  async updatePolygon ({}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.$axios.$put('/polygon', payload)
        resolve (response)
      } catch (e) {
        reject (e)
      }
    })
  },
  async getPolygons ({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.$axios.$get('/polygons', { params: { shopID: payload.id } })
        resolve (response)
      } catch (e) {
        reject (e)
      }
    })
  },
  async getShop ({}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.$axios.$get('/shop', { params: { id: payload.id } })
        resolve (response)
      } catch (e) {
        reject (e)
      }
    })
  },
  async updateShop ({ dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.$put('/shop', payload)
        await dispatch('getShops')
        resolve ()
      } catch (e) {
        reject (e)
      }
    })
  },
  async deleteShop ({ dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.$delete('/shop', { data: { id: payload.id } })
        await dispatch('getShops')
        resolve ()
      } catch (e) {
        reject (e)
      }
    })
  },
  async empty({ state }) {
    return (!state.shops.length) ? true : false;
  }
}
