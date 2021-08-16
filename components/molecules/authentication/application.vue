<template>
  <div class="login__form-container">
    <button @click.prevent="setSelectedWindow('Phone')" class="login__form-container__back">
      <svg class="svg-sprite svg-sprite_demo">
        <use xlink:href="#icon-arrow"></use>
      </svg>
    </button>
    <el-form :model="form" :rules="ruleForm" ref="form" class="login__form">
      <h1 class="h1">Регистрация</h1>
      <el-form-item label="Введите название приложения" prop="application">
        <el-input class="login__form-input" v-model="form.application" placeholder="Название приложения"></el-input>
      </el-form-item>
      <button @click.prevent="handlerClick('form')" data-text="Продолжить" class="button button__primary button__medium">Продолжить</button>
      <!-- <button @click.prevent="handlerDemo" class="login__form-demo">Демонстрационная версия
        <svg class="svg-sprite svg-sprite_demo">
          <use xlink:href="#icon-demo"></use>
        </svg>
      </button> -->
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    form: {
      application: null
    },
    ruleForm: { 
      application: [
        { required: true, message: 'Пожалуйста введите название приложения', trigger: 'blur' },
      ]
    },
  }),
  computed: {
    ...mapGetters({
      phone: 'authentication/getPhone',
      region_code: 'authentication/getRegionCode'
    })
  },
  methods: {
    ...mapMutations({
      setSelectedWindow: 'authentication/setSelectedWindow'
    }),
    handlerClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$axios.$post('/signup', { phone: this.phone, region_code: this.region_code, username: this.form.application }).then(() => {
            this.$auth.loginWith('local', {
              data: {
                email: this.phone
              }
            }).then(() => {
              this.$router.push({ name: 'index' })
            })
          }).catch((e) => {
            if (e.response.status === 422) this.$notify.error({ title: 'Ошибка', message: 'Аккаунт уже создан', customClass: 'el-notification-error', duration: 1000  })
          })
        } else {
          this.$notify.error({ title: 'Ошибка', message: 'Введите название приложения', customClass: 'el-notification-error', duration: 1000  })
        }
      });
    }
  }
}
</script>
