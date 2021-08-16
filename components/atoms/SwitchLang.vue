<template>
  <el-dropdown class="SwitchLang" @command="SelectLanguage" trigger="click" @visible-change="VisibleSwitchLang" placement="bottom-start">
    <!-- SwitchLang reference -->
    <button class="SwitchLang__Reference" type="button" :class="{ 'SwitchLang__Reference-Visible': SwitchLangVisibility }">
      <span class="SwitchLang__Reference-Flag" :style="{ backgroundImage: 'url('+require(`~/assets/flags/${value.icon}.svg`)+')' }" />
      <span class="SwitchLang__Reference-Label">{{ value.label }}</span>
      <v-icon name="ChevronDown" color="secondary-100" fill="" />
    </button>
    <!-- SwitchLang menu -->
    <el-dropdown-menu slot="dropdown" class="SwitchLang__menu" :visible-arrow="false" :append-to-body="true" transform-origin="left top">
      <el-dropdown-item v-for="(Language, LanguageID) in Languages" :key="LanguageID" :command="LanguageID" v-if="Language.value !== value.value">
        <div class="SwitchLang__Reference-Flag" :style="{ backgroundImage: 'url('+require(`~/assets/flags/${Language.icon}.svg`)+')' }" />
        <span class="SwitchLang__Reference-Label">{{ Language.label }}</span>
      </el-dropdown-item>
    </el-dropdown-menu>
    <!-- -->
  </el-dropdown>
</template>

<script>
import Icon from '@/components/atoms/icon'
import { mapGetters } from 'vuex'
export default {
  name: "SwitchLang",
  computed: {
    ...mapGetters({
      Languages: 'getLanguages'
    })
  },
  components: {
    'v-icon': Icon
  },
  methods: {
    SelectLanguage (index) {
      this.$emit('input', this.Languages[index])
    },
    VisibleSwitchLang (visible) {
      this.SwitchLangVisibility = visible
    }
  },
  props: [ 'value' ],
  data: () => ({
    SwitchLangVisibility: false
  })
}
</script>

<style scoped>

</style>
