<template>
	<el-dialog  :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="showModal" :append-to-body="true" custom-class="Items__AddCategory-Dialog" :show-close="false" >
		<template slot="title">
			<div class="text text__extra-large text__dark text__medium el-dialog__header-title">Интеграция Yandex GO</div>
			<v-button  v-if="!successStep" plain="" circle="" native="button" color="primary" icon=""  @click="hide" class="el-dialog__header-close">
				<v-icon name="Close" slot="icon" fill="" color="primary" />
			</v-button>
		</template>
		<div class="integration__form">
				<div v-if="!firstStep" class="first-step">
					<el-form label-position="top" class="form" :rules="settingRules" :model="settingForm" ref="settingForm" hide-required-asterisk>
						<el-form-item label="API token" class="ui-form-item" prop="oauth_token">
							<el-input v-model="settingForm.oauth_token" placeholder="Введите API token" type="text"/>
						</el-form-item>
						<button @click.prevent="submitSettingForm('settingForm')" data-text="Продолжить" class="button button__primary button__medium">
							Продолжить
						</button>
					</el-form>
				</div>
				<div v-if="secondStep" class="second-step yandexGo">
					<el-form label-position="top" class="form" :rules="organizationRules" :model="organizationForm" ref="organizationForm" hide-required-asterisk>
						<el-form-item label="Имя владельца" class="ui-form-item" prop="name">
							<el-input v-model="organizationForm.name" placeholder="Введите имя владельца" type="text"/>
						</el-form-item>
						<el-form-item label="Электронная почта" class="ui-form-item" prop="email">
							<el-input v-model="organizationForm.email" placeholder="Введите электронную почту" type="email"/>
						</el-form-item>
						<el-form-item label="Телефон для экстренной связи" class="ui-form-item" prop="phone" v-mask="mask">
							<el-input v-model="organizationForm.phone" placeholder="Введите телефон" type="text"/>
						</el-form-item>
						<div class="yandexGo__wdl">
							<el-form-item label="Ширина коробки/пакета в м." class="ui-form-item" prop="width">
								<el-input-number v-model="organizationForm.width" :precision="2" :step="0.1" :min="0.01" :max="0.50"></el-input-number>
							</el-form-item>
							<el-form-item label="Высота коробки/пакета в м." class="ui-form-item" prop="height">
								<el-input-number v-model="organizationForm.height" :precision="2" :step="0.1" :min="0.01" :max="1.00"></el-input-number>
							</el-form-item>
							<el-form-item label="Длина коробки/пакета в м." class="ui-form-item" prop="length">
								<el-input-number v-model="organizationForm.length" :precision="2" :step="0.1" :min="0.01" :max="0.60"></el-input-number>
							</el-form-item>
						</div>
						<el-form-item label="Комментарий" class="ui-form-item" prop="comment">
							<el-input v-model="organizationForm.comment" placeholder="Введите комментарий" type="text"/>
						</el-form-item>
						<div class="dialog-footer setting-modal-footer">
							<v-button plain="" circle="" native="button" color="primary" icon="" @click="backStep" class="el-dialog__header-close">
								<v-icon name="ArrowLeft" slot="icon" fill="" color="primary" />
							</v-button>
							<button @click.prevent="submitOrgForm('organizationForm')" data-text="Интегрировать" class="button button__primary button__medium">
								Интегрировать
							</button>
						</div>
					</el-form>
				</div>
		</div>
		<div v-if="successStep" class="integration__form-success">
			<h2>Вы успешно подключили интеграцию 👍🏻</h2>
			<span>ваши товары будут перенесены</span>
		</div>
	</el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '@/components/atoms/button'
import icon from '@/components/atoms/icon'

export default {
	data: () => ({
		showModal: true,
		firstStep: false,
		secondStep: false,
		successStep: false,
		settingForm: {
      oauth_token: '',
    },
		settingRules: {
      oauth_token: [{ required: true, message: 'Пожалуйста введите API token', trigger: 'blur' }],
    },
		organizationForm: { 
			oauth_token: '',
			name: null,
			email: null,
			phone: null,
			height: null,
			width: null,
			length: null,
			comment: null
		},
		organizationRules: {
			name: [{ required: true, message: 'Пожалуйста введите имя владельца', trigger: 'blur' }],
			email: [
				{ required: true, message: 'Пожалуйста введите почту владельца', trigger: 'blur' },
				{ type: 'email', message: 'Пожалуйста введите корректную почту владельца', trigger: ['blur', 'change'] }
				],
			phone: [{ required: true, message: 'Пожалуйста введите телефон владельца', trigger: 'blur' }],
			height: [{ required: true, message: 'Пожалуйста введите высоту коробки/пакета', trigger: 'blur' }],
			width: [{ required: true, message: 'Пожалуйста введите ширену коробки/пакета', trigger: 'blur' }],
			length: [{ required: true, message: 'Пожалуйста введите длину коробки/пакета', trigger: 'blur' }],
			comment: [{ required: true, message: 'Пожалуйста введите комментарий', trigger: 'blur' }],
		},
		mask: '+7##########',
	}),
	components: {
		'v-button': Button,
    'v-icon': icon
	},
	methods: {
		...mapActions({
      сheckYandexIntegration: 'setting/сheckYandexIntegration',
			connectionYandexIntegration: 'setting/connectionYandexIntegration',
    }),
		hide(){
			this.$emit('hide')
		},
		submitSettingForm(formName){
			this.$refs[formName].validate((valid) => {
      if (valid) {
				this.сheckYandexIntegration(this.settingForm).then(response => {
					console.log(response);
					if (response === 401 ){
						this.$notify.error({ title: 'Ошибка', message: 'Неверный API токен!', customClass: 'el-notification-error', duration: 1000  })
					} else {
						this.organizationForm.oauth_token = this.settingForm.oauth_token
						this.firstStep = !this.firstStep;
						this.secondStep = !this.secondStep;
					}
				})
      } else {
        console.log('error submit!!');
        return false;
      }
      });
		},
		submitOrgForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {	
				this.connectionYandexIntegration(this.organizationForm).then(response => {
					this.secondStep = !this.secondStep;
					this.successStep = !this.successStep;
					console.log(this.organizationForm);
					setTimeout(this.hideModal, 1500);
				})	
      } else {
        return false;
      }
      });
    },
		hideModal(){
			this.showModal = false;
		},
		backStep(){
			this.firstStep = !this.firstStep;
    	this.secondStep = !this.secondStep;
		},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
	}
}
</script>