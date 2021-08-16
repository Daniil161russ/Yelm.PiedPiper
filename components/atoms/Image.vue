<template>
  <div class="v-img"
       :style="{
          backgroundImage: 'url('+v_image+')',
          width: width+'px',
          height: height+'px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: (typeof size === 'undefined') ? 'auto' : size,
          borderRadius: (typeof radius === 'undefined') ? 'inherit' : radius+'px'
    }">
    <div class="v-img__overlay" v-if="typeof $slots.overlay !== 'undefined'"
         :style="{ borderRadius: (typeof radius === 'undefined') ? 'inherit' : radius+'px' }">
      <slot name="overlay" />
    </div>
    <slot name="default" />
  </div>
</template>

<script>
export default {
  name: "v-img",
  props: {
    src: {
      type: String,
      required: false
    },
    link: {
      type: String,
      required: false
    },
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    size: {
      type: String,
      required: false
    },
    radius: {
      type: Number,
      required: false
    }
  },
  watch: {
    link: {
      handler(link) {
        this.v_image = link
      }, deep: true, immediate: true
    }
  },
  created() {
    if (typeof this.src !== 'undefined') {
      this.v_image = require(`~/assets/images/${this.src}`)
    }
    if (typeof this.link !== 'undefined') {
      this.v_image = this.link
    }
  },
  data: () => {
    return {
      v_image: null
    }
  }
}
</script>

<style scoped>

</style>
