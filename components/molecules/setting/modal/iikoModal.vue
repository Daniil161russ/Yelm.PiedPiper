<template>
	<el-dialog  :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="showModal" :append-to-body="true" custom-class="Items__AddCategory-Dialog" :show-close="false" >
		<template slot="title">
			<div class="text text__extra-large text__dark text__medium el-dialog__header-title">Интеграция iiko</div>
			<v-button  v-if="!successStep" plain="" circle="" native="button" color="primary" icon=""  @click="hide" class="el-dialog__header-close">
				<v-icon name="Close" slot="icon" fill="" color="primary" />
			</v-button>
		</template>
		<div class="integration__form">
				<div v-if="!firstStep" class="first-step">
					<el-form label-position="top" class="form" :rules="settingRules" :model="settingForm" ref="settingForm" hide-required-asterisk>
						<el-form-item label="Логин" class="ui-form-item" prop="login">
							<el-input v-model="settingForm.login" placeholder="Введите логин" type="text"/>
						</el-form-item>
						<el-form-item label="Пароль" class="ui-form-item" prop="password">
							<el-input v-model="settingForm.password" placeholder="Введите пароль" type="password"/>
						</el-form-item>
						<button @click.prevent="submitSettingForm('settingForm')" data-text="Продолжить" class="button button__primary button__medium">
							Продолжить
						</button>
					</el-form>
				</div>
				<div v-if="secondStep" class="second-step">
					<el-form label-position="top" class="form" :rules="organizationRules" :model="organizationForm" ref="organizationForm" hide-required-asterisk>
						<el-form-item label="Организация" class="ui-form-item" prop="organization">
							<el-select v-model="organizationForm.organization" class="ui-select" popper-class="ui-select-dropdown">
								<el-option v-for="item in organizations" :label="item.name" :value="item.organization_id" :key="item.organization_id"/>
							</el-select>
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
      login: '',
      password: '',
    },
		organizations: null,
		organizationForm: { organization: null },
    settingRules: {
      login: [{ required: true, message: 'Пожалуйста введите логин', trigger: 'blur' }],
      password: [{ required: true, message: 'Пожалуйста введите пароль', trigger: 'blur' }],
    },
		organizationRules: {
			organization: [{ required: true, message: 'Пожалуйста выберите организация', trigger: 'blur' }],
		}
	}),
	components: {
		'v-button': Button,
    'v-icon': icon
	},
	methods: {
		...mapActions({
      integrationСonnection: 'setting/integrationСonnection',
			sendOrgamization: 'setting/sendOrgamization',
    }),
		hide(){
			this.$emit('hide')
		},
		submitSettingForm(formName){
			this.$refs[formName].validate((valid) => {
      if (valid) {
				this.integrationСonnection(this.settingForm).then(response => {
					if (response === 404 ){
						this.$notify.error({ title: 'Ошибка', message: 'Неверный логин или пароль!', customClass: 'el-notification-error', duration: 1000  })
					} else {
						this.firstStep = !this.firstStep;
    				this.secondStep = !this.secondStep;
						this.organizations = response;
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
				this.sendOrgamization(this.organizationForm.organization).then(response => {
					this.secondStep = !this.secondStep;
					this.successStep = !this.successStep;
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
