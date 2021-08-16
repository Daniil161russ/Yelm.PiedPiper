<template>
 <div class="preview__selected-news selected-news">
   <div class="selected-news__header" :style="`background: url(${news.image}) center no-repeat; background-size: cover;`">
     <div class="preview__main-icon" :style="`background: #${getUser.settings.theme}`" @click="setVisibleNews">
       <svg class="svg-sprite">
         <use xlink:href="#icon-arrow-left"></use>
       </svg>
     </div>
     <div class="preview__main-icon icon-share" :style="`background: #${getUser.settings.theme}`">
       <svg class="svg-sprite">
         <use xlink:href="#icon-share"></use>
       </svg>
     </div>
   </div>
   <div class="selected-news__body selected-news__body_full">
     <h3 class="selected-news__title" :style="`color: #${getUser.settings.theme}`">{{ news.title }}</h3>
     <div class="selected-news__description" v-html="news.description"></div>
     <div class="selected-news__items-list" v-if="news.items.length">
       <h3 class="selected-news__subtitle">Товары:</h3>
       <div class="selected-news__items-container">
         <div class="preview__item item" v-for="item of news.items" :key="item.id">
           <div class="item__card" :style="`background: url(${item.images.length ? item.images[0] : ''}) no-repeat center; background-size: cover`"></div>
           <div class="item__name">{{ item.name }}</div>
           <div class="item__badge badge" :style="`background: #${getUser.settings.theme}`">
             <span class="badge__price">{{ item.price }}</span>
             <svg class="svg-sprite badge__currency">
               <use xlink:href="#icon-rub"></use>
             </svg>
             <svg class="svg-sprite badge__icon">
               <use xlink:href="#icon-plus"></use>
             </svg>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: "news",

  props: ['getUser', 'news'],


  data: () => ({
    body: null
  }),

  methods: {
    setVisibleNews() {
      this.$emit('setVisibleNews')
    },
  },
}
</script>

<style scoped>

</style>
