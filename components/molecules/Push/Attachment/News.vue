<template>
  <div class="owl-carousel owl-theme Slider" ref="News_Slider">
    <div class="item" v-for="(item, item_id) in news" :key="item_id">
      <v-image class="Categories--Slider Categories__Item" :link="item.image" :width="164" :height="110" :radius="10" size="cover" :style="{
                backgroundImage: (value.indexOf(item.id) !== -1) ?  'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+item.image+')' :
                                                                                  'linear-gradient(180deg, rgba(0, 0, 0, 0) 29.5%, rgba(0, 0, 0, 0.5) 100%), url('+item.image+')'
              }">
        <div class="news__carousel-item_text" slot="default" v-if="value.indexOf(item.id) === -1">{{ item.title['RU'] }}</div>
        <v-icon name="Check" class="news__carousel-item_icon" v-if="value.indexOf(item.id) !== -1" @click.native="removeNews(item.id)" />
        <v-button size="small" plain="" circle="" icon="" slot="overlay" native="button" @click="addNews(item.id)" v-if="value.indexOf(item.id) === -1">
          <v-icon name="Check" color="primary" fill="" size="small" slot="icon" />
        </v-button>
      </v-image>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Image from '@/components/atoms/Image'
import Button from '@/components/atoms/button'
import Icon from '@/components/atoms/icon'
export default {
  name: "News",
  components: {
    'v-image': Image,
    'v-button': Button,
    'v-icon': Icon
  },
  computed: {
    ...mapGetters({
      news: 'news/getNews'
    })
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  created() {
    this.News.Arrow = require('~/assets/icons/ArrowLeft.svg?raw')
  },
  mounted() {
    this.$nextTick(async () => {
      // console.log(this.news)
      await this.newsCarousel ()
    })
  },
  destroyed() {
    if (this.News.Carousel != null) {
      this.News.Carousel.trigger('destroy.owl.carousel')
    }
  },
  methods: {
    addNews (news_id) {
      if (this.value.length) {
        this.value.splice(0, 1)
      }
      this.value.push (news_id)
      this.$emit('input', this.value)
    },
    removeNews (news_id) {
      this.value.splice (this.value.indexOf(news_id), 1)
      this.$emit('input', this.value)
    },
    async newsCarousel () {
      if (this.News.Carousel != null) {
        this.News.Carousel.trigger('destroy.owl.carousel')
      }
      this.News.Carousel = $(this.$refs.News_Slider).owlCarousel({
        dots: false, nav: true, autoWidth: true, margin: 18, navContainerClass: 'Items__Add-Nav', navClass: [ 'Items__Add-Nav_Btn Prev', 'Items__Add-Nav_Btn Next' ], navText: [ this.News.Arrow, this.News.Arrow ]
      })
      this.News.Carousel.trigger('refresh.owl.carousel')
      this.News.Carousel.trigger('update.owl.carousel')
    }
  },
  data: () => ({
    News: { Carousel: null, Arrow: false }
  })
}
</script>

<style scoped>

</style>
