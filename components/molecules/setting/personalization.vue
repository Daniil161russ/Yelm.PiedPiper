<template>
  <div class="grid__container">
    <div class="grid__body-header">
      <div class="grid__body-header-left">
        <h2 class="h1">Персонализация</h2>
      </div>
    </div>
    <div class="grid__body-wrapper personalization">
      <el-col :xs="24" :sm="26" :md="28" :lg="29" :xl="31">
        <el-form label-position="top" class="form">
          <el-form-item v-for="(col, col_idx) in accountData" :key="col_idx" :label="col.label" class="form-item">
            <template slot="label">
              <div class="setting-form__form-label">
                <span v-if="col.label === 'Изменить название'">Изменить название</span>
                <span v-else-if="col.label === 'Изменить текст приветствия'">Изменить текст приветствия</span>
                <span v-else-if="col.label === 'Изменить номер телефона'">Изменить номер телефона</span>
                <span v-else-if="col.label === 'Изменить код для входа в аккаунт'">Изменить код для входа в аккаунт</span>

                <el-tooltip v-if="col.label === 'Изменить название'" class="item" effect="dark" content="Здесь Вы можете изменить название приложения" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>

                <el-tooltip v-if="col.label === 'Изменить текст приветствия'" class="item" effect="dark" content="Здесь Вы можете изменить текст приветствия" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>

                <el-tooltip v-else-if="col.label === 'Изменить номер телефона'" class="item" effect="dark" content="Здесь Вы можете изменить номер телефона для приложения" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>

                <el-tooltip v-else-if="col.label === 'Изменить код для входа в аккаунт'" class="item" effect="dark" content="Здесь Вы можете установить личный код для входа в аккаунт" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>

              </div>
            </template>

            <el-input v-if="col.label === 'Изменить название'" kind="normal" v-model="col.value" :type="col.type" :value="col.value" :placeholder="col.placeholder"/>
            <el-input v-else-if="col.label === 'Изменить текст приветствия'" kind="normal" v-model="col.value" :value="col.value" :placeholder="col.placeholder"/>
            <el-input v-else-if="col.label === 'Изменить номер телефона'" kind="normal" v-model="col.value" :type="col.type" :value="col.value" :placeholder="placeholder" v-mask="mask"/>
            <el-input v-else-if="col.label === 'Изменить код для входа в аккаунт'" kind="normal" v-model="col.value" :value="col.value" :placeholder="col.placeholder" v-mask="maskCode"/>

            <v-button color="primary" plain="" circle="" icon="" v-if="col.edited" @click.prevent="updateUserValue(col_idx)" size="large" style="margin-left: 15px" >
              <template slot="icon">
                <v-icon name="refresh" color="primary" fill=""></v-icon>
              </template>
            </v-button>
          </el-form-item>
        </el-form>
       </el-col>
       <el-form ref="personalizationForm" :model="personalizationForm" :rules="rulePersonalizationForm" label-position="top" class="setting-form">
         <el-row :gutter="20">
          <el-col :span="6" class="personalization__box">
            <el-form-item class="ui-form-item personalization__label" prop="theme">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Основной цвет приложения</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать основной цвет приложения" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-color-picker v-model="personalizationForm.theme"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="personalization__box">
            <el-form-item class="ui-form-item personalization__label" prop="theme">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Цвет шрифта в категориях</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать цвет шрифта в категориях" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-color-picker v-model="personalizationForm.theme_category"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="personalization__box">
            <el-form-item class="ui-form-item personalization__label" prop="foreground">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Цвет шрифта в цветных блоках</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать цвет шрифта в цветных блоках" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-color-picker v-model="personalizationForm.foreground"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
          <el-form-item>
            <button @click.prevent="submitForm('personalizationForm')" data-text="Обновить" class="button button__primary button__medium">Обновить</button>
          </el-form-item>
        </el-row>
       </el-form>
    </div>
  </div>
</template>

<script>
import button from '@/components/atoms/button'
import icon from '@/components/atoms/icon'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    'v-button': button,
    'v-icon': icon,
  },

  data: () => ({
		personalizationForm: {
      theme: '',
      foreground: '',
      theme_category: ''
    },
    rulePersonalizationForm: {
      theme: [{ required: true, message: 'Пожалуйста выберите цвет приложения', trigger: 'blur' }],
      theme_category: [{ required: true, message: 'Пожалуйста выберите цвет категорий', trigger: 'blur' }],
      foreground: [{ required: true, message: 'Пожалуйста выберите цвет шрифта в цветных блоках', trigger: 'blur' }],
    },
    accountData: [
      { label: 'Изменить название', placeholder: '', status: 'none', value: null, type: 'text', edited: false },
      { label: 'Изменить текст приветствия', placeholder: 'Мы рады Вас видеть ❤', status: 'none', value: null, type: 'text', edited: false },
      { label: 'Изменить номер телефона', placeholder: '', status: 'none', value: null, type: 'text', edited: false },
      { label: 'Изменить код для входа в аккаунт', placeholder: '1111', status: 'none', value: null, type: 'number', edited: false },
    ],
    inputValue: null,
    changedAccountData: [],
    mask: '+7 (###) ###-##-##',
    maskCode: '####',
    sendCode: true,
    placeholder: '+7 (999) 999-99-99',
    ruleForm: {
      phone: [{
          required: true,
          message: 'Пожалуйста введите номер телефона',
          trigger: 'blur'
        },
        {
          min: 18,
          max: 18,
          message: 'Пожалуйста введите телефон полностью',
          trigger: 'blur'
        }
      ]
    }
  }),

  created() {
    this.$axios.$get('/region').then(response => {
      this.placeholder = response.placeholder
      this.mask = response.mask
      this.ruleForm = response.rules
      this.personalizationForm.theme = `#${this.$auth.user.settings.theme}`;
      this.personalizationForm.foreground = `#${this.$auth.user.settings.foreground}`;
      this.personalizationForm.theme_category = `#${this.$auth.user.settings.theme_category}`;

      this.getUserData()
      this.refreshUser()
      this.getUserContacts()
    })
  },

  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    })
  },

  watch: {
    accountData: {
      handler() {
        this.accountData.map((col, index) => {
          for(const data of this.changedAccountData) {
            if (col.label === data.label) {
              this.accountData[index].edited = !(col.value === data.value)
            }
          }
        } )
      }, deep: true
    }
  },

  methods: {
    ...mapActions({
      changePersonalization: 'setting/changePersonalization',
      refreshUser: 'user/refreshUser',
      getUserData: 'user/getUserData'
    }),

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
        let newColor = {
          foreground: this.personalizationForm.foreground.slice(1),
          theme: this.personalizationForm.theme.slice(1),
          theme_category: this.personalizationForm.theme_category.slice(1)
        }
        this.changePersonalization(newColor).then(response => {
					if (response === 404 ){
						this.$notify.error({ title: 'Ошибка', message: 'Ошибка, повторите попытку позже', customClass: 'el-notification-error', duration: 1000  })
					} else {
						this.$notify.success({ title: 'Успешно', message: 'Данные обновлены!', customClass: 'el-notification-success' })
            this.refreshUser();
					}
				})
      } else {
        return false;
      }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    async getUserContacts() {
      this.accountData[0].value = this.getUser.username
      this.accountData[1].value = this.getUser.settings.news_title
      this.changedData()
    },

    changedData() {
      this.accountData.map((col) => {
        this.changedAccountData.push({
          value: col.value, label: col.label
        })
      })
    },

    async updateUserValue(index) {
      switch (this.accountData[index].label) {
        case "Изменить код для входа в аккаунт":
          this.inputValue = this.accountData[index].value
          await this.$axios.$put('https://rest.yelm.io/api/user-code', {
            custom_code: this.inputValue
          }).then(() => {
            this.changedAccountData[index].value = this.accountData[index].value
            this.accountData[index].edited = false
            this.$notify.success({title: 'Успешно', message: 'Поле обновлено', customClass: 'el-notification-success'})
            this.refreshUser();
          }).catch((e) => {
            this.$notify.error({title: 'Ошибка', message: e, customClass: 'el-notification-error'})
          })
          break
        case "Изменить текст приветствия":
          this.inputValue = this.accountData[index].value
          await this.$axios.$post('https://rest.yelm.io/api/news-setting', {
            news_title: this.inputValue
          }).then(() => {
            this.changedAccountData[index].value = this.accountData[index].value
            this.accountData[index].edited = false
            this.$notify.success({title: 'Успешно', message: 'Поле обновлено', customClass: 'el-notification-success'})
            this.refreshUser();
          }).catch((e) => {
            this.$notify.error({title: 'Ошибка', message: e, customClass: 'el-notification-error'})
          })
          break
        default:
          if (this.accountData[index].label === 'Изменить номер телефона') {
            this.inputValue = this.accountData[index].value.replace(/\D/g, '')
          } else {
            this.inputValue = this.accountData[index].value
          }
          await this.$axios.$put('/contact', {
            name: this.accountData[index].label,
            text: this.inputValue
          }).then(() => {
            this.changedAccountData[index].value = this.accountData[index].value
            this.accountData[index].edited = false
            this.$notify.success({title: 'Успешно', message: 'Поле обновлено', customClass: 'el-notification-success'})
            this.refreshUser();
          }).catch((e) => {
            this.$notify.error({title: 'Ошибка', message: e, customClass: 'el-notification-error'})
          })
          break
      }
    },
  }
}
</script>
