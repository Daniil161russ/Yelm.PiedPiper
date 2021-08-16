<template>
  <div class="publication">
    <div class="grid__body-header">
      <div class="text text__extra-large text__medium text__dark">
        Шаг 3 из 3
      </div>
      <button :disabled="changePublication === false" data-text="Обновить" class="button button__primary button__medium" @click="updatePub">Обновить</button>
    </div>
    <div class="grid__body-wrapper">
      <el-form label-position="top" class="form">
        <el-form-item class="form-item">
          <template slot="label">
            <div class="publication__form-label">
              <span>Рекламный текст</span>
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете отредактировать рекламный текст" placement="top">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-question-mark"></use>
                </svg>
              </el-tooltip>
            </div>
          </template>
          <el-input kind="normal" resize="none" placeholder="Введите рекламный текст" type="textarea" v-model="publication.advertising" :disabled="changePublication === false"/>
        </el-form-item>
        <el-form-item class="form-item">
          <template slot="label">
            <div class="publication__form-label">
              <span>Описание приложения</span>
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете отредактировать описание приложения" placement="top">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-question-mark"></use>
                </svg>
              </el-tooltip>
            </div>
          </template>
          <el-input kind="normal" resize="none" placeholder="Введите описание" type="textarea" v-model="publication.description" :disabled="changePublication === false"/>
        </el-form-item>
        <el-form-item class="form-item">
          <template slot="label">
            <div class="publication__form-label">
              <span>Иконка приложения</span>
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете изменить иконку приложения" placement="top">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-question-mark"></use>
                </svg>
              </el-tooltip>
            </div>
          </template>
          <div class="publication__third-step-app-icon">
            <v-img-loader name="filepond" multiple="false" files="1" v-model="publication.logotype" v-if="publication.logotype == null" />
            <v-image v-if="publication.logotype != null" :link="publication.logotype" :width="227" :height="227" :radius="10" :style="{ backgroundSize: 'cover', backgroundPosition: '50%' }">
              <template slot="overlay">
                <v-button color="primary" native="button" plain="" circle="" icon="" @click="publication.logotype = null"><template slot="icon"><v-icon name="Edit" /></template></v-button>
              </template>
            </v-image>
            Размер изображения: <span><strong>1024px</strong>:<strong>1024px</strong></span>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
 name: 'thirdstep',
 layout: 'publication',

 components: {
   'v-button': () => import("~/components/atoms/button"),
   'v-icon': () => import("~/components/atoms/icon"),
   'v-img-loader': () => import("~/components/imgLoader"),
   'v-image': () => import("~/components/atoms/Image"),
 },

  data: () => ({
    status: null,
    changePublication: false,
    publication: {}
  }),

  mounted() {
    this.getPublishedStatus()
  },

 computed: {
   ...mapGetters({
     userData: 'user/getUser',
   }),
 },

  methods: {
   ...mapActions({
      updatePublication: 'publication/updatePublication',
      refreshUser: 'user/refreshUser'
   }),

    getPublishedStatus() {
      if (this.userData.published !== null && this.userData.published.status !== null) {
        this.publication = this.userData.published
        this.status = this.userData.published.status
        this.status.map(stat => {
        switch (stat) {
          case 'payment':
            return this.changePublication = true
          case 'moderation':
            return this.changePublication = true
          }
        })
      } return null
    },

    async updatePub() {
      await this.updatePublication(this.publication)
      await this.refreshUser
      this.$notify.success({ title: 'Успешно', message: 'Данные о публикации успешно обновлены и отправлены на модерацию', customClass: 'el-notification-success' })
    }
  }
}
</script>
