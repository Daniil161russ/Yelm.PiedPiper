<template>
  <section class="publication__aside">
    <div class="grid__aside-header">
      <div class="text text__extra-large text__medium text__dark">Статус публикации</div>
    </div>
      <div class="grid__aside-body">
        <client-only>
          <template slot="placeholder">
            <div class="publication__aside-preloader" style="width: 100%;"><div class="publication__aside-preloader-status"></div><div class="publication__aside-preloader-text"></div></div>
          </template>
        <div class="publication__third-step-status">
          <div v-if="publicationStatus === 'moderation'" class="publication__third-step-conditional">
            <img src="https://yelm.io/assets/images/publication/moderation.webp" loading="lazy">
            <div class="publication__third-step-conditional-text">
              <div class="text text__large text__primary text__bold">
                На модерации
              </div>
              <div class="text text__dark">
                Ваше приложение находится на модерации
              </div>
            </div>
          </div>
          <div v-else-if="publicationStatus === 'processing'" class="publication__third-step-conditional">
           <img src="https://yelm.io/assets/images/publication/processing.webp" loading="lazy">
            <div class="publication__third-step-conditional-text">
              <div class="text text__large text__primary text__bold">
                В процессе публикации
              </div>
              <div class="text text__dark">
                Приложение в процессе публикации
              </div>
            </div>
          </div>
          <div v-else-if="publicationStatus === 'published'" class="publication__third-step-conditional">
            <img src="https://yelm.io/assets/images/publication/published.webp" loading="lazy">
            <div class="publication__third-step-conditional-text">
              <div class="text text__large text__primary text__bold">
                Опубликовано
              </div>
              <div class="text text__dark">
                Ваше приложение опубликовано !
              </div>
            </div>
          </div>
          <div class="publication__third-step-contact-us" v-if="publicationStatus !== 'published'">
            <p class="text text__dark">Изменение информации о приложении возможно только в период модерации. По вопросам публикации приложения Вы можете связаться с нами</p>
            <a href="tel:79851217753" class="text text__primary text__bold">+79851217753</a>
          </div>
        </div>
        </client-only>
      </div>
  </section>
</template>

<script>
import Button from '@/components/atoms/button'
import Image from '@/components/atoms/Image'
import icon from '@/components/atoms/icon'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'thirdstepAside',

  components: {
    'v-button': Button,
    'v-img': Image,
    'v-icon': icon,
  },

  data: () => ({
    publicationStatus: '',
    status: [],
  }),

  computed: {
    ...mapGetters({
      userData: 'user/getUser',
    }),
  },

  mounted() {
    this.checkStatus()

  },

  methods: {
    ...mapActions({
      getUserData: 'user/getUserData',
      refreshUserData: 'user/refreshUser',
    }),
    getPublishedStatus() {
      if (this.userData.published !== null && this.userData.published.status !== null) {
        this.status = this.userData.published.status
      } return null
    },
    async checkStatus () {
      await this.refreshUserData()
      await this.getUserData()
      await this.getPublishedStatus()
      return this.status.map((str) => {
      switch (str) {
        case 'payment':
          return this.publicationStatus = 'moderation'
        case 'moderation':
          return this.publicationStatus = 'moderation'
        case 'build':
          return this.publicationStatus = 'processing'
        case 'design':
          return this.publicationStatus = 'processing'
        case 'published':
          return this.publicationStatus = 'published'
        break
        }
      })
    },
  },
}
</script>
