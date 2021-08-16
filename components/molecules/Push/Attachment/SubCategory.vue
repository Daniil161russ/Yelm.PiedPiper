<template>
  <el-collapse class="Collapse Collapse--Top Collapse--Tree" v-model="select_category" accordion>
    <el-collapse-item :name="category.name['RU']" :disabled="category.disabled"
                      v-for="(category, category_id) in subcategories" :key="category_id" v-if="category.subcategories.length">
      <v-button plain="" shadow="none" native="button" slot="title"><v-icon slot="icon" name="ChevronPush" />{{ category.name['RU'] }}</v-button>
      <div class="Collapse--List">
        <div class="Collapse--List__Row" v-for="(subcategory, subcategory_id) in category.subcategories" :key="subcategory_id">
          <v-button plain="" native="button" shadow="none" size="small" @click="selectSubCategory(subcategory.id, category.id)"
          :class="{ 'active': (value.indexOf(subcategory.id) !== -1) }">
            {{ subcategory.name['RU'] }}
          </v-button>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '@/components/atoms/button'
import Icon from '@/components/atoms/icon'
export default {
  name: "SubCategory",
  components: {
    'v-button': Button,
    'v-icon': Icon
  },
  computed: {
    ...mapGetters({
      Categories: 'category/getCategories'
    })
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  created() {
    this.subcategories = this.Categories.map((category) => ({
      id: category.id, disabled: false, name: category.name,
      subcategories: category.subcategories.map((subcategory) => ({ name: subcategory.name, id: subcategory.id, category_id: subcategory.category_id }))
    }))
    if (this.value.length) {
      for (let [category_idx, category] of this.subcategories.entries()) {
        const findCategoryID = category.subcategories.find((subcategory) => (subcategory.id === this.value[0]))
        if (typeof findCategoryID === 'undefined') {
          this.subcategories[category_idx].disabled = true
        } else {
          const findCategory = this.subcategories.find((value) => (value.id === findCategoryID.category_id))
          this.select_category = findCategory.name['RU']
        }
      }
    }
  },
  methods: {
    selectSubCategory (subcategory_id, category_id) {
      if (this.value.length) {
        if (this.value[0] !== subcategory_id) {
          this.value.splice(0, 1)
          this.value.push(subcategory_id)
        } else {
          this.value.splice(0, 1)
        }
      } else {
        this.value.push(subcategory_id)
      }
      this.$emit('input', this.value)
      if (this.value.length) {
        for (let [category_idx, category] of this.subcategories.entries()) this.subcategories[category_idx].disabled = ( category.id !== category_id )
      } else {
        for (let [category_idx] of this.subcategories.entries()) this.subcategories[category_idx].disabled = false
      }
    }
  },
  data: () => ({
    subcategories: [],
    select_category: null
  })
}
</script>

<style scoped>

</style>
