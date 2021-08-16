<template>
  <section class="publication">
    <Publication v-if="this.userData.published === null" />
    <vue-template-grid v-else>
      <template slot="aside">
        <PublicationAside/>
      </template>
      <template slot="default">
        <PublicationThirdStep/>
      </template>
    </vue-template-grid>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '@/components/atoms/button'
import Image from '@/components/atoms/Image'
import icon from '@/components/atoms/icon'

export default {
  name: 'publication',
  layout: "default",

  components: {
    'v-button': Button,
    'v-img': Image,
    'v-icon': icon,
    Publication: () => import('~/components/molecules/publication/firststep'),
    PublicationAside: () => import('~/components/molecules/publication/thirdstepAside'),
    PublicationThirdStep: () => import('~/components/molecules/publication/thirdstep'),
    "vue-template-grid": () => import('~/components/templates/template-grid')
  },

   async asyncData ({ store }) {
     await store.dispatch('user/refreshUser')
   },

  computed: {
    ...mapGetters({
      userData: 'user/getUser',
    }),
  },
}
</script>


