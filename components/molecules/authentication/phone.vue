<template>
  <el-form :model="form" :rules="ruleForm" ref="form" class="login__form">
    <h1 class="h1">{{ (authWindow === 'login') ? 'Авторизация' : 'Регистрация' }}</h1>
    <el-form-item label="Введите номер телефона" prop="phone">
      <el-input class="login__form-input" v-model="form.phone" :placeholder="placeholder" v-mask="mask"></el-input>
    </el-form-item>
    <button @click.prevent="handlerClick('form')" data-text="Продолжить" class="button button__primary button__medium">Продолжить</button>
    <!-- <button @click.prevent="handlerDemo" class="login__form-demo">Демонстрационная версия
      <svg class="svg-sprite svg-sprite_demo">
        <use xlink:href="#icon-demo"></use>
      </svg>
    </button> -->
  </el-form>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data: () => ({
    form: {
      phone: null
    },
    mask: '+7 (###) ###-##-##',
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
      this.setRegionCode(response.region_code)
    })
  },
  computed: {
    ...mapGetters({
      authWindow: 'authentication/getAuthWindow'
    })
  },
  methods: {
    ...mapMutations({
      setHashCode: 'authentication/setHashCode',
      setPhone: 'authentication/setPhone',
      setSelectedWindow: 'authentication/setSelectedWindow',
      setRegionCode: 'authentication/setRegionCode'
    }),
    handlerClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$axios.$post('/code', { email: this.form.phone.replace(/\D/g, ''), type: (this.authWindow === 'login') ? 'login' : 'register' }).then(response => {
            if (this.authWindow === 'login') {
              if (response.auth) {
                this.setHashCode(response.hash)
                this.setPhone(this.form.phone.replace(/\D/g, ''))
                this.setSelectedWindow('Code')
              } else {
                this.$notify.error({ title: 'Ошибка', message: 'Аккаунт не найден', customClass: 'el-notification-error', duration: 1000  })
                this.$router.push({ path: '/register' })
              }
            } else {
              if (response.auth) {
                this.setHashCode(response.hash)
                this.setPhone(this.form.phone.replace(/\D/g, ''))
                this.setSelectedWindow('Code')
              } else {
                this.$notify.error({ title: 'Ошибка', message: 'Аккаунт уже существует', customClass: 'el-notification-error', duration: 1000  })
                this.$router.push({ path: '/login' })
              }
            }
          });
        } else {
          this.$notify.error({ title: 'Ошибка', message: 'Введите номер телефона', customClass: 'el-notification-error', duration: 1000  })
        }
      });
    },
    handlerDemo() {}
  }
}
</script>
