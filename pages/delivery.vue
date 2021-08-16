<template>
  <vue-template-grid>
    <template slot="aside">
      <Staff/>
    </template>
    <template slot="default">
      <section class="delivery">
        <transition name="component-fade" mode="out-in">
          <component v-if="selectedWindow" :is="selectedWindow" />
        </transition>
      </section>
    </template>
  </vue-template-grid>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'default',
  head: () => ({
    title: 'Yelm | Доставка'
  }),
  components: {
    Staff: () => import('~/components/molecules/staff/staff'),
    MapStaff: () => import('~/components/molecules/staff/body/mapStaff'),
    AddStaff: () => import('~/components/molecules/staff/body/addStaff'),
    EditStaff: () => import('~/components/molecules/staff/body/editStaff'),
    "vue-template-grid": () => import('~/components/templates/template-grid')
  },
  computed: {
    ...mapGetters({
      selectedWindow: 'staff/getSelectedWindow',
    })
  }
}
</script>