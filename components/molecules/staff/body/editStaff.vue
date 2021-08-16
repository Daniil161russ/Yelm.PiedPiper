<template>
  <div class="grid__container">
    <div class="grid__body-header">
      <div class="grid__body-header-left">
        <v-button @click="setSelectedWindow('MapStaff')" circle="" icon="" plain="" color="primary">
          <v-icon slot="icon" name="ArrowLeft" color="primary" fill="" />
        </v-button>
        <h2 class="h1">Редактирование сотрудника</h2>
      </div>
      <v-button round="" color="primary" plain="" native="button" @click="submitHandler('form')">Обновить</v-button>
    </div>
    <div class="grid__body-wrapper">
      <el-form :model="form" ref="form" :rules="ruleForm" label-position="top" class="logistics-form">
        <el-row :gutter="20">
          <el-col :md="6" :sm="24">
            <el-form-item prop="data.first_name" label="Имя" class="ui-form-item">
              <el-input v-model="form.data.first_name" placeholder="Введите имя" class="ui-input" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="data.last_name" label="Фамилия" class="ui-form-item">
              <el-input v-model="form.data.last_name" placeholder="Введите фамилия" class="ui-input" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="data.surname" label="Отчество" class="ui-form-item">
              <el-input v-model="form.data.surname" placeholder="Введите отчество" class="ui-input" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="login" label="Номер телефона" class="ui-form-item">
              <el-input v-model="form.login" placeholder="Введите номер телефона" class="ui-input" type="number" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="data.city" label="Город" class="ui-form-item">
              <el-input v-model="form.data.city" placeholder="Введите Город" class="ui-input" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="data.age" label="Возраст" class="ui-form-item">
              <el-input v-model="form.data.age" placeholder="Введите возраст" class="ui-input" type="number" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="data.birthday" label="Дата рождения" class="ui-form-item">
              <el-date-picker v-model="form.data.birthday" type="date" format="dd.MM.yyyy" value-format="yyyy-MM-dd" placeholder="XX.XX.XXXX" class="ui-date-picker" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="data.gender" label="Пол" class="ui-form-item">
              <el-select v-model="form.data.gender" class="ui-select" popper-class="ui-select-dropdown">
                <el-option label="Мужской" value="Мужской" />
                <el-option label="Женский" value="Женский" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="passport.series_passport" label="Серия паспорта" class="ui-form-item">
              <el-input v-model="form.passport.series_passport" placeholder="Введите серию паспорта" class="ui-input" type="number" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="passport.number_passport" label="Номер паспорта" class="ui-form-item">
              <el-input v-model="form.passport.number_passport" placeholder="Введите номер паспорта" class="ui-input" type="number" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="documents.inn" label="ИНН" class="ui-form-item">
              <el-input v-model="form.documents.inn" placeholder="Введите инн" class="ui-input" type="number" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="24">
            <el-form-item prop="documents.snils" label="СНИЛС" class="ui-form-item">
              <el-input v-model="form.documents.snils" placeholder="Введите снилс" class="ui-input" type="number" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item prop="data.photo" label="Фотография курьера" class="ui-form-item">
              <v-img-loader v-if="!form.data.photo.length" name="logistic_pond" v-model="form.data.photo" :files="1" :multiple="false" class="ui-img-loader" />
              <v-image v-if="form.data.photo.length" :link="form.data.photo" :width="290" :height="172" :radius="10" :style="{ backgroundSize: 'cover', backgroundPosition: '50%' }">
                <template slot="overlay">
                  <v-button color="primary" native="button" plain="" circle="" icon="" @click="form.data.photo = ''"><template slot="icon"><v-icon name="Edit" /></template></v-button>
                </template>
              </v-image>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item prop="passport.front_passport" label="(Паспорт) Главная страница" class="ui-form-item">
              <v-img-loader v-if="!form.passport.front_passport.length" name="logistic_pond_passport_0" v-model="form.passport.front_passport" :files="1" :multiple="false" class="ui-img-loader" />
              <v-image v-if="form.passport.front_passport.length" :link="form.passport.front_passport" :width="290" :height="172" :radius="10" :style="{ backgroundSize: 'cover', backgroundPosition: '50%' }">
                <template slot="overlay">
                  <v-button color="primary" native="button" plain="" circle="" icon="" @click="form.passport.photos_passport = ['', form.passport.registration_passport]"><template slot="icon"><v-icon name="Edit" /></template></v-button>
                </template>
              </v-image>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item prop="passport.registration_passport" label="(Паспорт) Прописка" class="ui-form-item">
              <v-img-loader v-if="!form.passport.registration_passport.length" name="logistic_pond_passport_1" v-model="form.passport.registration_passport" :files="1" :multiple="false" class="ui-img-loader" />
              <v-image v-if="form.passport.registration_passport.length" :link="form.passport.registration_passport" :width="290" :height="172" :radius="10" :style="{ backgroundSize: 'cover', backgroundPosition: '50%' }">
                <template slot="overlay">
                  <v-button color="primary" native="button" plain="" circle="" icon="" @click="form.passport.photos_passport = [form.passport.front_passport, '']"><template slot="icon"><v-icon name="Edit" /></template></v-button>
                </template>
              </v-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="(shops.length) ? 8 : 12" :sm="24">
            <el-form-item prop="card" label="Банковские реквизиты" class="ui-form-item">
              <el-input v-model="form.card" placeholder="Введите ссылку на банковские реквизиты" class="ui-input" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" v-if="shops.length">
            <el-form-item prop="shop_id" label="Магазин" class="ui-form-item">
              <el-select v-model="form.shop_id" class="ui-select" popper-class="ui-select-dropdown" placeholder="Выберите магазин">
                <el-option v-for="(shop, index) in shops" :key="index" :label="shop.name" :value="shop.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item prop="original_password" label="Личный пароль" class="ui-form-item">
              <el-input v-model="form.original_password" placeholder="Личный пароль" class="ui-input" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="8" :sm="24">
            <el-form-item prop="shop_id" label="Тип сотрудника" class="ui-form-item">
              <el-select v-model="form.user_type" class="ui-select" popper-class="ui-select-dropdown" placeholder="Выберите магазин">
                <el-option v-for="item in user_type" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
//Extensions
import Button from "@/components/atoms/button"
import Icon from "@/components/atoms/icon"
import imgLoader from "@/components/imgLoader"
import Image from "@/components/atoms/Image"

//Store
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {
    'v-button': Button,
    'v-icon': Icon,
    'v-img-loader': imgLoader,
    'v-image': Image,
  },
  data: () => ({
    user_type: [{
      value: 1,
      name: 'Пеший курьер'
    }, {
      value: 3,
      name: 'Авто курьер'
    }, {
      value: 2,
      name: 'Упаковщик'
    }],
    form: {
      login: '',
      data: {
        first_name: null,
        last_name: null,
        surname: null,
        city: null,
        gender: 'Мужской',
        age: null,
        birthday: null,
        photo: ''
      },
      passport: {
        series_passport: null,
        number_passport: null,
        front_passport: '',
        registration_passport: '',
      },
      documents: {
        inn: '',
        snils: ''
      },
      card: '',
      permission_id: 3,
      shop_id: null,
      user_type: 1
    },
    ruleForm: {
      data: {
        first_name: [{ required: true, message: 'Пожалуйста введите имя', trigger: 'blur' }],
        last_name: [{ required: true, message: 'Пожалуйста введите фамилию', trigger: 'blur' }],
        surname: [{ required: true, message: 'Пожалуйста введите отчество', trigger: 'blur' }],
        city: [{ required: true, message: 'Пожалуйста введите город', trigger: 'blur' }],
        age: [{ required: true, message: 'Пожалуйста введите возраст', trigger: 'blur' }],
        birthday: [{ required: true, message: 'Пожалуйста введите дату рождения', trigger: 'blur' }],
        photo: [{ required: true, message: 'Пожалуйста загрузите фотографию курьера', trigger: 'blur' }]
      },
      passport: {
        series_passport: [{ required: true, message: 'Пожалуйста введите серию паспорта', trigger: 'blur' }],
        number_passport: [{ required: true, message: 'Пожалуйста введите номер паспорта', trigger: 'blur' }],
        front_passport: [{ required: true, message: 'Пожалуйста загрузите фотографию главной страницы паспорта', trigger: 'blur' }],
        registration_passport: [{ required: true, message: 'Пожалуйста загрузите фотографию страницы прописки', trigger: 'blur' }],
      },
      documents: {
        inn: [{ required: true, message: 'Пожалуйста введите инн', trigger: 'blur' }],
        snils: [{ required: true, message: 'Пожалуйста введите снилс', trigger: 'blur' }]
      },
      card: [{ required: true, message: 'Пожалуйста введите банковские реквизиты', trigger: 'blur' }],
      login: [{ required: true, message: 'Пожалуйста введите номер телефона', trigger: 'blur' }],
      user_type: [{ required: true, message: 'Пожалуйста укажите тип сотрудника', trigger: 'blur' }],
      shop_id: [{ required: true, message: 'Пожалуйста укажите тип сотрудника', trigger: 'blur' }],
    },
  }),
  async created() {
    if (await this.$store.dispatch('shops/empty')) await this.$store.dispatch('shops/getShops')
    this.form = JSON.parse(JSON.stringify(this.staff))
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'staff/setSelectedStaff') this.form = JSON.parse(JSON.stringify(this.staff))
    })
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  computed: {
    ...mapGetters({
      shops: 'shops/getShops',
      staff: 'staff/getSelectedStaff'
    }),
  },
  methods: {
    ...mapMutations({
      updateStaff: 'staff/updateStaff',
      setSelectedWindow: 'staff/setSelectedWindow'
    }),
    submitHandler(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.$put('https://delivery.yelm.io/api/user', this.form).then(() => {
            this.updateStaff('MapStaff', this.form)
          })
        } else {
          this.$notify.error({ title: 'Ошибка', message: 'Укажите все данные', customClass: 'el-notification-error', duration: 1000  })
        }
      })
    }
  }
}
</script>
