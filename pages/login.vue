<template>
  <div>
    <Authentication v-if="$device.isDesktop"/>
    <Mobile v-if="$device.isMobileOrTablet"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  head: () => ({
    title: 'Yelm | Авторизация'
  }),
  layout: 'login',

  components: {
    Authentication: () => import('~/components/Authentication'),
    Mobile: () => import('~/components/Mobile')
  },

  data: () => ({
    width: true,
    innerWidth: 0,
    mobile: null,
  }),

   created() {
 //    if (process.client) {
 //     window.addEventListener('resize', this.updateWidth)
 //      this.updateWidth()
 //      this.setSelectedWindow('Phone')
 //      this.setAuthWindow('login')
 //    }
     this.setAuthWindow('login')
   },

  methods: {
    ...mapMutations({
      setSelectedWindow: 'authentication/setSelectedWindow',
      setAuthWindow: 'authentication/setAuthWindow'
    }),



    // onResize() {
    //   let clientWidth = window.innerWidth
    //   this.innerWidth = clientWidth
    //   console.log(this.innerWidth)
    // },
    // updateWidth() {
    //   if (window.innerWidth > 1024) {
    //     this.width = true
    //   } else {
    //     this.width = false
    //   }
    // }
  }
}

</script>
