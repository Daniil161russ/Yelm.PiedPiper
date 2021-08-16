<template>
  <div>
    <div class="grid__aside-header">
      <div class="text text__extra-large text__medium text__dark">Список новостей</div>
      <v-button color="primary" plain="" circle="" icon="" :to="{ name: 'news-add' }">
        <template slot="icon"><v-icon name="Plus" color="primary" fill="" /></template>
      </v-button>
    </div>
    <div class="grid__aside-body">
      <template v-if="loading || !news.length">
        <div class="news__loader-item">
          <div v-if="!news.length" class="news__loader-box">Нажмите, чтобы добавить новость</div>
        </div>
      </template>
      <div class="news__card" v-for="(item, item_id) in news" :key="item_id" v-else-if="!loading">
        <div class="news__card-header">
          <div class="news__card-header_content">
            <div class="news__card-header_content__title text text__dark text__large text__medium">{{ item.title['RU'] }}</div>
            <div class="news__card-subheader text text__small text__icon text__icon-left" :class="'text__'+item.publication_format.type" v-if="item.publication != null">
              <v-icon name="Flash" size="small" :color="item.publication_format.type" fill="" /> {{ item.publication_format.message }}
            </div>
          </div>
          <div class="news__card-header_action">
            <el-popover class="logistics-user-actions" :width="160" trigger="click" :visible-arrow="false" placement="bottom-end" popper-class="el-popover__buttons" ref="NewsPopover">
              <v-button color="primary" plain="" circle="" icon="" slot="reference">
                <template slot="icon"><v-icon name="More" color="primary" fill="" /></template>
              </v-button>
              <template slot="default">
                <ul class="popover">
                  <li class="popover__item">
                    <button @click="editNews({ id: item.id, index: item_id })" class="popover__item-btn">Редактировать</button>
                  </li>
                  <li class="popover__item">
                    <button @click="deleteNews({ id: item.id, name: item.title['RU'], index: item_id })" class="popover__item-btn popover__item-btn_delete">Удалить</button>
                  </li>
                </ul>
              </template>
            </el-popover>
          </div>
        </div>
        <div class="news__card-body">
          <v-img :radius="20" :link="item.preview_image" v-if="item.preview_image != null" size="cover" />
        </div>
        <div class="news__card-actions">
          <div class="news__card-actions-col">
            <span class="news__card-action"><v-icon name="Eye" color="secondary-200" fill="" /><span class="news__card-action-text">{{ item.views }}</span></span>
            <span class="news__card-action"><span class="news__card-action-text">{{ item.reposts }}</span><v-icon name="Flip" color="secondary-200" fill="" /></span>
          </div>
          <div class="news__card-actions-col">
            <span class="news__card-action"><span class="news__card-action-text">{{ item.likes }}</span><v-icon name="Heart" color="secondary-200" fill="" /></span>
          </div>
        </div>
      </div>
    </div>
    <component :is="DeleteNews.Component" v-if="DeleteNews.Component != null" :id="DeleteNews.ID" :name="DeleteNews.Name"
               @hide="deleteNewsClose" />
  </div>
</template>

<script>
import Button from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import Image from "@/components/atoms/Image";
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "List",
  components: {
    'v-button': Button,
    'v-icon': Icon,
    'v-img': Image
  },
  data: () => ({
    DeleteNews: { Component: null, ID: null, Name: null },
  }),
  mounted() {
    this.$nextTick(async () => {
      await this.refreshNews()
    })
  },
  computed: {
    ...mapGetters({
      news: 'news/getNews',
      loading: 'news/getLoading'
    })
  },
  methods: {
    ...mapActions({
      refreshNews: 'news/refreshNews'
    }),
    editNews(payload) {
      this.$refs.NewsPopover[payload.index].doClose()
      this.$router.push({ name: 'news-id', params: payload })
    },
    deleteNewsClose (payload) {
      this.DeleteNews = { Component: null, ID: null, Name: null }
      this.$forceUpdate()
      if (payload.complete) {
        this.$router.push({ name: 'news' })
      }
    },
    deleteNews (payload) {
      this.$refs.NewsPopover[payload.index].doClose()
      this.DeleteNews.Name = payload.name
      this.DeleteNews.ID = payload.id
      this.DeleteNews.Component = require('@/components/molecules/News/Delete').default
    },
  },
}
</script>
