<template>
  <div class="login">
    <div class="login__nav">
      <span class="login__nav-text">{{ (authWindow === 'login') ? 'Нет аккаунта?' : 'Есть аккаунт?' }}</span>
      <NuxtLink class="login__nav-btn" :to="(authWindow === 'login') ? '/register' : '/login'" prefetch>{{ (authWindow === 'login') ? 'Регистрация' : 'Авторизация' }}</NuxtLink>
    </div>
    <div class="login__logotype">
      <img src="~/assets/images/login/logotype.png" alt="Yelm Media">
      <span>Yelm</span>
    </div>
    <div class="login__containers">
      <transition name="component-fade" mode="out-in">
        <component v-if="selectedWindow" :is="selectedWindow" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Login",
  components: {
    Phone: () => import('~/components/molecules/authentication/phone'),
    Code: () => import('~/components/molecules/authentication/code'),
    Application: () => import('~/components/molecules/authentication/application'),
  },
  computed: {
    ...mapGetters({
      selectedWindow: 'authentication/getSelectedWindow',
      authWindow: 'authentication/getAuthWindow'
    })
  }
}
</script>