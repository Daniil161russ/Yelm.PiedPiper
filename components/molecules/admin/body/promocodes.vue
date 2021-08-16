<template>
	<div class="grid__container">
    <div class="grid__body-header">
      <div class="grid__body-header-left">
        <h2 class="h1">Промокоды</h2>
      </div>
    </div>
		 <div class="grid__body-wrapper promocodes">
			 <el-form ref="promoForm" :model="promoForm" :rules="rulePromoForm" label-position="top" class="admin-form">
				 <el-row :gutter="20">
          <el-col :xs="4" :sm="6" :md="8" :lg="12" :xl="12">
            <el-form-item class="ui-form-item" prop="name">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Название</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать название промокода" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="promoForm.name" placeholder="Введите название промокода" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="12" :xl="12">
            <el-form-item class="ui-form-item" prop="amount">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Сумма</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать сумму скидки для промокода" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="promoForm.amount" placeholder="Введите сумму промокода" min="0" type="number"/>
            </el-form-item>
          </el-col>
        </el-row>
				<el-row :gutter="20">
					<el-col :xs="4" :sm="6" :md="8" :lg="12" :xl="12">
            <el-form-item class="ui-form-item" prop="end_time">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Время окончания промокода</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать дату и время окончания промокода" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-date-picker v-model="promoForm.end_time" type="datetime" placeholder="Выберите дату и время">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="12" :xl="12">
            <el-form-item class="ui-form-item" prop="administrator">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Имя администратора</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать имя администратора" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="promoForm.administrator" placeholder="Введите имя администратора" />
            </el-form-item>
          </el-col>
        </el-row>
				<el-row type="flex" class="row-bg" justify="start">
          <el-form-item>
            <button @click.prevent="submitForm('promoForm')" data-text="Создать" class="button button__primary button__medium">Создать</button>
          </el-form-item>
        </el-row>
			 </el-form>
			<el-table :data="promocodes" class="promocodes__table" style="width: 100%; margin-left: 12px;">
				<el-table-column
					prop="name"
					label="Название промокода">
				</el-table-column>
				<el-table-column
					prop="amount"
					label="Сумма промокода">
				</el-table-column>
				<el-table-column
					prop="end_time"
					label="Время окончания">
				</el-table-column>
				<el-table-column
					prop="administrator"
					label="Имя администратора">
				</el-table-column>
				<el-table-column
					label="Операции">
					<template slot-scope="scope">
						<el-button
							size="mini"
							type="danger"
							@click="deletePromo( scope.row.id )">Удалить</el-button>
					</template>
				</el-table-column>
			</el-table>
		 </div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	data: () => ({
		promoForm:{
			name: null,
			amount: null,
			end_time: null,
			administrator: null
		},
		rulePromoForm:{
			name: [{ required: true, message: 'Пожалуйста введите название промокода', trigger: 'blur' }],
			amount: [
				{ validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Пожалуйста введите сумму промокода'))
            } else if (value < 0) {
              callback(new Error('Значение не может быть меньше 0'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }
			],
			end_time: [{ required: true, message: 'Пожалуйста выберите дату и время окончания промокода', trigger: 'blur' }],
			administrator: [{ required: true, message: 'Пожалуйста введите имя администратора', trigger: 'blur' }],
		}
	}),
	created() {
    this.getPromocodes()
  },
	computed: {
    ...mapGetters({
      promocodes: 'admin/getPromocodes',
    })
  },
	methods: {
		...mapActions({
      getPromocodes: 'admin/getPromocodes',
			addPromocod: 'admin/addPromocod',
			deletePromo: 'admin/deletePromo'
    }),
		submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
				this.addPromocod(this.promoForm).then(response => {
					if (response === 404 ){
						this.$notify.error({ title: 'Ошибка', message: 'Неверно введены данные!', customClass: 'el-notification-error', duration: 1000  })
					} else {
						this.$notify.success({ title: 'Успешно', message: 'Промокод добавлен!', customClass: 'el-notification-success' })
						this.getPromocodes()
					}
				})
        console.log('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
		// deletePromo(index, row) {
    //   console.log(index, row);
    // }
	}
}
</script>