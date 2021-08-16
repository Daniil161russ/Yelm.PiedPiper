<template>
  <div class="instructions__wrapper">
    <transition name="component-fade" mode="out-in">
      <component :is="getSelectedComponent" />
    </transition>
    <div class="instructions__pagination pagination">
      <div :class="getSelectedComponent === 'firstStep' ? 'pagination__circle pagination__circle_active' : 'pagination__circle'" @click="setSelectedComponent('firstStep')">
        <div></div>
      </div>
      <div :class="getSelectedComponent === 'secondStep' ? 'pagination__circle pagination__circle_active' : 'pagination__circle'" @click="setSelectedComponent('secondStep')">
        <div></div>
      </div>
      <div :class="getSelectedComponent === 'thirdStep' ? 'pagination__circle pagination__circle_active' : 'pagination__circle'" @click="setSelectedComponent('thirdStep')">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: "instructions",

  computed: {
    ...mapGetters({
      getSelectedComponent: 'instructions/getSelectedComponent'
    })
  },

  methods: {
    ...mapMutations({
      setSelectedComponent: 'instructions/setSelectedComponent'
    })
  },

  components: {
    firstStep: () => import("~/components/molecules/instructions/firstStep"),
    secondStep: () => import("~/components/molecules/instructions/secondStep"),
    thirdStep: () => import("~/components/molecules/instructions/thirdStep"),
  },
}
</script>

