<template>
  <div class="publication__first-step">
    <div class="text text__extra-large text__medium text__dark">Шаг 1 из 3</div>
    <div class="publication__first step">
      <div class="publication__first-line"></div>
      <div class="publication__first-inner inner">
        <div class="publication__first-image"></div>
        <h2>Мы сами загрузим ваше приложение в App Store и Google play.
          Расскажем, как быстрее вывести ваше приложение в ТОП
        </h2>
      </div>
    </div>
    <div class="publication__second step">
      <div class="publication__second-line"></div>
      <div class="publication__second-inner inner">
        <div class="publication__second-image"></div>
        <h2>Проконсультируем по всем вопросам, установим приложение к себе, протестируем и расскажем о нем всем друзья</h2>
      </div>
    </div>
    <div class="publication__third step">
      <div class="publication__third-inner inner">
        <div class="publication__third-image"></div>
        <h2>Стоимость обслуживания окупится уже через месяц после выгрузки приложения при правильном продвижении</h2>
      </div>
    </div>
    <button data-text="Продолжить" class="button button__primary button__large publication__btn" @click="getSecondStep">Продолжить</button>
    <img src="~/assets/images/marker.png" alt="" class="publication__marker" loading="lazy">
    <img src="~/assets/images/plane.png" alt="" class="publication__plane" loading="lazy">
    <div class="publication__cursor" />
    <component :is="SecondStep.Component" v-if="SecondStep.Component != null" @hide="getSecondStepClose" :width="innerWidth"/>
  </div>
</template>

<script>
import Button from '@/components/atoms/button'
import { mapMutations } from 'vuex'

export default {
  name: 'firststep',

  components: {
    'v-button': Button,
  },

  mounted() {
    this.$nextTick(function () {
      this.onResize();
    })
    window.addEventListener('resize', this.onResize)
  },

  data: () => ({
    showModal: false,
    SecondStep: { Component: null },
    innerWidth: 0,
  }),

  methods: {
    ...mapMutations({
      setStep: 'publication/setStep',
      setRedirected: 'publication/setRedirected',
    }),

    async getSecondStep() {
      if(this.$auth.user.balance < 20000) {
        this.setRedirected(true)
       await this.$router.push('settings')
      } else
      this.SecondStep.Component = await require('~/components/molecules/publication/secondstep').default
    },

    getSecondStepClose() {
      this.SecondStep.Component = null
    },

    onResize() {
      let clientWidth = window.innerWidth
      this.innerWidth = clientWidth
    },
  },
}
</script>
