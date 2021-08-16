<template>
  <div class="Items__AddCategory">
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="EditCategoryDialog" :append-to-body="true" custom-class="Items__AddCategory-Dialog" :show-close="false" @close="$emit('hide')">
      <template slot="title">
        <div class="el-dialog__header-left">
          <v-button plain="" circle="" native="button" color="primary" icon="" @click="$emit('hide')" class="el-dialog__header-close">
            <v-icon name="ArrowLeft" slot="icon" fill="" color="primary" />
          </v-button>
          <div class="text text__extra-large text__dark text__medium el-dialog__header-title">Изменение категории</div>
        </div>
        <v-switch-lang v-model="CategoryForm.lang" />
      </template>
      <el-form ref="AddCategoryForm" class="Items__AddCategory-Form" slot="default">
        <el-form-item>
          <template slot="label">
            <div class="Items__form-label">
              <span class="text text__dark text__medium">Название категории <span class="text__danger">*</span></span>
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете изменить название категории" placement="top">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-question-mark"></use>
                </svg>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="CategoryForm.name[CategoryForm.lang.value]" placeholder="Введите название категории">
            <div slot="prepend" class="flag" :style="{ backgroundImage: 'url('+require(`~/assets/flags/${CategoryForm.lang.icon}.svg`)+')' }" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <div class="Items__form-label">
              <span class="text text__dark text__medium">Статус категории <span class="text__danger">*</span></span>
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете изменить статус категории" placement="top">
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
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете изменить количество отображаемых товаров на главной странице" placement="top">
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
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете изменить фотографию для категории" placement="top">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-question-mark"></use>
                </svg>
              </el-tooltip>
            </div>
          </template>
          <v-img-loader name="filepond" multiple="false" files="1" v-model="CategoryForm.image" v-if="CategoryForm.image == null" />
          <v-image v-if="CategoryForm.image != null" :link="CategoryForm.image" :width="70" :height="70" :radius="10" :style="{ backgroundSize: 'cover', backgroundPosition: '50%' }">
            <v-button slot="overlay" color="primary" native="button" plain="" circle="" icon="" size="small" @click="CategoryForm.image = null">
              <v-icon name="Edit" slot="icon" color="warning" fill="" size="small" />
            </v-button>
          </v-image>
        </el-form-item>
        <el-form-item class="Item__Button_Flex">
          <button @click.prevent="editCategory" data-text="Сохранить" class="button button__primary button__medium">Сохранить</button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Icon from '@/components/atoms/icon'
import Button from '@/components/atoms/button'
import SwitchLang from "@/components/atoms/SwitchLang";
import imgLoader from "@/components/imgLoader";
import Image from "@/components/atoms/Image";
export default {
  name: "Edit",
  components: {
    'v-switch-lang': SwitchLang,
    'v-img-loader': imgLoader,
    'v-icon': Icon,
    'v-button': Button,
    'v-image': Image,
  },
  computed: {
    ...mapGetters({
      Languages: 'getLanguages', // Список поддерживаемых языков
      categories: 'category/getCategories'
    })
  },
  mounted() {
    this.$nextTick(async () => {
      await this.getLanguages()
      this.categories.forEach((value) => {
        if (value.id === this.value) {
          this.Languages.forEach((Language) => {
            this.$set(this.CategoryForm.name, Language.value, value.name[Language.value])
          })
          this.CategoryForm.id = value.id
          this.CategoryForm.image = value.image
          this.CategoryForm.status = value.status
          this.CategoryForm.count_view = value.count_view
        }
      })
    })
  },
  methods: {
    ...mapActions({
      getLanguages: 'getLanguages',
      changeCategory: 'category/changeCategory'
    }),
    async editCategory () {
      const CheckName = () => {
        let CheckName_Count = 0
        this.Languages.forEach((Language) => {
          if (this.CategoryForm.name[Language.value] == null) CheckName_Count++
          else if (/^\s+/gm.exec(this.CategoryForm.name[Language.value]) !== null) CheckName_Count++
          else if (this.CategoryForm.name[Language.value].length === 0) CheckName_Count++
        })
        return !(CheckName_Count === Object.keys(this.CategoryForm.name).length)
      }
      if (!CheckName()) {
        this.$notify.error({ title: 'Ошибка', message: 'Введите название категории' })
      } else {
        if (this.CategoryForm.status !== null) {
          if (this.CategoryForm.image == null) {
            this.CategoryForm.image = "https://yelm.io/assets/images/logo.png"
          }
          await this.changeCategory(this.CategoryForm)
          this.$emit('hide')
        }
      }
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    CategoryForm: {
      name: {},
      image: null,
      id: null,
      status: null,
      count_view: null,
      lang: { label: 'RU', value: 'RU', icon: 'ru' }
    },
    EditCategoryDialog: true,
    statuses: [
      { label: 'В ротации', value: 'rotation' }, { label: 'Черновик', value: 'draft' }
    ]
  }),
  
}
</script>