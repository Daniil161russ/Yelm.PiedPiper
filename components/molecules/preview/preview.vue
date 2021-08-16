<template>
  <LazyHydrate when-visible>
    <div ref="draggableContainer" class="preview">
      <div class="preview__instructions" v-if="instructions">
        <div class="preview__instructions-box">Меня можно переместить :)</div>
      </div>
      <div class="preview__close">
        <v-button plain="" circle="" native="button" color="primary" icon="" @click="setVisible" class="el-dialog__header-close">
          <v-icon name="Close" slot="icon" fill="" color="primary" />
        </v-button>
      </div>
      <div class="preview__move" @mousedown="dragMouseDown">
        <v-button plain="" circle="" native="button" color="primary" icon="" class="el-dialog__header-close">
          <v-icon name="Finger" slot="icon" fill="" color="primary" />
        </v-button>
      </div>
      <Shop @setSelectedCategory="setSelectedCategory" @setSelectedItem="setSelectedItem" @setSelectedNews="setSelectedNews"
            :getAllNews="getAllNews" :getAllCategories="getAllCategories" :getAllItems="getAllItems" :getUser="getUser" :settings="settings"
            v-if="!visibleCart && !visibleItem && !visibleNews && !visibleCategory" @setVisibleCart="setVisibleCart"/>
      <Cart :getUser="getUser" v-if="visibleCart" @setVisibleCart="setVisibleCart" />
      <Item :getUser="getUser" :item="selectedItem" v-if="visibleItem" @setVisibleItem="setVisibleItem" />
      <News :getUser="getUser" :news="selectedNews" v-if="visibleNews" @setVisibleNews="setVisibleNews"/>
      <Category :getUser="getUser" :category="selectedCategory" @setSelectedItem="setSelectedItem" :getAllItems="getAllItems" v-if="visibleCategory" @setVisibleCategory="setVisibleCategory" :settings="settings"/>
    </div>
  </LazyHydrate>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: "preview",

  components: {
    LazyHydrate,
    Cart: () => import('~/components/molecules/preview/cart'),
    Shop: () => import('~/components/molecules/preview/shop'),
    Item: () => import('~/components/molecules/preview/item'),
    News: () => import('~/components/molecules/preview/news'),
    Category: () => import('~/components/molecules/preview/category'),
    'v-button': () => import('~/components/atoms/button'),
    'v-icon': () => import('~/components/atoms/icon')
  },

  data: () => ({
    positions: {
      clientX: null,
      clientY: null,
      movementX: 0,
      movementY: 0
    },
    instructions: false,
    visibleCart: false,
    visibleItem: false,
    visibleNews: false,
    visibleCategory: false,
    selectedItem: null,
    selectedNews: null,
    selectedCategory: null,
    settings: {
      arrows: true,
      infinite: false,
      slidesToScroll: 1,
      variableWidth: true,
      cssEase: 'ease',
    },
  }),

  computed: {
    ...mapGetters({
      getAllNews: 'preview/getAllNews',
      getAllCategories: 'preview/getAllCategories',
      getAllItems: 'preview/getAllItems',
      getUser: 'user/getUser',
    })
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if(mutation.type === 'news/setNews') {
        this.fetchAllNews()
      }
      else if (mutation.type === 'items/setItems') {
        this.itemsLoading = true
        this.fetchAllItems()
        this.itemsLoading = false
      }
      else if (mutation.type === 'items/setItemsTable') {
        this.fetchAllCategories()
      }
    })
  },

  beforeDestroy() {
    this.unsubscribe()
  },

  mounted() {
    this.getUserData();
    this.fetchAllNews();
    this.fetchAllCategories();
    this.fetchAllItems();
    setTimeout(() => {
      this.instructions = true;
      setTimeout(() => {
        this.instructions = false
      }, 10000)
    }, 4000)
  },

  methods: {
    ...mapActions({
      fetchAllNews: 'preview/fetchAllNews',
      fetchAllCategories: 'preview/fetchAllCategories',
      fetchAllItems: 'preview/fetchAllItems',
      getUserData: 'user/getUserData',
    }),

    ...mapMutations({
      setVisible: "preview/setVisible",
    }),

    setVisibleCart() {
      this.visibleCart = !this.visibleCart
    },

    setVisibleItem() {
      this.visibleItem = !this.visibleItem
    },

    setVisibleNews() {
      this.visibleNews = !this.visibleNews
    },

    setVisibleCategory() {
      this.visibleCategory = !this.visibleCategory
    },

    setSelectedItem(item) {
      this.selectedItem = item
      this.visibleItem = true
    },

    setSelectedNews(news) {
      this.selectedNews = news
      this.visibleNews = true
    },

    setSelectedCategory(category) {
      this.selectedCategory = category
      this.visibleCategory = true
    },

    dragMouseDown(event) {
      event.preventDefault()
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },

    elementDrag(event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
    },

    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    },
  }
}
</script>

