<template>
  <div class="grid__container">
    <div class="grid__body-header">
      <div class="grid__body-header-left">
        <h2 class="h1">Клиенты</h2>
      </div>
     <div class="grid__body-header-right">
        <el-input class="admin__search" placeholder="Поиск приложения" v-model="search"></el-input>
     </div>
    </div>
    <div class="grid__body-wrapper">
      <div class="admin__container" v-if="is_loaded">
        <div class="admin__block" v-for="(client, key) in clientsList" :key="key" :style="[client.published !== null ?
        (client.published.status[0] === 'moderation' ? {'background': 'orange'}
        : client.published.status[0] === 'payment' ? {'background': 'red'}
        : client.published.status[0] === 'published' ? {'background': 'lightgreen'} : '') : '']">
          <div class="admin__block-info">
            <img :src="client.image" alt="Изображение профиля">
            <span class="h3" :style="[client.published !== null ? {'color': 'white'} : '']">{{ client.username }}</span>
          </div>
          <el-popover :width="160" trigger="click" :visible-arrow="false" placement="bottom-end" popper-class="el-popover__buttons">
            <v-button class="btn__blue" color="secondary" plain="" circle="" icon="" slot="reference" shadow="none" size="small"><v-icon name="More" color="secondary-100" fill="" slot="icon" /></v-button>
            <ul class="popover" slot="default">
              <li class="popover__item">
                <button @click.prevent="viewClient(client.id)" class="popover__item-btn">Просмотреть</button>
              </li>
              <li class="popover__item" v-if="client.published !== null">
                <button @click.prevent="editClient(client.id)" class="popover__item-btn">Редактировать</button>
              </li>
            </ul>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    'v-button': Button,
    'v-icon': Icon
  },
  async fetch() {
    await this.getterClients().then(() => {
      this.is_loaded = true
    })
  },

  mounted() {
    console.log(this.clients)
  },

  data:() => ({
    search: '',
    is_loaded: false,
  }),

  computed: {
    ...mapGetters({
      clients: 'admin/getClients'
    }),

    clientsList() {
      return this.clients.filter(client => client.username.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    ...mapActions({
      getterClients: 'admin/getterClients',
      setterClient: 'admin/setterClient'
    }),
    ...mapMutations({
      setSelectedWindow: 'admin/setSelectedWindow',
      setClientID: 'admin/setClientID'
    }),
    viewClient(id) {
      this.setClientID(id)
      this.setSelectedWindow('Client')
    },
    editClient(id) {
      this.setClientID(id)
      this.setSelectedWindow('Edit')
    }
  }
}
</script>
