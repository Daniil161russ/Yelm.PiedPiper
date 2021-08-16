<template>
  <el-dropdown class="SwitchPrice" @command="SelectCurrency" trigger="click" @visible-change="VisibleSwitchPrice" placement="bottom-start">
    <!-- SwitchPrice reference -->
    <button class="SwitchPrice__Reference" type="button" :class="{ 'SwitchPrice__Reference-Visible': SwitchPriceVisibility }">
      <span class="SwitchPrice__Reference-Flag" :style="{ backgroundImage: 'url('+require(`~/assets/flags/${value.icon}.svg`)+')' }" />
      <span class="SwitchPrice__Reference-Label">{{ value.label }}</span>
      <v-icon name="ChevronDown" color="secondary-100" fill="" />
    </button>
    <!-- SwitchPrice menu -->
    <el-dropdown-menu slot="dropdown" class="SwitchPrice__menu" :visible-arrow="false" :append-to-body="true" transform-origin="left top">
      <el-dropdown-item v-for="(Cur, CurID) in Currency" :key="CurID" :command="CurID" v-if="Cur.value !== value.value">
        <div class="SwitchPrice__Reference-Flag" :style="{ backgroundImage: 'url('+require(`~/assets/flags/${Cur.icon}.svg`)+')' }" />
        <span class="SwitchPrice__Reference-Label">{{ Cur.label }}</span>
      </el-dropdown-item>
    </el-dropdown-menu>
    <!-- -->
  </el-dropdown>
</template>

<script>
import Icon from '@/components/atoms/icon'
import { mapGetters } from 'vuex'
export default {
  name: "SwitchPrice",
  computed: {
    ...mapGetters({
      Currency: 'getCurrency'
    })
  },
  components: {
    'v-icon': Icon
  },
  props: [ 'value' ],
  methods: {
    SelectCurrency (CurID) {
      this.$emit('input', this.Currency[CurID])
    },
    VisibleSwitchPrice (visible) {
      this.SwitchPriceVisibility = visible
    }
  },
  data: () => ({
    SwitchPriceVisibility: false
  })
}
</script>

<style scoped>

</style>
