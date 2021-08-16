<template>
  <v-button class="Shops__Actions-Add" plain="" circle="" icon="" native="button" @click="changeStatus">
    <component :is="Icon" slot="icon"
               :name="(value === 'View') ? 'Plus' : 'Check'"
               :color="(value === 'View') ? 'primary' : 'success'"
               fill="" />
  </v-button>
</template>

<script>
import Button from '@/components/atoms/button'
export default {
  name: "ActionAdd",
  components: {
    'v-button': Button
  },
  created() {
    this.Icon = require('@/components/atoms/icon').default
  },
  watch: {
    value: {
      handler(value) {
        this.Icon = null
        this.$nextTick(() => {
          this.Icon = require('@/components/atoms/icon').default
        })
      }, deep: true
    },
  },
  methods: {
    changeStatus () {
      this.Icon = null
      this.$emit('input', (this.value === 'View') ? 'Add' : 'View')
      this.$emit('change', (this.value === 'View') ? 'Add' : 'View')
      this.$nextTick(() => {
        this.Icon = require('@/components/atoms/icon').default
      })
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      Icon: null
    }
  }
}
</script>

<style scoped>

</style>
