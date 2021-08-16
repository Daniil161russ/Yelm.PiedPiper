<template>
  <el-collapse class="Collapse Collapse--Top Collapse--Tree" v-model="select_category" accordion>
    <el-collapse-item :name="category.name['RU']" :disabled="category.disabled"
                      v-for="(category, category_id) in subcategories" :key="category_id" v-if="category.subcategories.length">
      <v-button plain="" shadow="none" native="button" slot="title"><v-icon slot="icon" name="ChevronPush" />{{ category.name['RU'] }}</v-button>
      <div class="Collapse--List">
        <div class="Collapse--List__Row" v-for="(subcategory, subcategory_id) in category.subcategories" :key="subcategory_id">
          <v-button plain="" native="button" shadow="none" size="small" @click="selectSubCategory(subcategory.id, category.id)"
                    :class="{ 'active': (select_subcategories.indexOf(subcategory.id) !== -1) }">
            {{ subcategory.name['RU'] }}
          </v-button>
        </div>
      </div>
      <div class="Collapse--List__Slider">
        <div class="owl-carousel owl-theme" ref="Items_Slider" v-if="view_items.length">
          <div class="item" v-for="(item, item_id) in view_items" :key="item_id">
            <v-image class="Categories--Slider Categories__Item" :link="item.preview_image" :width="120" :height="120" :radius="10" size="cover" :style="{
                backgroundImage: (value.indexOf(category.id) !== -1) ?  'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+item.preview_image+')' :
                                                                                  'linear-gradient(180deg, rgba(0, 0, 0, 0) 29.5%, rgba(0, 0, 0, 0.5) 100%), url('+item.preview_image+')'
              }">
              <div class="news__carousel-item_text" slot="default" v-if="value.indexOf(item.id) === -1">{{ item.name['RU'] }}</div>
              <v-icon name="Check" class="news__carousel-item_icon" v-if="value.indexOf(item.id) !== -1" @click.native="removeItem(item.id)" />
              <v-button size="small" plain="" circle="" icon="" slot="overlay" native="button" @click="addItem(item.id)" v-if="value.indexOf(item.id) === -1">
                <v-icon name="Check" color="primary" fill="" size="small" slot="icon" />
              </v-button>
            </v-image>
          </div>
        </div>
      </div>

    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '@/components/atoms/button'
import Icon from '@/components/atoms/icon'
import Image from "@/components/atoms/Image";
export default {
  name: "SubCategory",
  components: {
    'v-button': Button,
    'v-icon': Icon,
    'v-image': Image,
  },
  computed: {
    ...mapGetters({
      Categories: 'category/getCategories',
      Items: 'items/getItems'
    })
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  created() {
    this.Item.Arrow = require('~/assets/icons/ArrowLeft.svg?raw')
    this.subcategories = this.Categories.filter((category) => (typeof this.Items.find((item) => (item.category_id === category.id)) !== 'undefined'))
    .map((category) => ({
      id: category.id, disabled: false, name: category.name,
      subcategories: category.subcategories.filter((subcategory) => (typeof this.Items.find((item) => (item.subcategory_id === subcategory.id)) !== 'undefined'))
      .map((subcategory) => ({ name: subcategory.name, id: subcategory.id, category_id: subcategory.category_id }))
    }))
    if ( this.value.length ) {
      const findItem = this.Items.find((item) => ( item.id === this.value[0] ))
      this.select_subcategories.push(findItem.subcategory_id)
    }
    if (this.select_subcategories.length) {
      for (let [category_idx, category] of this.subcategories.entries()) {
        const findCategoryID = category.subcategories.find((subcategory) => (subcategory.id === this.select_subcategories[0]))
        if (typeof findCategoryID === 'undefined') {
          this.subcategories[category_idx].disabled = true
        } else {
          const findCategory = this.subcategories.find((value) => (value.id === findCategoryID.category_id))
          this.select_category = findCategory.name['RU']
        }
      }
    }
    if (this.select_subcategories.length) {
      this.view_items = this.Items.filter((item) => (this.select_subcategories.indexOf(item.subcategory_id) !== -1))
    } else {
      this.view_items = []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.categoryCarousel ()
    })
  },
  destroyed() {
    if (this.Item.Carousel != null) {
      this.Item.Carousel.trigger('destroy.owl.carousel')
    }
  },
  methods: {
    addItem (item_id) {
      if (this.value.length) {
        this.value.splice(0, 1)
      }
      this.value.push (item_id)
      this.$emit('input', this.value)
    },
    removeItem (item_id) {
      this.value.splice (this.value.indexOf(item_id), 1)
      this.$emit('input', this.value)
    },
    categoryCarousel () {
      if (this.Item.Carousel != null) {
        this.Item.Carousel.trigger('destroy.owl.carousel')
      }
      if (this.view_items.length) {
        this.$nextTick(() => {
          if ( typeof this.$refs.Items_Slider !== 'undefined' ) {
            this.Item.Carousel = $(this.$refs.Items_Slider).owlCarousel({
              dots: false, nav: true, autoWidth: true, margin: 18, navContainerClass: 'Items__Add-Nav', navClass: [ 'Items__Add-Nav_Btn Prev', 'Items__Add-Nav_Btn Next' ], navText: [ this.Item.Arrow, this.Item.Arrow ]
            })
            this.$nextTick(() => {
              this.Item.Carousel.trigger('refresh.owl.carousel')
              this.Item.Carousel.trigger('update.owl.carousel')
            })
          }
        })
      }
    },
    selectSubCategory (subcategory_id, category_id) {
      if (this.value.length) {
        return 1
      }
      if (this.select_subcategories.length) {
        if (this.select_subcategories[0] !== subcategory_id) {
          this.select_subcategories.splice(0, 1)
          this.select_subcategories.push(subcategory_id)
        } else {
          this.select_subcategories.splice(0, 1)
        }
      } else {
        this.select_subcategories.push(subcategory_id)
      }
      if (this.select_subcategories.length) {
        for (let [category_idx, category] of this.subcategories.entries()) this.subcategories[category_idx].disabled = ( category.id !== category_id )
        this.view_items = this.Items.filter((item) => (this.select_subcategories.indexOf(item.subcategory_id) !== -1))
      } else {
        this.view_items = []
        for (let [category_idx] of this.subcategories.entries()) this.subcategories[category_idx].disabled = false
      }
      this.categoryCarousel ()
    }
  },
  data: () => ({
    select_subcategories: [],
    select_category: null,
    subcategories: [],
    view_items: [],
    Item: { Carousel: null, Arrow: false }
  })
}
</script>

<style scoped>

</style>
