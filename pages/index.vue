<template>
  <div>
    <transition name="component-fade" mode="out-in">
      <section class="instructions" v-if="$auth.user.first_login === 'true'">
        <Instructions />
      </section>
      <div v-if="$auth.user.subscription === null && $auth.user.first_login === 'false'" class="subscription subscription_analytics">
        <h1 class="h1"><span>Аналитика</span> будет доступна после публикации приложения</h1>
        <img src="https://yelm.io/assets/images/analytics/analytics.png" alt="Аналитика">
      </div>
    </transition>
    <div v-if="$auth.user.subscription !== null && $auth.user.first_login === 'false'">
      <section class="analytics">
        <nav class="analytics__nav">
          <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
            <!-- <el-tab-pane label="Session" name="Session"><span class="tabs__label" slot="label">Сессии</span></el-tab-pane> -->
            <el-tab-pane label="Installation" name="Installation"><span class="tabs__label" slot="label">Установки</span></el-tab-pane>
            <!-- <el-tab-pane label="OrdersAndAudience" name="OrdersAndAudience"><span class="tabs__label" slot="label">Заказы и аудитория</span></el-tab-pane> -->
            <!-- <el-tab-pane label="Goods" name="Goods"><span class="tabs__label" slot="label">Товары</span></el-tab-pane> -->
          </el-tabs>
        </nav>
        <div class="analytics__content">
          <transition name="component-fade" mode="out-in">
            <component :is="activeName" :v-if="activeName"/>
          </transition>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Instructions: () => import('~/components/molecules/instructions/instructions'),
    // Session : () => import('~/components/molecules/analytics/body/session'),
    Installation : () => import('~/components/molecules/analytics/body/installation'),
    // OrdersAndAudience : () => import('~/components/molecules/analytics/body/ordersAndAudience'),
    // Goods : () => import('~/components/molecules/analytics/body/goods')
  },
  data: () => ({
		activeName: 'Installation',
	}),
  computed: {
    ...mapGetters({
      getSelectedWindow: 'analytics/getSelectedWindow'
    }),
  },
  methods: {
    ...mapMutations({
      setSelectedWindow: 'analytics/setSelectedWindow'
    }),
    handleClick(tab) {
      this.setSelectedWindow(tab.label)
    }
  }
}
</script>
