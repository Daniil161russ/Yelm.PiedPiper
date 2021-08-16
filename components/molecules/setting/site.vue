<template>
	<div class="grid__container">
		<div class="grid__body-header">
      <div class="grid__body-header-left">
        <h2 class="h1">Персонализация сайта</h2>
      </div>
    </div>
		<div class="grid__body-wrapper">
			<el-form ref="siteForm" :model="siteForm" :rules="ruleSiteForm" label-position="top" class="setting-form site">
				<el-row :gutter="20">
					<el-col :xs="4" :sm="6" :md="8" :lg="12" :xl="12">
						<el-form-item class="ui-form-item" prop="title">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Заголовок</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать заголовок для вашего динамического сайта" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="siteForm.title" placeholder="Введите заголовок для сайта" :disabled='siteForm.active ? false : true' />
            </el-form-item>
					</el-col>
					<el-col :xs="4" :sm="6" :md="8" :lg="12" :xl="12">
            <el-form-item class="ui-form-item" prop="subtitle">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Подзаголовок</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать подзаголовок для вашего динамического сайта" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="siteForm.subtitle" placeholder="Введите подзаголовок для сайта"  :disabled='siteForm.active ? false : true'/>
            </el-form-item>
          </el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="4" :sm="6" :md="12" :lg="12" :xl="12">
						<el-form-item class="ui-form-item" prop="subdomen">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Домен</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать домен для вашего динамического сайта" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
							<el-input placeholder="Введите домен для сайта" v-model="siteForm.subdomen" class="site__input" :disabled='siteForm.active ? false : true'>
								<template slot="append">.yelm.io</template>
							</el-input>
            </el-form-item>
					</el-col>
					<el-col :xs="4" :sm="6" :md="12" :lg="12" :xl="12">
						<el-form-item class="ui-form-item" prop="active">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Выключить/Включить</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете включить или выключить ваш динамический сайт" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
							<v-switch v-model="siteForm.active"  class="site__switch" />
            </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :xs="4" :sm="6" :md="12" :lg="12" :xl="12">
						<el-form-item class="ui-form-item" prop="image">
              <template slot="label">
                <div class="setting-form__form-label">
                  <span>Фоновое изображение</span>
                  <el-tooltip class="item" effect="dark" content="Здесь Вы можете настроить фоновое изображение для главной страницы сайта" placement="top">
                    <svg class="svg-sprite">
                      <use xlink:href="#icon-question-mark"></use>
                    </svg>
                  </el-tooltip>
                </div>
              </template>
							<v-img-loader name="filepond" v-model="siteForm.image" v-if="siteForm.image == null" files="1" v-show="siteForm.active"/>
              <span v-show="!siteForm.active" class="site__off-text">Включите сайт, если хотите отредактировать поля</span>
                <v-img v-show="siteForm.active" v-if="siteForm.image != null" :link="siteForm.image" :width="160" :height="160" :radius="10" :style="{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', border: '1px solid #e0e0e0' }">
                  <v-button slot="overlay" circle="" icon="" plain="" color="warning" @click="siteForm.image = null" native="button">
                    <v-icon slot="icon" name="Edit" color="warning" fill="" />
                  </v-button>
                </v-img>
            </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-form-item v-show="siteForm.active"> 
            <button @click.prevent="submitForm('siteForm')" data-text="Обновить" class="button button__primary button__medium">Обновить</button>
          </el-form-item>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Switch from "@/components/atoms/Switch";
import imgLoader from "@/components/imgLoader"
import Image from "@/components/atoms/Image";
import Button from '@/components/atoms/button'
import Icon from '@/components/atoms/icon'

export default {
	components: {
    'v-switch': Switch,
		'v-img-loader': imgLoader,
    'v-img': Image,
		'v-button': Button,
    'v-icon': Icon,
  },
	data: () => ({
		siteForm:{
			title: null,
			subtitle: null,
			subdomen: null,
			active: false,
			image: null,
		},
		ruleSiteForm:{
			title: [{ required: true, message: 'Пожалуйста введите заголовок для сайта', trigger: 'blur' }],
			subtitle: [{ required: true, message: 'Пожалуйста введите подзаголовок для сайта', trigger: 'blur' }],
			subdomen: [{ required: true, message: 'Пожалуйста введите поддомен для сайта', trigger: 'blur' }],
			image: [{ required: true, message: 'Заполните поле "Фоновое изображение" ', trigger: 'blur' }],
		}
	}),
	created() {
    this.siteForm.title = this.$auth.user.settings.site.title;
    this.siteForm.subtitle = this.$auth.user.settings.site.subtitle;
		this.siteForm.subdomen = this.$auth.user.settings.site.subdomen;
		this.siteForm.active = this.$auth.user.settings.site.active;
		this.siteForm.image = this.$auth.user.settings.site.image;
  },
	methods: {
		 ...mapActions({
      changeSite: 'setting/changeSite',
    }),
		submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
        this.changeSite(this.siteForm).then(response => {
					if (response === 404 ){
						this.$notify.error({ title: 'Ошибка', message: 'Ошибка, повторите попытку позже', customClass: 'el-notification-error', duration: 1000  })
					} if (response === 403){
            this.$notify.error({ title: 'Ошибка', message: 'Ошибка, такой поддомен уже существует', customClass: 'el-notification-error', duration: 1000  })
          } else {
						this.$notify.success({ title: 'Успешно', message: 'Данные обновлены!', customClass: 'el-notification-success' })
					}
				})
      } else {
        return false;
      }
      });
    },
	}
}
</script>