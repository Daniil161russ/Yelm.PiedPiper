<template>
  <div>
    <el-dialog  :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="showSecondModal"
                :custom-class="width > 769 ? 'publication__second-step' : 'publication__second-step-mobile'" :append-to-body="true"
                :fullscreen="width < 769">
      <template slot="title">
        <div class="second-step__left">
          <div class="text text__extra-large text__dark text__medium el-dialog__header-title">Шаг 2 из 3</div>
        </div>
        <v-button plain="" circle="" native="button" color="primary" icon=""  @click="$emit('hide')" class="el-dialog__header-close">
          <v-icon name="Close" slot="icon" fill="" color="primary" />
        </v-button>
      </template>
      <el-form label-position="top" class="form" :rules="PublicationRules" :model="PublicationForm" ref="PublicationForm" hide-required-asterisk>
        <el-form-item class="form-item" prop="advertising" >
          <template slot="label">
            <div class="publication__form-label">
              <span>Рекламный текст</span>
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать рекламный текст" placement="top">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-question-mark"></use>
                </svg>
              </el-tooltip>
            </div>
          </template>
          <el-input kind="normal" resize="none" v-model="PublicationForm.advertising" placeholder="Введите рекламный текст" type="textarea"/>
        </el-form-item>
        <el-form-item class="form-item" prop="description">
          <template slot="label">
            <div class="publication__form-label">
              <span>Описание приложения</span>
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать описание приложения" placement="top">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-question-mark"></use>
                </svg>
              </el-tooltip>
            </div>
          </template>
          <el-input kind="normal" resize="none" v-model="PublicationForm.description" placeholder="Введите описание" type="textarea"/>
        </el-form-item>
        <el-form-item class="form-item" prop="image">
          <template slot="label">
            <div class="publication__form-label">
              <span>Иконка приложения</span>
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать иконку приложения" placement="top">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-question-mark"></use>
                </svg>
              </el-tooltip>
            </div>
          </template>
          <imgLoader name="filepond" multiple="false" files="1" v-model="PublicationForm.image" imageValidateSizeMinWidth="1024"
                     imageValidateSizeMaxWidth="1024" imageValidateSizeMinHeight="1024" imageValidateSizeMaxHeight="1024" v-if="PublicationForm.image === null"/>
          <v-img :width="227" :height="227" :radius="10" size="contain" v-if="PublicationForm.image" :link="PublicationForm.image" :style="{ backgroundSize: 'cover', backgroundPosition: '50%' }">
            <template slot="overlay">
              <v-button circle="" icon="" color="secondary-100" size="large" @click="PublicationForm.image = null">
                <template slot="icon">
                  <v-icon name="trash" size="large"></v-icon>
                </template>
              </v-button>
            </template>
          </v-img>
          Размер изображения: <span><strong>1024px</strong>:<strong>1024px</strong></span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <v-button round="" color="gradient-BlueToPurpleToRed" @click.native="submitPublication">
          Продолжить
       </v-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Button from '@/components/atoms/button'
import imgLoader from "@/components/imgLoader";
import Image from '@/components/atoms/Image'
import icon from '@/components/atoms/icon'

export default {
  name: 'secondstep',
  components: {
    'v-button': Button,
    'v-img': Image,
    'v-icon': icon,
    imgLoader,
  },

  props: ["width"],

  created() {
    this.PublicationRules = {
      advertising: [
        { required: true, message: 'Введите рекламный текст', trigger: 'blur'}
      ],
      description: [
        { required: true, message: 'Введите описание приложения', trigger: 'blur'}
      ],
      image: [
        { required: true, message: 'Загрузите иконку приложения', trigger: 'change'}
      ],
    }
  },

  data: () => {
    return {
      showSecondModal: true,
      PublicationForm: {
        advertising: '',
        description: '',
        image: null,
      },
    }
  },

  computed: {
    ...mapGetters({
      getErrors: 'publication/getErrors',
    })
  },

  methods: {
    ...mapMutations({
      setStep: 'publication/setStep',
    }),
    ...mapActions({
      getUserData: 'user/getUserData',
      refreshUser: 'user/refreshUser',
      addPublication: 'publication/addPublication',
    }),

   async submitPublication() {
      this.$refs.PublicationForm.validate((valid) => {
        if(valid) {
          this.submitData()
        } else this.$notify.error({ title: 'Ошибка', message: 'Заполните поля формы', customClass: 'el-notification-error' })
      })
    },

    async submitData() {
      const formData = {
        advertising: this.PublicationForm.advertising,
        description: this.PublicationForm.description,
        logotype: this.PublicationForm.image,
        banner: this.PublicationForm.image
      }
      await this.addPublication(formData)
      if(this.getErrors.length) {
        this.$notify.error({ title: 'Ошибка', message: this.getErrors[0], customClass: 'el-notification-error' })
      } else {
        this.setStep(3)
        await this.refreshUser()
        this.$notify.success({ title: 'Успешно', message: 'Вы отправили заявку на публикацию приложения', customClass: 'el-notification-success' })
        await this.getUserData()
        this.showSecondModal = false
      }
    }
  },
}
</script>
