<template>
  <div class="instructions__secondStep secondStep">
    <div class="secondStep__content">
      <h2 class="secondStep__title">Становитесь лучше <span>вместе с нами!</span></h2>
      <div class="secondStep__steps">
        <div class="secondStep__card" v-for="step in steps" :key="step.id">
          <img class="secondStep__card-icon" :src="require(`~/assets/images/instructions/${step.icon}.png`)">
          <h3 class="secondStep__card-title">{{ step.title }}</h3>
          <p class="secondStep__card-subtitle">{{ step.subtitle }}</p>
        </div>
      </div>
      <button data-text="Продолжить" class="button button__primary button__medium" @click="setSelectedComponent('thirdStep')">Продолжить</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "secondStep",

  data: () =>({
    steps: [
      { id: 1, icon: 'user', title: 'Шаг 1', subtitle: 'Ознакомьтесь с основными функциями' },
      { id: 2, icon: 'equalizer', title: 'Шаг 2', subtitle: 'Заполните свое приложение контентом' },
      { id: 3, icon: 'stopwatch', title: 'Шаг 3', subtitle: 'Отправить на публикацию' },
      { id: 4, icon: 'target', title: 'Шаг 4', subtitle: 'Дождитесь публикации в AppStore & GooglePlay и приглашайте в свое приложение пользователей' },
    ]
  }),

  methods: {
    ...mapMutations({
      setSelectedComponent: 'instructions/setSelectedComponent'
    })
  }
}
</script>

