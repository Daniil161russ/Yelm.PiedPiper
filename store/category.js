export const state = () => ({
  categories: [],
  select_subcategory: null
})

export const getters = {
  getCategories: (state) => {
    return state.categories
  },
  getSelectSubCategory: (state) => {
    return state.select_subcategory
  }
}

export const mutations = {
  EmptyCategories (state) {
    state.categories = []
  },
  selectSubcategory(state, payload) {
    state.select_subcategory = payload
  },
  showSubCategories(state, index) {
    state.categories[index].show_subcategories = !state.categories[index].show_subcategories
  },
  SetCategories(state, payload) {
    payload = payload.map((value) => {
      value.subcategories = []
      value.show_subcategories = false
      return value
    })
    state.categories = payload
  },
  AddSubCategory (state, payload) {
    state.categories[payload.Category_Index].subcategories.push(payload.SubCategory)
  },
  setOpenCategory (state) {
    const category_index_find = state.categories.findIndex((category) => ( category.subcategories.find((subcategory) => ( subcategory.id === state.select_subcategory )) ))
    if (category_index_find !== -1) {
      state.categories[category_index_find].show_subcategories = true
    }
  },
  removeCategory (state, payload) {
    state.categories.splice(state.categories.findIndex((category) => (category.id === payload)), 1)
  },
  addCategory (state, payload) {
    payload.subcategories = []
    payload.show_subcategories = false
    state.categories.unshift(payload)
  },
  changeCategory (state, payload) {
    const old_category_index = state.categories.findIndex((category) => (category.id === payload.id))
    payload.subcategories = state.categories[old_category_index].subcategories
    payload.show_subcategories = state.categories[old_category_index].show_subcategories
    state.categories[old_category_index] = payload
  },
  addSubCategory(state, payload) {
    const old_category_index = state.categories.findIndex((category) => (category.id === payload.category_id))
    state.categories[old_category_index].subcategories.unshift(payload)
  },
  changeSubCategory (state, payload) {
    const old_category_index = state.categories.findIndex((category) => (category.id === payload.category_id))
    const old_subcategory_index = state.categories[old_category_index].subcategories.findIndex((subcategory) => ( subcategory.id === payload.id ))
    state.categories[old_category_index].subcategories[old_subcategory_index] = payload
  },
  removeSubCategory (state, payload) {
    const old_category_index = state.categories.findIndex((category) => (category.subcategories.find((subcategory) => (subcategory.id === payload.id))))
    const old_subcategory_index = state.categories[old_category_index].subcategories.findIndex((subcategory) => ( subcategory.id === payload.id ))
    state.categories[old_category_index].subcategories.splice(old_subcategory_index, 1)
  },
}

export const actions = {
  // Category
  async pushCategory({ dispatch, commit }, payload) {
    try {
      const data = await this.$axios.$post('/category', payload)
      await commit('addCategory', data)
    } catch(error) {
      this.$notify.error({ title: 'Ошибка', message: error })
    }
  },
  async changeCategory({ dispatch, commit }, payload) {
    try {
      const data = await this.$axios.$put('/category', payload)
      await commit('changeCategory', data)
    } catch(error) {
      this.$notify.error({ title: 'Ошибка', message: error })
    }
  },
  async removeCategory({ dispatch, commit, state }, payload) {
    return await this.$axios.$delete('/category', { data: payload }).then(response => {
      commit('removeCategory', payload.id)
    }).catch(e => {
      if (e.response.status === 403) {
        return 403;
      } else if (e.response.status === 409) {
        return 403;
      }
    })
  },
  async getCategories({ dispatch, state }) {
    if (!state.categories.length) {
      dispatch('refreshCategories')
    }
  },
  async refreshCategories({ commit, state }) {
    if (!state.categories.length) {
      commit('EmptyCategories')
      try {
        const Categories = await this.$axios.$get('/categories')
        const SubCategories = await this.$axios.$get('/subcategories')
        commit('SetCategories', Categories)
        for (let [Category_Index, Category] of Categories.entries()) {
          for (const SubCategory of SubCategories) {
            if (SubCategory.category_id === Category.id) {
              commit('AddSubCategory', { SubCategory: SubCategory, Category_Index: Category_Index })
            }
          }
        }
        commit('setOpenCategory')
      } catch(e) {
        console.log(e)
      }
    }
  },
  // SubCategory
  async pushSubCategory({ dispatch, commit }, payload) {
    try {
      const data = await this.$axios.$post('/subcategory', payload)
      await commit('addSubCategory', data)
      //dispatch('refreshCategories')
    } catch(error) {
      this.$notify.error({ title: 'Ошибка', message: error })
    }
  },
  async changeSubCategory ({ commit }, payload) {
    try {
      const data = await this.$axios.$put('/subcategory', payload)
      await commit('changeSubCategory', data)
      //dispatch('refreshCategories')
    } catch(error) {
      this.$notify.error({ title: 'Ошибка', message: error })
    }
  },
  async removeSubCategory ({ dispatch, state, commit }, payload) {
    return await this.$axios.$delete('/subcategory', { data: payload })
      .then(() => {
        if (state.select_subcategory === payload.id) {
          commit('selectSubcategory', null)
          dispatch ('items/getItemsTable', { select_subcategory: null }, { root: true })
        }
        commit('removeSubCategory', payload )
      })
      .catch(e => {
        if (e.response.status === 403) return 403
      })
  }
}
