<template>
  <div class="login">
    <!-- Background -->
    <div class="login__element login__element-BackgroundCard" />
    <div class="login__element login__element-BackgroundEllipse2" /><div class="login__element login__element-BackgroundEllipse2Over" />
    <div class="login__element login__element-BackgroundEllipse1" /><div class="login__element login__element-BackgroundEllipse1Over" />
    <div class="login__element login__element-Wave1" /> <div class="login__element login__element-Wave2" />
    <div class="login__element login__element-Cloud1" /> <div class="login__element login__element-Cloud2" />
    <div class="login__element login__element-Cube" /> <div class="login__element login__element-PainBucket" /><div class="login__element login__element-Curves" />
    <!-- -->
    <div class="login__element login__element-CircleBackground1" /><div class="login__element login__element-CircleBackground2" /><div class="login__element login__element-CircleBackground3" />
    <div class="login__element login__element-CircleBackground4" /><div class="login__element login__element-CircleBackground5" />
    <!-- -->
    <div class="login__element login__element-Glossy1" /><div class="login__element login__element-Glossy2" /><div class="login__element login__element-Glossy3" />
    <!-- -->
    <div class="login__content">
      <v-card class="login__card">
        <div class="password-code-container">
          <div class="password-code" v-if="!viewLoginFromPhone">
            <div class="password-code-point" v-for="number in 9" :key="number" @click="setPointCode(number)" :class="{'active': pointCode.indexOf(number) !== -1}">{{ number }}</div>
          </div>
          <el-input v-if="viewLoginFromPhone" class="login__input" v-model="phoneNumber" placeholder="Введите номер телефона без знаков (только цифры)" />
          <v-button @click="loginFromPhone" v-if="viewLoginFromPhone" round="" color="gradient-BlueToPurpleToRed" native="button" class="login__submit" :style="{ marginTop: '20px' }">
            Войти
          </v-button>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import Button from "@/components/atoms/button";
export default {
  name: "loginfromphone",
  layout: 'login',
  components: {
    'v-card': Card,
    'v-button': Button,
  },
  watch: {
    pointCodeString: {
      handler(code) {
        if (code === '1349') {
          this.viewLoginFromPhone = true
        }
      }, deep: true
    }
  },
  methods: {
    loginFromPhone () {
      if (!this.phoneNumber.length) {
        this.$notify.error({ title: 'Ошибка', message: 'Введите номер телефона' })
      } else {
        this.$auth.loginWith('local', {
          data: {
            email: this.phoneNumber,
            password: this.phoneNumber
          }
        }).then(() => {
          this.$router.push({ name: 'index' })
        }).catch((e) => {
          if(e.response.status === 404) {
            this.$notify.error({ title: 'Ошибка', message: 'Аккаунт не существует' })
          }
        })
      }
    },
    setPointCode (number) {
      if (this.pointCode.indexOf(number) === -1) {
        this.pointCode.push (number)
      } else {
        this.pointCode.splice(this.pointCode.findIndex((value) => (value === number)), 1)
      }
      this.pointCodeString = this.pointCode.join('')
    }
  },
  data: () => {
    return {
      pointCode: [],
      pointCodeString: '',
      phoneNumber: '',
      viewLoginFromPhone: false
    }
  }
}
</script>

<style scoped lang="scss">
.password-code {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 262px;
  max-width: 262px;
  min-width: 262px;
  margin-left: auto;
  margin-right: auto;
  &-point {
    cursor: pointer;
    flex-basis: 48px;
    height: 48px;
    border: 1px solid #828282;
    border-radius: 50%;
    transition: all 350ms;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 120%;
    color: #333333;
    &:not(:nth-child(3n)) {
      margin-right: 24px;
    }
    &:not(:nth-last-child(1)):not(:nth-last-child(2)):not(:nth-last-child(3)) {
      margin-bottom: 24px;
    }
    &.active {
      background-color: #0A84FF;
      border-color: #0A84FF;
      color: #ffffff;
    }
  }
  &-container {
    width: 100%;
  }
}
</style>
