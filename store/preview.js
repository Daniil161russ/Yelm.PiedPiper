export const state = () => ({
  visible: false,
  allNews: [],
  allCategories: [],
  allItems: [],
  arrayOfCartItems: [],
  subcategories: [],
  totalCartPrice: '0.00',
  itemsLoader: false,
  newsLoader: false,
  subCategoryLoader: false,
})

export const getters = {
  getVisible(state) {
    return state.visible
  },

  getAllCategories(state) {
    return state.allCategories
  },

  getAllNews(state) {
    return state.allNews
  },

  getAllItems(state) {
    return state.allItems
  },

  getSubcategories(state) {
    return state.subcategories
  },

  getArrayOfCartItems(state) {
    return state.arrayOfCartItems
  },

  getTotalCartPrice(state) {
    return state.totalCartPrice
  },

  getItemsLoader(state) {
    return state.itemsLoader
  },

  getNewsLoader(state) {
    return state.newsLoader
  },

  getSubcategoryLoader(state) {
    return state.subCategoryLoader
  }
}

export const mutations = {
  setVisible(state) {
    state.visible = !state.visible
  },

  setAllNews(state, payload) {
    state.newsLoader = false
    state.allNews = payload
  },

  setAllCategories(state, payload) {
    state.allCategories = payload
  },

  setAllItems(state, payload) {
    state.itemsLoader = false
    state.allItems = payload
  },

  setSubcategories(state, payload) {
    state.subCategoryLoader = false
    state.subcategories = payload
  },

  emptyAllNews(state) {
    state.allNews = []
  },

  emptyAllItems(state) {
    state.allItems = []
  },

  emptyAllCategories(state) {
    state.allCategories = []
  },

  emptySubcategories(state) {
    state.subcategories = []
  },

  setItemsLoader(state, payload) {
    state.itemsLoader = payload
  },

  setNewsLoader(state, payload) {
    state.newsLoader = payload
  },

  setSubcategoryLoader(state, payload) {
    state.subCategoryLoader = payload
  },

  setArrayOfCartItems(state, payload) {
    const index = state.arrayOfCartItems.findIndex(e => e.id === payload.id)
    if (index === -1) {
      state.arrayOfCartItems.push({
        id: payload.id,
        name: payload.name,
        price: payload.price,
        images: payload.images,
        amount: 1
      })
    } else {
      state.arrayOfCartItems[index].amount += 1
    }
  },

  removeItemFromArrayOfCartItems(state, payload) {
    const index = state.arrayOfCartItems.findIndex(e => e.id === payload)
    if(index !== -1) {
      state.arrayOfCartItems[index].amount -= 1
      state.totalCartPrice = Math.round((state.totalCartPrice * 100 - state.arrayOfCartItems[index].price * 100) / 100)
      if(parseInt(state.totalCartPrice) < 0 || !state.arrayOfCartItems.length) {
        state.totalCartPrice = '0.00'
      }
      if (state.arrayOfCartItems[index].amount === 0) {
        state.arrayOfCartItems.splice(index, 1)
      }
    }
  },

  emptyArrayOfCartItems(state) {
    state.arrayOfCartItems = []
    state.totalCartPrice = '0.00'
  },

  setTotalCartPrice(state, payload) {
    if(!state.arrayOfCartItems.length) {
      state.totalCartPrice = '0.00'
    }
    let totalPrice = parseInt(state.totalCartPrice) * 100
    state.totalCartPrice = Math.round((totalPrice += payload * 100) / 100)
  }
}

export const actions = {
  async fetchAllNews({commit}) {
    try {
      await commit('setNewsLoader', true)
      await commit('emptyAllNews')
      await this.$axios.$get('https://dev.yelm.io/api/mobile/all-news', {
        params: {
          platform: this.$auth.user.platform,
          version: this.$auth.user.settings.app_version,
          language_code: 'ru',
          region_code: this.$auth.user.settings.region_code
        }
      }).then(response => commit('setAllNews', response))
    } catch (e) {
      console.log(e)
    }
  },

  async fetchAllCategories({commit}) {
    try {
      await commit('emptyAllCategories')
      await this.$axios.$get('https://dev.yelm.io/api/mobile/categories', {
        params: {
          platform: this.$auth.user.platform,
          language_code: 'nag_code',
          region_code: this.$auth.user.settings.region_code
        }
      }).then(response => commit('setAllCategories', response))
    } catch (e) {
      console.log(e)
    }
  },

  async fetchAllItems({commit}) {
    try {
      await commit('setItemsLoader', true)
      await commit('emptyAllItems')
      await this.$axios.$get('https://dev.yelm.io/api/mobile/items', {
        params: {
          version: this.$auth.user.settings.app_version,
          language_code: 'ru',
          region_code: this.$auth.user.settings.region_code,
          platform: this.$auth.user.platform,
          lat: this.$auth.user.position.lat,
          lon: this.$auth.user.position.lon,
        }
      }).then(response => commit('setAllItems', response))
    } catch (e) {
      console.log(e)
    }
  },

  async fetchSubcategories({commit}, payload) {
    try {
      await commit('setSubcategoryLoader', true)
      await commit('emptySubcategories')
      await this.$axios.$get('https://dev.yelm.io/api/mobile/subcategories', {
        params: {
          version: this.$auth.user.settings.app_version,
          language_code: 'ru',
          region_code: this.$auth.user.settings.region_code,
          platform: this.$auth.user.platform,
          lat: this.$auth.user.position.lat,
          lon: this.$auth.user.position.lon,
          id: payload.id,
          shop_id: payload.shop_id
        }
      }).then(response => commit('setSubcategories', response))
    } catch (e) {
      console.log(e)
    }
  }
}
