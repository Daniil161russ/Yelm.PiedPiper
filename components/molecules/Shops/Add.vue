<template>
  <el-dialog :close-on-press-escape="false" :visible.sync="DialogAdd" custom-class="Items__AddCategory-Dialog" @close="$emit('hide')"
  :append-to-body="true" :show-close="false" :close-on-click-modal="false" top="48px">
    <div class="el-dialog__header-left" slot="title">
      <v-button plain="" circle="" native="button" color="primary" icon="" @click="$emit('hide')" class="el-dialog__header-close">
        <v-icon name="ArrowLeft" slot="icon" fill="" color="primary" />
      </v-button>
      <div class="text text__extra-large text__dark text__medium el-dialog__header-title">Добавление магазина</div>
    </div>
    <el-form ref="AddShopsForm" class="Items__AddCategory-Form Shops__Form">
      <el-row :gutter="18">
        <el-col :md="12">
          <el-form-item>
            <template slot="label">
            <div class="shop__form-label">
              <span class="text text__dark text__medium">Название магазина <span class="text__danger">*</span></span>
              <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать название магазина" placement="top">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-question-mark"></use>
                </svg>
              </el-tooltip>
            </div>
          </template>
            <el-input v-model="ShopsForm.name" placeholder="Введите название магазина" />
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item>
            <template slot="label">
              <div class="shop__form-label">
                <span slot="label" class="text text__dark text__medium">Номер телефона <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать номер телефона магазина" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="ShopsForm.phone" placeholder="Введите номер телефона магазина" type="number" min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <template slot="label">
              <div class="shop__form-label">
                <span slot="label" class="text text__dark text__medium">Описание магазина <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать описание магазина" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="ShopsForm.description" placeholder="Введите описание магазина" type="textarea" :autosize="true" resize="none" />
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item>
            <template slot="label">
              <div class="shop__form-label">
                <span class="text text__dark text__medium">Адрес магазина <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете указан адрес магазина" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="ShopsForm.address" placeholder="" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item>
            <template slot="label">
              <div class="shop__form-label">
                <span slot="label" class="text text__dark text__medium">Ссылка на сайт<span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать ссылка на сайт" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="ShopsForm.website" placeholder="Введите ссылку на сайт" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <template slot="label">
              <div class="shop__form-label">
                <span slot="label" class="text text__dark text__medium">Время работы (начало и конец) <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать время работы магазина" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-row slot="default" :gutter="18">
              <el-col :span="12">
                <el-time-select v-model="ShopsForm.work_start" :picker-options="{ start: '00:00', end: '23:59', step: '00:30' }" placeholder="00:00" />
              </el-col>
              <el-col :span="12">
                <el-time-select v-model="ShopsForm.work_end" :picker-options="{ start: '00:00', end: '23:59', step: '00:30' }" placeholder="00:00" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <template slot="label">
              <div class="shop__form-label">
                <span slot="label" class="text text__dark text__medium">Фотография магазина <span class="text__danger">*</span></span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать фотографию магазина" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <v-img-loader name="filepond" multiple="false" files="1" v-model="ShopsForm.image" v-if="ShopsForm.image == null" />
            <v-image v-if="ShopsForm.image != null" :link="ShopsForm.image" :width="240" :height="240" :radius="10" :style="{ backgroundSize: 'cover', backgroundPosition: '50%' }">
              <v-button  slot="overlay" color="primary" native="button" plain="" circle="" icon="" @click="ShopsForm.image = null">
                <v-icon name="Edit" slot="icon" color="warning" fill="" />
              </v-button>
            </v-image>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <v-button round="" color="gradient-BlueToPurpleToRed" native="button" center="" @click="submitShopsForm">Отправить</v-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import Button from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import imgLoader from "@/components/imgLoader";
import Image from "@/components/atoms/Image";
import { mapActions } from 'vuex'
export default {
  name: "Add",
  components: {
    'v-button': Button,
    'v-icon': Icon,
    'v-img-loader': imgLoader,
    'v-image': Image,
  },
  mounted() {
    this.ShopsForm.address = this.address
    this.ShopsForm.city = this.city
    this.ShopsForm.latitude = this.coords[0]
    this.ShopsForm.longitude = this.coords[1]
  },
  methods: {
    ...mapActions ({
      addShop: 'shops/addShop'
    }),
    async submitShopsForm () {
      try {
        await this.addShop(this.ShopsForm)
        this.$emit('complete')
      } catch (e) {
        if (e.response.status === 422) {
          this.$notify.error({
            title: 'Ошибка',
            message: Object.values(e.response.data).map((value) => (`<div class="text text__small text__left" style="margin-bottom: 6px">${value}</div>`)).join(''),
            dangerouslyUseHTMLString: true
          })
        }
      }
    }
  },
  props: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    coords: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      DialogAdd: true,
      ShopsForm: {
        address: null,
        city: null,
        description: null,
        image: null,
        latitude: null,
        longitude: null,
        name: null,
        phone: null,
        website: null,
        work_start: null,
        work_end: null
      },
    }
  }
}
</script>

<style scoped>

</style>
