<template>
  <div class="instructions__thirdStep thirdStep">
    <div class="thirdStep__content">
      <h2 class="thirdStep__title">Десятки наших клиентов уже создали свое приложение,<span>присоединяйтесь и вы!</span></h2>
      <div class="thirdStep__examples">
        <img :src="require(`~/assets/images/instructions/${example}.png`)" v-for="example in examples">
      </div>
      <button data-text="Начать" class="button button__primary button__medium" @click="instructionsComplete">Начать</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: "thirdStep",

  data:() => ({
    examples: [
      'tardini', 'avestal', 'delicate', 'enot'
    ]
  }),

  methods: {
    ...mapActions({
      refreshUser: 'user/refreshUser',
    }),

    ...mapMutations({
      setShowGuide: 'instructions/setShowGuide'
    }),

    async instructionsComplete() {
      await this.$axios.$put('/user', { status: 'false' })
      await this.refreshUser()
      await this.setShowGuide(true)
    }
  }
}
</script>

