<template>
  <el-dialog  :close-on-press-escape="false" :visible.sync="DialogEdit" custom-class="Items__AddCategory-Dialog" @close="$emit('hide')"
             :append-to-body="true" :show-close="false" :close-on-click-modal="false" top="48px">
    <div class="el-dialog__header-left" slot="title">
      <v-button plain="" circle="" native="button" color="primary" icon="" @click="$emit('hide')" class="el-dialog__header-close">
        <v-icon name="ArrowLeft" slot="icon" fill="" color="primary" />
      </v-button>
      <div class="text text__extra-large text__dark text__medium el-dialog__header-title">Редактирование магазина</div>
    </div>
    <el-form ref="AddShopsForm" class="Items__AddCategory-Form Shops__Form">
      <el-row :gutter="18">
        <el-col :md="12">
          <el-form-item>
            <span slot="label" class="text text__dark text__medium">Название магазина <span class="text__danger">*</span></span>
            <el-input v-model="ShopsForm.name" placeholder="Введите название магазина" />
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item>
            <span slot="label" class="text text__dark text__medium">Номер телефона <span class="text__danger">*</span></span>
            <el-input v-model="ShopsForm.phone" placeholder="Введите номер телефона магазина" type="number" min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <span slot="label" class="text text__dark text__medium">Описание магазина <span class="text__danger">*</span></span>
            <el-input v-model="ShopsForm.description" placeholder="Введите описание магазина" type="textarea" :autosize="true" resize="none" />
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item>
            <span slot="label" class="text text__dark text__medium">Адрес магазина <span class="text__danger">*</span></span>
            <el-input v-model="ShopsForm.address" placeholder="" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item>
            <span slot="label" class="text text__dark text__medium">Ссылка на сайт <span class="text__danger">*</span></span>
            <el-input v-model="ShopsForm.website" placeholder="Введите ссылку на сайт" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <span slot="label" class="text text__dark text__medium">Время работы (начало и конец) <span class="text__danger">*</span></span>
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
            <span slot="label" class="text text__dark text__medium">Фотография магазина <span class="text__danger">*</span></span>
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
            <v-button round="" color="gradient-BlueToPurpleToRed" native="button" center="" @click="submitEditForm">Отправить</v-button>
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
import { mapActions } from "vuex";
export default {
  name: "Edit",
  components: {
    'v-button': Button,
    'v-icon': Icon,
    'v-img-loader': imgLoader,
    'v-image': Image,
  },
  methods: {
    ...mapActions ({
      updateShop: 'shops/updateShop'
    }),
    async submitEditForm () {
      try {
        await this.updateShop (this.ShopsForm)
        this.$emit('complete')
      } catch (e) {
        if (e.response.status === 422) {
          this.$notify.error({
            title: 'Ошибка',
            message: Object.values(e.response.data).map((value) => (`<div class="text text__small text__left" style="margin-bottom: 6px">${value}</div>`)).join(''),
            dangerouslyUseHTMLString: true,
            customClass: 'el-notification-error'
          })
        }
      }
    }
  },
  created() {
    this.ShopsForm = {
      id: this.shop.id,
      address: this.address,
      city: this.city,
      description: this.shop.description,
      image: this.shop.image,
      latitude: this.coords[0].toString(),
      longitude:  this.coords[1].toString(),
      name: this.shop.name,
      phone: this.shop.phone,
      website: this.shop.website,
      work_start: this.shop.work_start,
      work_end: this.shop.work_end
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
    },
    shop: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      DialogEdit: true,
      ShopsForm: {},
    }
  }
}
</script>

<style scoped>

</style>
