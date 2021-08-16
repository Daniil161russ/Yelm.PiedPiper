<template>
  <el-dropdown class="aside__account" @command="handleCommand" trigger="click">
    <div class="aside__account-data el-dropdown-link">
      <img class="aside__account-image" :src="$auth.user.image" loading="lazy">
      <div class="aside__account-name">{{ $auth.user.username }}</div>
      <svg class="svg-sprite aside__account-arrow">
        <use xlink:href="#icon-arrow-down"></use>
      </svg>
    </div>
    <el-dropdown-menu command class="aside__dropdown" slot="dropdown">
      <el-dropdown-item class="aside__dropdown-item">
        <NuxtLink to="/settings" prefetch>
          <svg class="svg-sprite svg-sprite_settings">
            <use xlink:href="#icon-settings"></use>
          </svg>
          Настройки
        </NuxtLink>
      </el-dropdown-item>
      <el-dropdown-item class="aside__dropdown-item">
        <NuxtLink to="/shops" prefetch>
          <svg class="svg-sprite svg-sprite_">
            <use xlink:href="#icon-shops"></use>
          </svg>
          Мои магазины
        </NuxtLink>
      </el-dropdown-item>
      <el-dropdown-item class="aside__dropdown-item" command="logout">
        <a>
          <svg class="svg-sprite svg-sprite_">
            <use xlink:href="#icon-exit"></use>
          </svg>
          Выход
        </a>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {

  computed: {
    ...mapGetters({
      getVisible: 'preview/getVisible'
    })
  },

  methods: {
    ...mapMutations({
      setVisible: 'preview/setVisible'
    }),

    handleCommand(command) {
      switch (command) {
        case 'logout': {
          this.$auth.logout().then(() => {
            this.getVisible === true ? this.setVisible() : null
            this.$router.push({ name: 'login' })
          })
          break;
        }
      }
    }
  }
}
</script>
