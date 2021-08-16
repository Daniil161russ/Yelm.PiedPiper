<template>
  <vue-template-grid>
    <template slot="aside">
      <NewsList />
    </template>
    <template>
      <section class="news">
        <div class="grid__container">
          <div class="grid__body-header">
            <div class="news__form-header_label">Редактирование новости</div>
          </div>
          <div class="grid__body-wrapper">
            <div class="news__body_preloader">
              <div v-if="news.length" class="news__body_preloader-box">
                Выберите новость для редактирования
              </div>
              <div class="news__body_preloader-box news__body_preloader-box_empty" v-if="!news.length">
                Редактирование новости будет доступно после ее создания
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </vue-template-grid>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "news",

    components: {
      NewsList: () => import('~/components/molecules/News/List'),
      'vue-template-grid': () => import('~/components/templates/template-grid')
    },

    computed: {
      ...mapGetters({
        news: 'news/getNews',
      })
    },
  }
</script>
