export const state = () => ({
  items: [],
  items_table: [],
  items_table_page: 1,
})

export const getters = {
  getItems: (state) => {
    return state.items
  },
  getItemsPage: (state) => {
    return state.items_table_page
  },
  getItemsTable: (state) => {
    return state.items_table
  },
}

export const mutations = {
  setItemsPage (state, payload) {
    state.items_table_page = payload
  },
  emptyItems (state) {
    state.items = []
  },
  setItems(state, payload) {
    payload = payload.map((value) => {
      value.created_at = this.$moment(value.created_at).format('DD.MM.YYYY в HH:mm')
      value.updated_at = this.$moment(value.updated_at).format('DD.MM.YYYY в HH:mm')
      return value
    })
    state.items = payload
  },
  setItemsTable (state, select_subcategory) {
    if (select_subcategory === null) {
      state.items_table = state.items
    } else {
      state.items_table = state.items.filter((item) => (item.subcategory_id === select_subcategory))
    }
  }
}

export const actions = {
  async addItem ({ dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.$post('/item', payload)
        await dispatch('refreshItems')
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
  },
  async updateItem ({ dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.$put('/item', payload)
        await dispatch('refreshItems')
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
  },
  async deleteItem ({ dispatch }, item_id) {
    await this.$axios.$delete('/item', { data: { id: item_id, version: 3 } })
    await dispatch('refreshItems')
  },
  async getItems ({ dispatch, state }) {
    await dispatch('refreshItems')
  },
  async refreshItems({ commit }) {
    commit('emptyItems')
    const data = await this.$axios.$get('/items')
    await commit('setItems', data)
    await commit('setItemsTable', null)
  },
  async getItemsTable ({ dispatch, commit }, payload) {
    // await dispatch('refreshItems')
    await commit('setItemsTable', payload.select_subcategory)
  },
  async getItem ({}, item_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$get('item', { params: { id: parseInt(item_id), version: 3 } })
        resolve(data[0])
      } catch(e) {
        reject(e)
      }
    })
  }
}