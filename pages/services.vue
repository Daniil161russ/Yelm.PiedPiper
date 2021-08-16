<template>
  <section class="services">
    <nav class="services__nav">
      <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Design" name="Design"><span class="tabs__label" slot="label">Дизайн</span></el-tab-pane>
        <el-tab-pane label="Filling" name="Filling"><span class="tabs__label" slot="label">Заполнение</span></el-tab-pane>
        <el-tab-pane label="Promotion" name="Promotion"><span class="tabs__label" slot="label">Продвижение</span></el-tab-pane>
      </el-tabs> 
    </nav>
    <div class="services__content">
      <transition name="component-fade" mode="out-in">
        <component :is="activeName" :v-if="activeName"/>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "services",
  components: {
    Design : () => import('~/components/molecules/services/body/design'),
    Filling : () => import('~/components/molecules/services/body/filling'),
    Promotion : () => import('~/components/molecules/services/body/promotion')
  },
  data: () => ({
		activeName: 'Design',
	}),
  computed: {
    ...mapGetters({
      getSelectedWindow: 'services/getSelectedWindow'
    })
  },
  methods: {
    ...mapMutations({
      setSelectedWindow: 'services/setSelectedWindow'
    }),
    handleClick(tab) {
      this.setSelectedWindow(tab.label)
    }
  },
}
</script>
