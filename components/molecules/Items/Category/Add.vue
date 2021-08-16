<template>
  <div class="Items__AddCategory">
    <el-dialog :visible.sync="DialogAddCategory" :append-to-body="true" custom-class="Items__AddCategory-Dialog" :show-close="false" @close="$emit('hide')" :close-on-press-escape="false" :close-on-click-modal="false">
      <template slot="title">
        <div class="el-dialog__header-left">
          <v-button plain="" circle="" native="button" color="primary" icon="" @click="$emit('hide')" class="el-dialog__header-close">
            <v-icon name="ArrowLeft" slot="icon" fill="" color="primary" />
          </v-button>
          <div class="text text__extra-large text__dark text__medium el-dialog__header-title">Добавление категории</div>
        </div>
        <v-switch-lang v-model="CategoryForm.Language" />
      </template>
      <template slot="default">
        <el-form ref="AddCategoryForm" class="Items__AddCategory-Form">
          <el-form-item>
            <template slot="label">
              <div class="Items__form-label">
                <span class="text text__dark text__medium">Название категории <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать название категории" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="CategoryForm.name[CategoryForm.Language.value]" placeholder="Введите название категории">
              <div slot="prepend" class="flag" :style="{ backgroundImage: 'url('+require(`~/assets/flags/${CategoryForm.Language.icon}.svg`)+')' }" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <div class="Items__form-label">
                <span class="text text__dark text__medium">Статус категории <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать статус категории" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-select v-model="CategoryForm.status" placeholder="Выберите статус" popper-class="Items__AddCategory-Dropdown" :popper-append-to-body="true">
              <el-option v-for="(status, key) in statuses" :key="key" :label="status.label" :value="status.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <div class="Items__form-label">
                <span class="text text__dark text__medium">Количество отображаемых товаров на главной странице <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете указать количество отображаемых товаров на главной странице" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-input-number class="Items__AddCategory-Form-Number" v-model="CategoryForm.count_view" :min="1" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <div class="Items__form-label">
                <span class="text text__dark text__medium">Фотография категории</span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать фотографию для категории" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <v-img-loader name="filepond" multiple="false" files="1" v-model="CategoryForm.image" v-if="CategoryForm.image == null" />
            <v-image v-if="CategoryForm.image != null" :link="CategoryForm.image" :width="70" :height="70" :radius="10" :style="{ backgroundSize: 'cover', backgroundPosition: '50%' }">
              <template slot="overlay">
                <v-button color="primary" native="button" plain="" circle="" icon="" @click="CategoryForm.image = null" size="small"><v-icon name="Edit" slot="icon" color="warning" fill="" size="small" /></v-button>
              </template>
            </v-image>
          </el-form-item>
          <el-form-item class="Item__Button_Flex">
            <button :disabled="getFilepondLoading" @click.prevent="AddCategory" data-text="Сохранить" class="button button__primary button__medium" >Сохранить</button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SwitchLang from "@/components/atoms/SwitchLang"
import Icon from '@/components/atoms/icon'
import Button from '@/components/atoms/button'
import imgLoader from "@/components/imgLoader"
import Image from '@/components/atoms/Image'
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Add",

  components: {
    'v-switch-lang': SwitchLang,
    'v-img-loader': imgLoader,
    'v-icon': Icon,
    'v-button': Button,
    'v-image': Image,
  },

  data: () => ({
    DialogAddCategory: true,
    loading: false,
    CategoryForm: {
      name: {},
      image: null,
      status: null,
      count_view: 1,
      Language: { label: 'RU', value: 'RU', icon: 'ru' }
    },
    statuses: [
      { label: 'В ротации', value: 'rotation' }, { label: 'Черновик', value: 'draft' }
    ]
  }),

  computed: {
    ...mapGetters({
      Languages: 'getLanguages', // Список поддерживаемых языков
      getFilepondLoading: 'user/getFilepondLoading'
    })
  },

  mounted() {
    this.$nextTick(async () => {
      await this.getLanguages()
      this.Languages.forEach((Language) => {
        this.$set(this.CategoryForm.name, Language.value, null)
      })
    })
  },

  methods: {
    ...mapActions({
      getLanguages: 'getLanguages',
      pushCategory: 'category/pushCategory'
    }),

    async AddCategory () {
      this.loading = true
      const CheckName = () => {
        let CheckName_Count = 0
        this.Languages.forEach((Language) => {
          if (this.CategoryForm.name[Language.value] == null) CheckName_Count++
          else if (/^\s+/gm.exec(this.CategoryForm.name[Language.value]) !== null) CheckName_Count++
          else if (this.CategoryForm.name[Language.value].length === 0) CheckName_Count++
        })
        return (!(CheckName_Count === Object.keys(this.CategoryForm.name).length))
      }
      if (!CheckName()) {
        this.$notify.error({ title: 'Ошибка', message: 'Введите название категории', customClass: 'el-notification-error' })
      } else {
        if (this.CategoryForm.status !== null) {
          if (this.CategoryForm.image == null) {
            this.CategoryForm.image = "https://s3.eu-north-1.amazonaws.com/yelm.io.2/files/logotype.for.item.jpg"
          }
          await this.pushCategory(this.CategoryForm)
          this.DialogAddCategory = false
          this.loading = false
        } else {
          this.$notify.error({ title: 'Ошибка', message: 'Выберите статус категории', customClass: 'el-notification-error', duration: 1000  })
        }
      }
    }
  },
}
</script>
