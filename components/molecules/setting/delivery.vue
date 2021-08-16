<template>
  <div class="grid__container">
    <div class="grid__body-header">
      <div class="grid__body-header-left">
        <h2 class="h1">Доставка</h2>
      </div>
    </div>
    <div class="grid__body-wrapper">
      <el-form ref="deliveryForm" :model="deliveryForm" :rules="ruleDeliveryForm" label-position="top" class="setting-form">
        <el-row :gutter="40">
          <el-col :xs="24" :sm="26" :md="28" :lg="29" :xl="31">
            <el-form-item class="ui-form-item" prop="min_order_price">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Минимальная цена заказа</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете указать/изменить минимальную цену на заказ" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="deliveryForm.min_order_price" placeholder="Введите минимальную цену заказа" min="0" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="26" :md="28" :lg="29" :xl="31">
            <el-form-item class="ui-form-item" prop="min_delivery_price">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Минимальная цена доставки</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете указать/изменить минимальную цену на доставку" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="deliveryForm.min_delivery_price" placeholder="Введите минимальную цену доставки" min="0" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="end">
          <el-form-item>
            <button @click.prevent="submitForm('deliveryForm')" data-text="Обновить" class="button button__primary button__medium">Обновить</button>
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
		deliveryForm: {
      min_order_price: null,
      min_delivery_price: null,
    },
    ruleDeliveryForm: {
      min_order_price: [
        { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Пожалуйста введите минимальную цену заказа'))
            } else if (value < 0) {
              callback(new Error('Значение не может быть меньше 0'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }
      ],
      min_delivery_price: [
        { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Пожалуйста введите минимальную цену доставки'))
            } else if (value < 0) {
              callback(new Error('Значение не может быть меньше 0'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }
      ]
    }
  }),
	created() {
    this.deliveryForm.min_order_price = this.$auth.user.settings.min_order_price;
    this.deliveryForm.min_delivery_price = this.$auth.user.settings.min_delivery_price;
  },
  methods: {
    ...mapActions({
      changeDelivery: 'setting/changeDelivery',
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
        this.changeDelivery(this.deliveryForm).then(response => {
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