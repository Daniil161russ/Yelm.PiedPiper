<template>
  <div class="login__form-container">
    <button @click.prevent="setSelectedWindow('Phone')" class="login__form-container__back">
      <svg class="svg-sprite svg-sprite_demo">
        <use xlink:href="#icon-arrow"></use>
      </svg>
    </button>
    <el-form :model="form" :rules="ruleForm" ref="form" class="login__form">
      <h1 class="h1">{{ (authWindow === 'login') ? 'Авторизация' : 'Регистрация' }}</h1>
      <el-form-item label="Введите код подтверждения" prop="code">
        <template slot="label">
          <span>Код подтверждения</span>
          <span v-if="timer > 0">Отправить код ещё раз через <b>{{ timer }}</b> сек</span>
          <button class="login__form-code" v-if="timer === 0" @click.prevent="restartTimer">Отправить код ещё раз</button>
        </template>
        <el-input class="login__form-input" v-model="form.code" placeholder="0000" v-mask="'####'"></el-input>
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { sha256 } from 'crypto-hash';

export default {
  data: () => ({
    form: {
      code: null
    },
    ruleForm: { 
      code: [{ required: true, message: 'Пожалуйста введите код подтверждения', trigger: 'blur' }]
    },
    timer: 99,
    statusTimer: null
  }),
  created() {
    this.startTimer()
  },
  computed: {
    ...mapGetters({
      code: 'authentication/getHashCode',
      phone: 'authentication/getPhone',
      authWindow: 'authentication/getAuthWindow'
    })
  },
  methods: {
    ...mapActions({
      getCode: 'authentication/getCode',
    }),
    ...mapMutations({
      setSelectedWindow: 'authentication/setSelectedWindow'
    }),
    handlerClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (await sha256(this.form.code) === this.code) {
            if (this.authWindow === 'login') {
              this.$auth.loginWith('local', {
                data: {
                  email: this.phone
                }
              }).then(() => {
                this.$router.push({ name: 'index' })
              }).catch((e) => {
                if (e.response.status === 404) this.$router.push({ path: '/register' })
              })
            } else {
              this.setSelectedWindow('Application')
            }
          }
        } else {
          this.$notify.error({ title: 'Ошибка', message: 'Введите код подтверждения', customClass: 'el-notification-error', duration: 1000  })
        }
      });
    },
    startTimer() {
      this.timer = 99;

      this.statusTimer = setInterval(() => {
        if (this.timer > 0) {
          this.timer--
        } else {
          clearInterval(this.statusTimer)
        }
      }, 1000)
    },
    restartTimer() {
      this.getCode()
      this.startTimer()
    }
  }
}
</script>