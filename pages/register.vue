<template>
  <div>
    <Authentication v-if="width" />
    <Mobile v-if="!width" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  head: () => ({
    title: 'Yelm | Регистрация'
  }),
  layout: 'login',
  components: {
    Authentication: () => import('~/components/Authentication'),
    Mobile: () => import('~/components/Mobile')
  },
  data: () => ({
    width: true
  }),
  created() {
    if (process.client) {
      window.addEventListener('resize', this.updateWidth)
      this.updateWidth()
      this.setSelectedWindow('Phone')
      this.setAuthWindow('register')
    }
  },
  methods: {
    ...mapMutations({
      setSelectedWindow: 'authentication/setSelectedWindow',
      setAuthWindow: 'authentication/setAuthWindow'
    }),
    updateWidth() {
      if (window.innerWidth > 1024) {
        this.width = true
      } else {
        this.width = false
      }
    }
  }
}
</script>