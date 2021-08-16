<template>
  <div class="grid__container">
    <div class="grid__body-header">
      <div class="grid__body-header-left">
        <h2 class="h1">Оплата</h2>
      </div>
    </div>
    <div class="grid__body-wrapper">
      <el-form ref="paymentForm" :model="paymentForm" :rules="rulePaymentForm" label-position="top" class="setting-form">
        <el-row :gutter="20">
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item class="ui-form-item" prop="organization">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Организация</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать организацию" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-select v-model="paymentForm.organization" class="ui-select" popper-class="ui-select-dropdown">
                <el-option label="ИП" value="ИП" />
                <el-option label="ООО" value="ООО" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item class="ui-form-item" prop="inn">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>ИНН</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать ИНН" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="paymentForm.inn" placeholder="Введите ИНН" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item label="КПП" class="ui-form-item" prop="kpp">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>КПП</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать КПП" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="paymentForm.kpp" placeholder="Введите КПП" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item class="ui-form-item" prop="okved">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>ОКВЭД</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать ОКВЭД" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template> 
              <el-input v-model="paymentForm.okved" placeholder="Введите ОКВЭД" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item class="ui-form-item" prop="ogrn">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>ОГРН</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать ОГРН" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="paymentForm.ogrn" placeholder="Введите ОГРН" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item class="ui-form-item" prop="name_of_company">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Полное наименование организации</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать полное наименование организации" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="paymentForm.name_of_company" placeholder="Введите полное наименование организации" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item class="ui-form-item" prop="abbreviated_of_company">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Сокращённое наименование организации</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать сокращённое наименование организации" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="paymentForm.abbreviated_of_company" placeholder="Введите cокращённое наименование организации" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item class="ui-form-item" prop="registration_authority">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Орган государственной регистрации</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать орган государственной регистрации" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="paymentForm.registration_authority" placeholder="Введите орган государственной регистрации" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item label="Дата регистрации" class="ui-form-item" prop="registration_date">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Дата регистрации</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать дату регистрации" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-date-picker v-model="paymentForm.registration_date" type="date" placeholder="Выберите дату">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item class="ui-form-item" prop="authorized_capital">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Сумма уставного капитала</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать сумму уставного капитала" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="paymentForm.authorized_capital" placeholder="Введите сумму уставного капитала" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item class="ui-form-item" prop="organization_phone">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Телефон организации</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать телефон организации" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="paymentForm.organization_phone" placeholder="Введите телефон организации" type="number" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item class="ui-form-item" prop="email">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>E-mail адрес</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать E-mail адрес" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="paymentForm.email" placeholder="Введите e-mail адрес" type="email"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-form-item>
            <button @click.prevent="submitForm('paymentForm')" data-text="Обновить" class="button button__primary button__medium">Обновить</button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
		paymentForm: {
      organization: null,
      inn: null,
      kpp: null,
      okved: null,
      ogrn: null,
      name_of_company: null,
      abbreviated_of_company: null,
      registration_authority: null,
      registration_date: null,
      authorized_capital: null,
      organization_phone: null,
      email: null
    },
    rulePaymentForm: {
      organization: [{ required: true, message: 'Пожалуйста выберите организация', trigger: 'blur' }],
      inn: [{ required: true, message: 'Пожалуйста введите ИНН', trigger: 'blur' }],
      kpp: [{ required: true, message: 'Пожалуйста введите КПП', trigger: 'blur' }],
      okved: [{ required: true, message: 'Пожалуйста введите ОКВЭД', trigger: 'blur' }],
      ogrn: [{ required: true, message: 'Пожалуйста введите ОГРН', trigger: 'blur' }],
      name_of_company: [{ required: true, message: 'Пожалуйста введите полное наименование организации ', trigger: 'blur' }],
      abbreviated_of_company: [{ required: true, message: 'Пожалуйста введите сокращённое наименование организации', trigger:'blur' }],
      registration_authority: [{ required: true, message: 'Пожалуйста введите орган государственной регистрации', trigger:'blur' }],
      registration_date: [{ required: true, message: 'Пожалуйста выберите дату регистрации', trigger: 'blur' }],
      authorized_capital: [{ required: true, message: 'Пожалуйста введите сумму уставного капитала', trigger: 'blur' }],
      organization_phone: [{ required: true, message: 'Пожалуйста введите телефон организации ', trigger: 'blur' }],
      email: [{ required: true, message: 'Пожалуйста введите e-mail адрес', trigger: 'blur' }],
    }
	}),
  created() {
    if ( this.payment_data !== null) {
      this.paymentForm.organization = this.$auth.user.settings.payment_data.organization
      this.paymentForm.inn = this.$auth.user.settings.payment_data.inn
      this.paymentForm.kpp = this.$auth.user.settings.payment_data.kpp
      this.paymentForm.okved = this.$auth.user.settings.payment_data.okved
      this.paymentForm.ogrn = this.$auth.user.settings.payment_data.ogrn
      this.paymentForm.name_of_company = this.$auth.user.settings.payment_data.name_of_company
      this.paymentForm.abbreviated_of_company = this.$auth.user.settings.payment_data.abbreviated_of_company
      this.paymentForm.registration_authority = this.$auth.user.settings.payment_data.registration_authority
      this.paymentForm.registration_date = this.$auth.user.settings.payment_data.registration_date
      this.paymentForm.authorized_capital = this.$auth.user.settings.payment_data.authorized_capital
      this.paymentForm.organization_phone = this.$auth.user.settings.payment_data.organization_phone
      this.paymentForm.email = this.$auth.user.settings.payment_data.email
    }
  },
  methods: {
    ...mapActions({
      changePayment: 'setting/changePayment',
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
        this.changePayment(this.paymentForm).then(response => {
					if (response === 404 ){
						this.$notify.error({ title: 'Ошибка', message: 'Неверно введены данные!', customClass: 'el-notification-error', duration: 1000  })
					} else {
						this.$notify.success({ title: 'Успешно', message: 'Данные обновлены!', customClass: 'el-notification-success' })
					}
				})
      } else {
        console.log('error submit!!');
        return false;
      }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>