<template>
  <div class="Items__AddCategory">
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="DialogAddSubCategory" :append-to-body="true" custom-class="Items__AddCategory-Dialog" :show-close="false" @close="$emit('hide')">
      <template slot="title">
        <div class="el-dialog__header-left">
          <v-button plain="" circle="" native="button" color="primary" icon="" @click="$emit('hide')" class="el-dialog__header-close">
            <v-icon name="ArrowLeft" slot="icon" fill="" color="primary" />
          </v-button>
          <div class="text text__extra-large text__dark text__medium el-dialog__header-title">Добавление подкатегории</div>
        </div>
        <v-switch-lang v-model="SubCategoryForm.Language" />
      </template>
      <template slot="default">
        <el-form ref="AddCategoryForm" class="Items__AddCategory-Form">
          <el-form-item>
            <template slot="label">
              <div class="Items__form-label">
                <span class="text text__dark text__medium">Название подкатегории <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать название подкатегории" placement="top">
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
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать статус подкатегории" placement="top">
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
          <el-form-item class="Item__Button_Flex">
            <button @click.prevent="AddSubCategory" data-text="Сохранить" class="button button__primary button__medium">Сохранить</button>
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
import {mapActions, mapGetters} from "vuex";
export default {
  name: "Add",
  components: {
    'v-switch-lang': SwitchLang,
    'v-icon': Icon,
    'v-button': Button
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
  computed: {
    ...mapGetters({
      Languages: 'getLanguages' // Список поддерживаемых языков
    })
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.$nextTick(async () => {
      await this.getLanguages()
      this.Languages.forEach((Language) => {
        this.$set(this.SubCategoryForm.name, Language.value, null)
      })
    })
  },
  methods: {
    ...mapActions({
      getLanguages: 'getLanguages',
      pushSubCategory: 'category/pushSubCategory'
    }),
    async AddSubCategory () {
      if (!this.SubCategoryForm.validator.name) {
        this.$notify.error({ title: 'Ошибка', message: 'Введите название подкатегории' })
      } else {
        if (this.SubCategoryForm.status !== null) {
          await this.pushSubCategory({ category_id: this.value, name: this.SubCategoryForm.name, status: this.SubCategoryForm.status })
          this.$emit('hide')
        } else {
          this.$notify.error({ title: 'Ошибка', message: 'Выберите статус подкатегории', customClass: 'el-notification-error', duration: 1000  })
        }
      }
    },

  },
  data: () => ({
    DialogAddSubCategory: true,
    SubCategoryForm: {
      name: {},
      validator: {
        name: false
      },
      status: null,
      Language: {label: 'RU', value: 'RU', icon: 'ru'}
    },
    statuses: [
      { label: 'В ротации', value: 'rotation' }, { label: 'Черновик', value: 'draft' }
    ]
  })
}
</script>

<style scoped>

</style>
