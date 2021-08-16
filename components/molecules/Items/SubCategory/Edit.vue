<template>
  <div class="Items__AddCategory">
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="DialogEditSubCategory" :append-to-body="true" custom-class="Items__AddCategory-Dialog" :show-close="false" @close="$emit('hide')">
      <template slot="title">
        <div class="el-dialog__header-left">
          <v-button plain="" circle="" native="button" color="primary" icon="" @click="$emit('hide')" class="el-dialog__header-close">
            <v-icon name="ArrowLeft" slot="icon" fill="" color="primary" />
          </v-button>
          <div class="text text__extra-large text__dark text__medium el-dialog__header-title">Изменение подкатегории</div>
        </div>
        <v-switch-lang v-model="SubCategoryForm.Language" />
      </template>
      <template slot="default">
        <el-form ref="AddCategoryForm" class="Items__AddCategory-Form">
          <el-form-item>
            <template slot="label">
              <div class="Items__form-label">
                <span class="text text__dark text__medium">Название подкатегории <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете изменить название подкатегории" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="SubCategoryForm.name[SubCategoryForm.Language.value]" placeholder="Введите название подкатегории">
              <div slot="prepend" class="flag" :style="{ backgroundImage: 'url('+require(`~/assets/flags/${SubCategoryForm.Language.icon}.svg`)+')' }" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <div class="Items__form-label">
                <span class="text text__dark text__medium">Статус подкатегории <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете изменить статус подкатегории" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-select v-model="SubCategoryForm.status" placeholder="Выберите статус" popper-class="Items__AddCategory-Dropdown" :popper-append-to-body="true">
              <el-option v-for="(status, key) in statuses" :key="key" :label="status.label" :value="status.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <div class="Items__form-label">
                <span class="text text__dark text__medium">Изменить категорию</span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете изменить категорию" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-select v-model="SubCategoryForm.category_id" placeholder="Выберите категорию" popper-class="Items__AddCategory-Dropdown" :popper-append-to-body="true">
              <el-option v-for="category in categories" :key="category.id" :label="category.name['RU']" :value="category.id" />
            </el-select>
          </el-form-item>
          <el-form-item class="Item__Button_Flex">
            <button @click.prevent="EditSubCategory" data-text="Сохранить" class="button button__primary button__medium">Сохранить</button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SwitchLang from "@/components/atoms/SwitchLang";
import Icon from "@/components/atoms/icon";
import Button from "@/components/atoms/button";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Edit",
  components: {
    'v-switch-lang': SwitchLang,
    'v-icon': Icon,
    'v-button': Button
  },
  computed: {
    ...mapGetters({
      Languages: 'getLanguages',
      categories: 'category/getCategories'
    })
  },
  watch: {
    SubCategoryForm: {
      handler(SubCategoryForm) {
        const validatorSubCategoryName = () => {
          const validObjectName = !Object.values(SubCategoryForm.name).every(value => (value === null || value.length === 0 && typeof value.length !== 'undefined'))
          if ( validObjectName && /^\s+/gm.exec(SubCategoryForm.name[SubCategoryForm.Language.value]) !== null ) {
            return false
          } else return validObjectName
        }
        this.SubCategoryForm.validator.name = validatorSubCategoryName ()
      }, deep: true
    }
  },
  mounted() {
    this.$nextTick(async () => {
      await this.getLanguages()
      for (const category of this.categories) {
        if (category.id === this.category_id) {
          for (const subcategory of category.subcategories) {
            if (subcategory.id === this.value) {
              this.Languages.forEach((Language) => {
                this.$set(this.SubCategoryForm.name, Language.value, subcategory.name[Language.value])
              })
            }
          }
        }
      }
      this.SubCategoryForm.id = this.value
      this.SubCategoryForm.category_id = this.category_id
      this.SubCategoryForm.status = this.status
    })
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    category_id: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      getLanguages: 'getLanguages',
      changeSubCategory: 'category/changeSubCategory'
    }),
    async EditSubCategory () {
      if (!this.SubCategoryForm.validator.name) {
        this.$notify.error({ title: 'Ошибка', message: 'Введите название подкатегории' })
      } else {
        if (this.SubCategoryForm.status !== null) {
          await this.changeSubCategory(this.SubCategoryForm)
          this.$emit('hide')
        } else {
          this.$notify.error({ title: 'Ошибка', message: 'Выберите статус подкатегории', customClass: 'el-notification-error', duration: 1000  })
        }
      }
    }
  },
  data: () => ({
    DialogEditSubCategory: true,
    SubCategoryForm: {
      id: null,
      name: {},
      category_id: null,
      validator: {
        name: false
      },
      status: null,
      Language: { label: 'RU', value: 'RU', icon: 'ru' }
    },
    statuses: [
      { label: 'В ротации', value: 'rotation' }, { label: 'Черновик', value: 'draft' }
    ]
  })
}
</script>
