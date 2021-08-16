<template>
  <div class="grid__container">
    <div class="grid__body-header">
      <div class="grid__body-header-left">
        <v-button @click="setSelectedWindow('Clients')" circle="" icon="" plain="" color="primary">
          <v-icon slot="icon" name="ArrowLeft" color="primary" fill="" />
        </v-button>
        <h2 class="h1">Просмотр</h2>
      </div>
    </div>
    <div class="grid__body-wrapper">
      <div v-if="is_loaded" class="admin__info">
        <h3 class="h3">Основные данные</h3>
        <div class="admin__basis">
          <img :src="client.image" alt="Изображение пользователя">
          <div class="admin__basis-block">
            <span><b>Название:</b> {{ client.username }}</span>
            <span><b>Телефон:</b> {{ client.phone }}</span>
            <span><b>Номер пользователя:</b> {{ client.id }}</span>
            <span><b>Платформа:</b> {{ client.platform }}</span>
            <span><b>Баланс:</b> {{ client.balance }} руб.</span>
          </div>
        </div>
        <h3 class="h3">Данные заполнения</h3>
        <div class="admin__fullness">
          <span>Количество товаров: <b>{{ client.items_count }}</b></span>
          <span>Количество категорий: <b>{{ client.categories_count }}</b></span>
          <span>Количество подкатегорий: <b>{{ client.subcategories_count }}</b></span>
          <span>Количество новостей: <b>{{ client.news_count }}</b></span>
          <span>Количество заказов: <b>{{ client.orders_count }}</b></span>
        </div>
        <h3 class="h3">Настройки</h3>
        <div class="admin__setting">
          <span>Основной цвет приложения: <b>#{{ client.settings.theme }}</b></span>
          <span>Цвет шрифта в категориях: <b>#{{ client.settings.theme_category }}</b></span>
          <span>Цвет шрифта в цветных блоках: <b>#{{ client.settings.foreground }}</b></span>
        </div>
        <h3 class="h3">Данные об оплате</h3>
        <div class="admin__payment">
          <span>Организация: <b>{{ (!client.settings.payment_data.organization) ? 'Не указано' : client.settings.payment_data.organization }}</b></span>
          <span>ИНН: <b>{{ (!client.settings.payment_data.inn) ? 'Не указано' : client.settings.payment_data.inn }}</b></span>
          <span>КПП: <b>{{ (!client.settings.payment_data.kpp) ? 'Не указано' : client.settings.payment_data.kpp }}</b></span>
          <span>ОКВЭД: <b>{{ (!client.settings.payment_data.okved) ? 'Не указано' : client.settings.payment_data.okved }}</b></span>
          <span>ОГРН: <b>{{ (!client.settings.payment_data.ogrn) ? 'Не указано' : client.settings.payment_data.ogrn }}</b></span>
          <span>Полное наименование организации: <b>{{ (!client.settings.payment_data.name_of_company) ? 'Не указано' : client.settings.payment_data.name_of_company }}</b></span>
          <span>Сокращённое наименование организации: <b>{{ (!client.settings.payment_data.abbreviated_of_company) ? 'Не указано' : client.settings.payment_data.abbreviated_of_company }}</b></span>
          <span>Орган государственной регистрации: <b>{{ (!client.settings.payment_data.registration_authority) ? 'Не указано' : client.settings.payment_data.registration_authority }}</b></span>
          <span>Дата регистрации: <b>{{ (!client.settings.payment_data.registration_date) ? 'Не указано' : client.settings.payment_data.registration_date }}</b></span>
          <span>Сумма уставного капитала: <b>{{ (!client.settings.payment_data.authorized_capital) ? 'Не указано' : client.settings.payment_data.authorized_capital }}</b></span>
          <span>Телефон организации: <b>{{ (!client.settings.payment_data.organization_phone) ? 'Не указано' : client.settings.payment_data.organization_phone }}</b></span>
          <span>E-mail адрес: <b>{{ (!client.settings.payment_data.email) ? 'Не указано' : client.settings.payment_data.email }}</b></span>
        </div>
        <h3 v-if="client.published" class="h3">Публикация приложения</h3>
        <div v-if="client.published" class="admin__published">
          <span>Рекламный текст: <b>{{ client.published.advertising }}</b></span>
          <span>Описание приложения: <b>{{ client.published.description }}</b></span>
          <span>Статус: <b>{{ client.published.status[0] }}</b></span>
          <span>Ваш комментарий: <b>{{ client.published.message }}</b></span>
          <span>Дата создание: <b>{{ client.published.created_at }}</b></span>
          <span>Иконка приложения:</span>
          <img :src="client.published.logotype" alt="Иконка приложения">
          <a target="_blank" class="admin__published-btn" :href="client.published.logotype" download>Скачать логотип</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/atoms/button"
import Icon from "@/components/atoms/icon"

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'v-button': Button,
    'v-icon': Icon
  },
  data: () => ({
    is_loaded: false
  }),
  async fetch() {
    await this.setterClient().then(() => {
      this.is_loaded = true
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
    })
  }
}
</script>
