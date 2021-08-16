<template>
  <div>
    <el-dialog  :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="showBalanceModal" custom-class="balance" :append-to-body="true">
      <template slot="title">
        <div class="text text__extra-large text__dark text__medium el-dialog__header-title">Пополнение баланса</div>
        <v-button plain="" circle="" native="button" color="primary" icon="" @click="$emit('hide')" class="el-dialog__header-close">
          <v-icon name="Close" slot="icon" fill="" color="primary" />
        </v-button>
      </template>
      <el-form label-position="top" class="form" :rules="balanceRules" :model="BalanceForm" ref="BalanceForm">
        <el-form-item label="Email" class="form-item" prop="email">
          <el-input kind="normal" resize="none" v-model="BalanceForm.email" placeholder="Введите email" type="text" auto-complete="on"/>
        </el-form-item>
        <el-form-item label="Сумма пополнения" class="form-item" prop="amount">
          <el-input kind="normal" resize="none" v-model.number="BalanceForm.amount" placeholder="Введите сумму" auto-complete="on" type="number" min="0"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <v-button round="" color="gradient-BlueToPurpleToRed" @click="submitAddBalance">
          Продолжить
       </v-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import button from '~/components/atoms/button'
import icon from '~/components/atoms/icon'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Balance',
  components: {
    'v-button': button,
    'v-icon': icon,
  },

  data: () => ({
    BalanceForm: {
      email: '',
      amount: '',
    },
    showBalanceModal: true,
  }),

  created() {
    this.balanceRules = {
      email: [
        { validator: (rule, value, callback) => {
            if(value === '') {
              callback(new Error('Введите Email'))
            } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) === false) {
              callback(new Error('Введите валидный Email' ))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }
      ],
      amount: [
        { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Введите сумму пополнения'))
            } else if (value < 500) {
              callback(new Error('Минимальная сумма пополнения 500 ₽'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      userData: 'user/getUser'
    }),
  },

  methods: {
    ...mapActions({
      getUserData: 'user/getUserData',
      refreshUserData: 'user/refreshUser',
    }),

    submitAddBalance() {
      this.$refs.BalanceForm.validate((valid) => {
       if(valid) {
         this.pay()
       } else this.$notify.error({ title: 'Ошибка', message: 'Заполните поля формы', customClass: 'el-notification-error' })
      })
    },

   pay() {
    let widget = new cp.CloudPayments();
     widget.pay('charge',
      { //options
        publicId: this.userData.settings.public_id, // "pk_f02f8f268aee2b0cbb4d961457a46 - тестовый"
        description: 'Пополнение баланса на '+this.BalanceForm.amount+' рублей', //назначение
        amount: this.BalanceForm.amount, //сумма
        currency: 'RUB', //валюта
        accountId: this.userData.id, //идентификатор плательщика (необязательно)
        skin: "mini", //дизайн виджета (необязательно)
        data: {
          amount: this.BalanceForm.amount,
          user_id: this.userData.id,
          platform: this.$auth.user.platform,
          type: 'payment',
        }
      },
      () => { // success
        this.refreshUserData()
        this.getUserData()
        this.showBalanceModal = false
      },
        (reason, options) => { // fail
        console.log(reason, '- причина', options, '- опции')
      })
    },
  },
}
</script>
