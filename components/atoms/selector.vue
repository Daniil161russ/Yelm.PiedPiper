<template>
  <div class="switch">
    <el-dropdown class="switch-dropdown" trigger="click" @visible-change="visibleLangSwitch">
      <button class="switch-dropdown_link" :class="{ 'active': viewLangSwitch }" type="button">
          <CountryFlag iso="RU" />
        <span class="flag-code">
          RU
        </span>
        <span class="el-input-suffix">
          <span class="el-input__suffix-inner">
            <i class='el-select__caret el-input__icon el-icon-arrow-up'  :class="{ 'el-input-active': viewLangSwitch }"></i>
          </span>
        </span>
      </button>
      <el-dropdown-menu slot="dropdown" class="switch-dropdown_list">
        <el-dropdown-item v-for="(lang, lang_idx) in locales" :command="lang.code" :key="lang_idx">
          <CountryFlag :iso="lang" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import CountryFlag from '@dzangolab/vue-country-flag-icon'
import '@dzangolab/vue-country-flag-icon/dist/CountryFlag.css'
export default {
  components: {
    CountryFlag
  },
  data: () => ({
    locales: ["US", "RU", "UA"],
    viewLangSwitch: false,
    LangOptions: [],
  }),
  methods: {
    visibleLangSwitch () {
      this.viewLangSwitch = !this.viewLangSwitch
    },
  }
}
</script>
