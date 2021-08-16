<template>
  <button
    :class="buttonClass"
    :type="(typeof native !== 'undefined') ? native : ''"
    @click.prevent="handleClick"
  >
    <span class="btn__text" v-if="typeof circle === 'undefined'">
      <slot name="default" />
    </span>
    <slot v-if="(typeof $slots.icon !== 'undefined')" name="icon" />
  </button>
</template>

<script>
import icon from '@/components/atoms/icon'

export default {
  components: {
    'v-icon': icon
  },
  mounted() {
    this.$nextTick(() => {
      this.generateButtonClass()
    })
  },
  watch: {
    $props: {
      handler (props) {
        this.generateButtonClass ()
      }, deep: true
    },
  },
  methods: {
    generateButtonClass () {
      this.buttonClass = 'btn'
      if (typeof this.plain !== 'undefined') {
        this.buttonClass += ' btn__plain';
      }
      if (typeof this.color !== 'undefined') {
        this.buttonClass += ' btn__' + this.color
      }
      if (typeof this.circle !== 'undefined') {
        this.buttonClass += ' btn__circle'
      }
      if (typeof this.circle !== 'undefined' && typeof this.size !== 'undefined') {
        this.buttonClass += ' btn__circle-'+this.size
      }
      if (typeof this.circle === 'undefined' && typeof this.size !== 'undefined') {
        this.buttonClass += ' btn__'+this.size
      }
      if (typeof this.round !== 'undefined') {
        this.buttonClass += ' btn__round'
      }
      if (typeof this.square !== 'undefined') {
        this.buttonClass += ' btn__square'
      }
      if (typeof this.shadow !== 'undefined') {
        this.buttonClass += ' btn__shadow-'+this.shadow
      }
      if (typeof this.icon !== 'undefined') {
        this.buttonClass += ' btn__icon'
      }
      if (typeof this.center !== 'undefined') {
        this.buttonClass += ' btn__center'
      }
    },
    handleClick ($event) {
      if (typeof this.to !== 'undefined') {
        this.$router.push(this.to)
      }
      this.$emit('click', $event)
    }
  },
  props: [
    'center',
    'round',
    'square',
    'circle',
    'to', // Link
    'size', // Size
    'icon', // Icon
    'plain', // Plain button
    'native', // Native type button
    'color', // Color button
    'shadow' // Shadow button
  ],
  data: () => {
    return {
      buttonClass: 'btn__loader'
    }
  }
}
</script>
