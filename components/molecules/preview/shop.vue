<template>
  <div class="preview__main" v-if="visibleShop">
    <div class="preview__header">
      <svg class="svg-sprite">
        <use xlink:href="#icon-minimize"></use>
      </svg>
      <div class="preview__address" :style="`background: #${getUser.settings.theme}`">
        ул.Строителей, 25/12
      </div>
      <svg class="svg-sprite">
        <use xlink:href="#icon-push"></use>
      </svg>
    </div>
    <div class="preview__body">
      <div class="preview__news">
        <VueSlickCarousel v-bind="settings" v-if="getAllNews.length">
          <div class="preview__news-card-wrapper" v-for="news of getAllNews" :key="news.id">
            <div class="preview__news-card" :style="`background: url(${news.image}) center no-repeat; background-size: cover`" @click="setSelectedNews(news)">
              <span :style="`color: #${getUser.settings.foreground}`">{{ news.title }}</span>
            </div>
          </div>
        </VueSlickCarousel>
        <div class="preview__preloader" v-if="getNewsLoader">
          <div class="preview__preloader-b1" :style="`background-color: #${getUser.settings.theme}`"></div>
          <div class="preview__preloader-b2" :style="`background-color: #${getUser.settings.theme}`"></div>
          <div class="preview__preloader-b3" :style="`background-color: #${getUser.settings.theme}`"></div>
        </div>
        <div class="preview__preloader" v-else-if="!getAllNews.length">
          <p>Для отображения новостей в режиме предпросмотра добавьте их на вкладке "Новости"</p>
        </div>
      </div>
      <div class="preview__items">
        <div class="preview__items-block" v-for="block of getAllItems" v-if="getAllItems.length">
          <div class="preview__block-header">
            <div class="preview__block-title">{{ block.name }}</div>
            <div class="preview__block-icon" :style="`background: #${getUser.settings.theme}`">
              <svg class="svg-sprite">
                <use xlink:href="#icon-chevron-right"></use>
              </svg>
            </div>
          </div>
          <div class="preview__items-wrapper">
            <VueSlickCarousel v-bind="settings" v-if="getAllItems.length && block.items.length" class="preview__items-slider">
              <div class="preview__item item" v-for="item of block.items" :key="item.id">
                <div class="item__card" :class="getArrayOfCartItems.map(e => e.id === item.id && e.amount !== 0 ? 'item__card-active' : '')"
                     :style="`background: url(${item.images.length ? item.images[0] : ''}) no-repeat center; background-size: cover`" @click="setSelectedItem(item)">
                  <span>
                  {{ getArrayOfCartItems.map(e => e.id === item.id ? e.amount : '').join('').toString() }}
                  </span>
                  <div class="item__discount-badge" :style="`background: #${getUser.settings.theme}`" v-if="item.discount > 0">
                    <p>- {{ item.discount }}</p>
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-percent"></use>
                    </svg>
                  </div>
                </div>
                <div class="item__name">{{ item.name }}</div>
                <div class="item__badge badge" :style="`background: #${getUser.settings.theme}`">
                  <svg class="svg-sprite badge__icon" @click="removeItemFromArrayOfCartItems(item.id)">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                  <span class="badge__price">{{ item.price }}</span>
                  <svg class="svg-sprite badge__currency">
                    <use xlink:href="#icon-rub"></use>
                  </svg>
                  <svg class="svg-sprite badge__icon" @click="setArrayOfCartItems(item); setTotalCartPrice(parseInt(item.price))">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
        <div class="preview__preloader preview__preloader_items" v-if="getItemsLoader">
          <div class="preview__preloader-b1" :style="`background-color: #${getUser.settings.theme}`"></div>
          <div class="preview__preloader-b2" :style="`background-color: #${getUser.settings.theme}`"></div>
          <div class="preview__preloader-b3" :style="`background-color: #${getUser.settings.theme}`"></div>
        </div>
        <div class="preview__preloader preview__preloader_items" v-else-if="!getAllItems.length">
          <p>Для отображения товаров в режиме предпросмотре добавьте их на вкладке "Товары" и отобразите на главном экране</p>
        </div>
      </div>
      <div class="preview__categories">
        <div class="preview__block-header">
          <div class="preview__block-title">Категории</div>
          <div class="preview__block-icon" :class="visibleCategories ? 'preview__block-icon-active': ''" @click="setVisibleCategories" :style="`background: #${getUser.settings.theme}`">
            <svg class="svg-sprite">
              <use xlink:href="#icon-chevron-right"></use>
            </svg>
          </div>
        </div>
        <div class="preview__categories-block" v-if="visibleCategories">
          <div class="preview__categories-card" v-for="category of getAllCategories" :key="category.id"
               :style="`background: url(${category.image}) center no-repeat; background-size: cover; cursor: pointer;`" @click="setSelectedCategory(category)">
            <span :style="`color: #${getUser.settings.theme_category}`">{{ category.name }}</span>
          </div>
        </div>
      </div>
      <div class="preview__cart-badge cart-badge" :style="`background: #${getUser.settings.theme}`" @click="setVisibleCart" v-if="getArrayOfCartItems.length">
        <svg class="svg-sprite cart-badge__cart-badge-icon">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="cart-badge__amount">{{ getTotalCartPrice }}</span>
        <svg class="svg-sprite cart-badge__currency">
          <use xlink:href="#icon-rub"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapMutations, mapGetters } from 'vuex'

export default {
name: "shop",
  components: {
    VueSlickCarousel,
  },

  props: ['getAllNews', 'getAllCategories', 'getAllItems', 'getUser', 'settings'],


  data: () => ({
    visibleCategories: true,
    visibleShop: true,
    selectedItem: null,
  }),

  computed: {
    ...mapGetters({
      getTotalCartPrice: 'preview/getTotalCartPrice',
      getArrayOfCartItems: 'preview/getArrayOfCartItems',
      getItemsLoader: 'preview/getItemsLoader',
      getNewsLoader: 'preview/getNewsLoader'
    })
  },

  methods: {
    ...mapMutations({
      setArrayOfCartItems: 'preview/setArrayOfCartItems',
      setTotalCartPrice: 'preview/setTotalCartPrice',
      removeItemFromArrayOfCartItems: 'preview/removeItemFromArrayOfCartItems'
    }),

    setVisibleCategories() {
      this.visibleCategories = !this.visibleCategories
    },

    setVisibleCart() {
      this.$emit('setVisibleCart')
    },

    setSelectedItem(item) {
      this.$emit('setSelectedItem', item)
    },

    setSelectedNews(news) {
      this.$emit('setSelectedNews', news)
    },

    setSelectedCategory(category) {
      this.$emit('setSelectedCategory', category)
    }
  },
}
</script>
