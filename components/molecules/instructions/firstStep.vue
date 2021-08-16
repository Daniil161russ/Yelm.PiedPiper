<template>
  <div class="instructions__firstStep firstStep">
    <div class="firstStep__content">
      <img src="~/assets/images/instructions/instructions-cube.png">
      <h2 class="firstStep__title"><span>Добро пожаловать</span> в конструктор мобильных приложений Yelm!</h2>
      <p class="firstStep__subtitle">С помощью нашей платформы вы сможете самостоятельно создать приложение и в кратчайшие сроки разместить его в App Store и Google Play</p>
      <button data-text="Продолжить" class="button button__primary button__medium" @click="setSelectedComponent('secondStep')">Продолжить</button>
    </div>
    <img src="~/assets/images/instructions/instructions-firstStep.png" alt="Приветственное фото" class="firstStep__welcomeImage">
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "firstStep",

  methods: {
    ...mapMutations({
      setSelectedComponent: 'instructions/setSelectedComponent'
    })
  }
}
</script>

