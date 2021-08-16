<template>
  <div class="grid__aside-container">
    <div class="grid__aside-header">
      <h1 class="h1">Администратор</h1>
    </div>
    <div class="grid__aside-body">
      <div class="admin__aside-container">
        <button @click="setSelectedWindow('Clients')" class="button button__secondary">
          Клиенты
          <svg class="svg-sprite svg-sprite_switch">
            <use xlink:href="#icon-switch"></use>
          </svg>
        </button>
        <button @click="setSelectedWindow('Promocodes')" class="button button__secondary">
          Промокоды
          <svg class="svg-sprite svg-sprite_switch">
            <use xlink:href="#icon-switch"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      setSelectedWindow: 'admin/setSelectedWindow'
    }),
  }
}
</script>
