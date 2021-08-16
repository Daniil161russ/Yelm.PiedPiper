<template>
  <div class="grid__container">
    <div class="grid__body-header">
      <div class="grid__body-header-left">
        <v-button @click="setSelectedWindow('Clients')" circle="" icon="" plain="" color="primary">
          <v-icon slot="icon" name="ArrowLeft" color="primary" fill="" />
        </v-button>
        <h2 class="h1">Редактирование</h2>
      </div>
    </div>
    <div class="grid__body-wrapper" >
      <div class="admin__edit" v-if="is_loaded">
        <el-form label-position="top" class="form" :model="publication" :rules="rulePublicationForm" ref="publication">
          <el-form-item class="form-item" prop="comment">
            <template slot="label">
              <div>
                <span>Обновить комментарий</span>
              </div>
            </template>
            <el-input kind="normal" v-model="publication.comment" type="text" value="publication.comment" placeholder="Обновить комментарий"/>
          </el-form-item>
          <el-form-item class="form-item" prop="status">
            <template slot="label">
              <div>
                <span>Обновить статус публикации</span>
              </div>
            </template>
            <el-select v-model="publication.status" collapse-tags placeholder="Статус публикации">
              <el-option
                v-for="item in status_types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row type="flex" class="row-bg" justify="start">
            <el-form-item>
              <button @click.prevent="submitForm('publication')" data-text="Обновить" class="button button__primary button__medium">Обновить</button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    'v-button': Button,
    'v-icon': Icon
  },

  data:() => ({
    publication: {
      status: null,
      comment: null,
    },
    is_loaded: false,

    rulePublicationForm: {
      comment: [{ required: true, message: 'Пожалуйста введите сообщение', trigger: 'blur' }],
      status: [{ required: true, message: 'Пожалуйста выберите статус публикации', trigger: 'blur' }],
    },

    status_types: [
      {
        label: 'В процессе оплаты',
        value: 'payment'
      },
      {
        label: 'На модерации',
        value: 'moderation'
      },
      {
        label: 'Опубликовано',
        value: 'published'
      },
    ],
  }),

  async fetch() {
    await this.setterClient().then(() => {
      this.is_loaded = true
      this.publication.status = this.client.published.status;
      this.publication.comment = this.client.published.message;
    })
  },

  computed: {
    ...mapGetters({
      client: 'admin/getClient'
    })
  },

  methods: {
    ...mapMutations({
      setSelectedWindow: 'admin/setSelectedWindow',
    }),

    ...mapActions({
      setterClient: 'admin/setterClient'
    }),

    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put("https://rest.yelm.io/api/published-control", {
            comment: this.publication.comment,
            status: this.publication.status,
            platform: this.client.platform,
          }).then((response) => {
            this.$notify.success({title: 'Успешно', message: 'Данные успешно обновлены', customClass: 'el-notification-success'})
          }).catch((e) => {
            this.$notify.error({title: 'Ошибка', message: e, customClass: 'el-notification-error'})
          })
        } else {
          return false;
        }
      })
    },
  }
}
</script>
