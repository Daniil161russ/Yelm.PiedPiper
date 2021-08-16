<template>
  <div class="owl-carousel owl-theme Slider" ref="Categories_Slider">
    <div class="item" v-for="(category, category_id) in Categories" :key="category_id">
      <v-image class="Categories--Slider Categories__Item" :link="category.image" :width="120" :height="120" :radius="10" size="cover" :style="{
                backgroundImage: (value.indexOf(category.id) !== -1) ?  'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+category.image+')' :
                                                                                  'linear-gradient(180deg, rgba(0, 0, 0, 0) 29.5%, rgba(0, 0, 0, 0.5) 100%), url('+category.image+')'
              }">
        <div class="news__carousel-item_text" slot="default" v-if="value.indexOf(category.id) === -1">{{ category.name['RU'] }}</div>
        <v-icon name="Check" class="news__carousel-item_icon" v-if="value.indexOf(category.id) !== -1" @click.native="removeCategory(category.id)" />
        <v-button size="small" plain="" circle="" icon="" slot="overlay" native="button" @click="addCategory(category.id)" v-if="value.indexOf(category.id) === -1">
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
  name: "Category",
  components: {
    'v-image': Image,
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
  mounted() {
    this.$nextTick(async () => {
      this.Category.Arrow = require('~/assets/icons/ArrowLeft.svg?raw')
      await this.categoryCarousel ()
    })
  },
  destroyed() {
    if (this.Category.Carousel != null) {
      this.Category.Carousel.trigger('destroy.owl.carousel')
    }
  },
  methods: {
    addCategory (category_id) {
      if (this.value.length) {
        this.value.splice(0, 1)
      }
      this.value.push (category_id)
      this.$emit('input', this.value)
    },
    removeCategory (category_id) {
      this.value.splice (this.value.indexOf(category_id), 1)
      this.$emit('input', this.value)
    },
    async categoryCarousel () {
      if (this.Category.Carousel != null) {
        this.Category.Carousel.trigger('destroy.owl.carousel')
      }
      this.Category.Carousel = $(this.$refs.Categories_Slider).owlCarousel({
        dots: false, nav: true, autoWidth: true, margin: 18, navContainerClass: 'Items__Add-Nav', navClass: [ 'Items__Add-Nav_Btn Prev', 'Items__Add-Nav_Btn Next' ], navText: [ this.Category.Arrow, this.Category.Arrow ]
      })
      this.Category.Carousel.trigger('refresh.owl.carousel')
      this.Category.Carousel.trigger('update.owl.carousel')
    }
  },
  data: () => ({
    Category: { Carousel: null, Show: false, Arrow: false }
  })
}
</script>

<style scoped>

</style>
