<template>
  <div class="preview__selected-category selected-category">
    <div class="selected-category__header">
      <div class="selected-category__header-top">
        <div class="preview__main-icon" :style="`background: #${getUser.settings.theme}`" @click="setVisibleCategory">
          <svg class="svg-sprite">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </div>
        <div class="selected-category__header-title">
          {{ category.name }}
        </div>
      </div>
      <div class="selected-category__header-search">
        <svg class="svg-sprite">
          <use xlink:href="#icon-minimize"></use>
        </svg>
        <input type="text" placeholder="Поиск..." v-model="search" disabled>
      </div>
    </div>
    <div class="selected-category__body">
      <div class="preview__items-block" v-for="block of getSubcategories" v-if="getSubcategories.length">
        <div class="preview__block-header">
          <div class="preview__block-title">{{ block.name }}</div>
          <div class="preview__block-icon" :style="`background: #${getUser.settings.theme}`">
            <svg class="svg-sprite">
              <use xlink:href="#icon-chevron-right"></use>
            </svg>
          </div>
        </div>
        <div class="preview__items-wrapper">
          <VueSlickCarousel v-bind="settings" v-if="getSubcategories.length && block.items.length" class="preview__items-slider">
            <div class="preview__item item" v-for="item of block.items" :key="item.id">
              <div class="item__card" :style="`background: url(${item.images.length ? item.images[0] : ''}) no-repeat center; background-size: cover`" @click="setSelectedItem(item)">
                <div class="item__discount-badge" :style="`background: #${getUser.settings.theme}`" v-if="item.discount > 0">
                  <p>- {{ item.discount }}</p>
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-percent"></use>
                  </svg>
                </div>
              </div>
              <div class="item__name">{{ item.name }}</div>
              <div class="item__badge badge" :style="`background: #${getUser.settings.theme}`">
                <svg class="svg-sprite badge__icon">
                  <use xlink:href="#icon-minus"></use>
                </svg>
                <span class="badge__price">{{ item.price }}</span>
                <svg class="svg-sprite badge__currency">
                  <use xlink:href="#icon-rub"></use>
                </svg>
                <svg class="svg-sprite badge__icon">
                  <use xlink:href="#icon-plus"></use>
                </svg>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </div>
      <div class="preview__preloader preview__preloader_items" v-if="getSubcategoryLoader">
        <div class="preview__preloader-b1" :style="`background-color: #${getUser.settings.theme}`"></div>
        <div class="preview__preloader-b2" :style="`background-color: #${getUser.settings.theme}`"></div>
        <div class="preview__preloader-b3" :style="`background-color: #${getUser.settings.theme}`"></div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "category",

  components: {
    VueSlickCarousel
  },

  data: () => ({
    search: ''
  }),

  props: ['getUser', 'category', 'getAllItems', 'settings'],

  mounted() {
    this.fetchSubcategories({id: this.category.id, shop_id: this.getAllItems[0].shop_id})
  },

  computed: {
    ...mapGetters({
      getSubcategories: 'preview/getSubcategories',
      getSubcategoryLoader: 'preview/getSubcategoryLoader',
    }),
  },

  methods: {
    ...mapActions({
      fetchSubcategories: 'preview/fetchSubcategories'
    }),

    setVisibleCategory() {
      this.$emit('setVisibleCategory')
    },

    setSelectedItem(item) {
      this.setVisibleCategory()
      this.$emit('setSelectedItem', item)
    },
  }
}
</script>
