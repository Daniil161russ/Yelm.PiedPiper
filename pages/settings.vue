<template>
  <vue-template-grid>
    <template slot="aside">
      <Setting />
    </template>
    <template slot="default">
      <section class="setting">
        <transition name="component-fade" mode="out-in">
          <component v-if="selectedWindow" :is="selectedWindow" />
        </transition>
      </section>
    </template>
  </vue-template-grid>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  layout: 'default',
  head: () => ({
    title: 'Yelm | Настройки'
  }),
  created() {
    this.setSelectedWindow('Index');
  },
  components: {
    Setting: () => import('~/components/Setting'),
    Index: () => import('~/components/molecules/setting/index'),
    Payment: () => import('~/components/molecules/setting/payment'),
    Personalization: () => import('~/components/molecules/setting/personalization'),
    Integration: () => import('~/components/molecules/setting/integration'),
    Delivery: () => import('~/components/molecules/setting/delivery'),
    Site: () => import('~/components/molecules/setting/site'),
    "vue-template-grid": () => import('~/components/templates/template-grid')
  },
  computed: {
    ...mapGetters({
      selectedWindow: 'setting/getSelectedWindow',
    })
  },
  methods: {
    ...mapMutations({
      setSelectedWindow: 'setting/setSelectedWindow'
    })
  }
}
</script>