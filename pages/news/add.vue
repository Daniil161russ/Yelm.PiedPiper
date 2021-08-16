<template>
  <vue-template-grid>
    <template slot="aside">
      <NewsList />
    </template>
    <template>
      <div class="news__form-container">
        <div class="news__form-header">
          <div class="news__form-header_label">Добавление новости</div>
          <div class="news__form-header_actions">
            <v-button round="" color="primary" plain="" native="button" center="" @click="SubmitNewsForm">Добавить</v-button>
            <v-switch-lang v-model="News.Language" />
          </div>
        </div>
        <el-form ref="NewsForm" class="news__form">
          <el-form-item>
            <template slot="label">
              <div class="news__form-label">
                <span>Заголовок новости</span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете записать заголовок новости" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="News.Title[News.Language.value]" placeholder="Введите заголовок новости">
              <template slot="prepend"><div class="flag" :style="{ backgroundImage: 'url('+require(`~/assets/flags/${News.Language.icon}.svg`)+')' }" /></template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              <div class="news__form-label">
                <span>Обложка новости</span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете добавить обложку для новости" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <v-img-loader name="filepond" multiple="false" files="1" v-model="News.Preview_Image" v-if="News.Preview_Image == null" />
            <v-image v-if="News.Preview_Image != null" :link="News.Preview_Image" :width="290" :height="172" :radius="10" :style="{ backgroundSize: 'cover', backgroundPosition: '50%' }">
              <template slot="overlay">
                <v-button color="primary" native="button" plain="" circle="" icon="" @click="News.Preview_Image = null"><template slot="icon"><v-icon name="Edit" /></template></v-button>
              </template>
            </v-image>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              <div class="news__form-label">
                <span>Фотография новости</span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете добавить фотографию для новости" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <v-img-loader name="filepond" multiple="false" files="1" v-model="News.Image" v-if="News.Image == null" />
            <v-image v-if="News.Image != null" :link="News.Image" :width="290" :height="172" :radius="10" :style="{ backgroundSize: 'cover', backgroundPosition: '50%' }">
              <template slot="overlay">
                <v-button color="primary" native="button" plain="" circle="" icon="" @click="News.Image = null"><template slot="icon"><v-icon name="Edit" /></template></v-button>
              </template>
            </v-image>
          </el-form-item>

          <el-form-item class="news__attachment" v-if="Items.length">
            <template slot="label">
              <v-button native="button" size="small" color="primary" plain="" circle="" icon="" @click="returnAttachment" v-if="News_Attachment.State === 'Select-Item'">
                <v-icon slot="icon" name="ArrowLeft" color="primary" fill="" size="small" />
              </v-button>
              <span class="news__attachment-header">Прикрепить товары</span>
              <span class="news__attachment-subheader">{{ (News_Attachment.State === 'Select-Category') ? ('выберите категорию') : ('выберите товар') }}</span>
              <el-tooltip class="news__attachment-item" effect="dark" content="Здесь Вы можете прикрепить товар с которым связана новость" placement="top">
              <svg class="svg-sprite">
                <use xlink:href="#icon-question-mark"></use>
              </svg>
            </el-tooltip>
            </template>
            <div class="news__carousel owl-carousel owl-theme" ref="News_Carousel" v-if="News_Attachment.Show">
              <div class="item news__carousel-item" v-for="(item, item_id) in News_Attachment.Items" :key="item_id">
                <v-image :link="item.image" :width="120" :height="120" size="cover" :radius="10" :style="{
              backgroundImage: (News.AttachedGoods.indexOf(item.id) !== -1) ?  'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+item.image+')' :
                                                                                'linear-gradient(180deg, rgba(0, 0, 0, 0) 29.5%, rgba(0, 0, 0, 0.5) 100%), url('+item.image+')'
            }" :class="{ 'news__carousel-item_active': (News.AttachedGoods.indexOf(item.id) !== -1) }">
                  <div class="news__carousel-item_text" slot="default" v-if="(News.AttachedGoods.indexOf(item.id) === -1)">{{ item.label }}</div>

                  <v-button  size="small" plain="" circle="" icon="" slot="overlay" native="button" @click="actionAttachment(item_id)" v-if="News_Attachment.State === 'Select-Category'">
                    <v-icon name="ArrowRight" color="primary" fill="" size="small" slot="icon" />
                  </v-button>

                  <v-icon name="Check" class="news__carousel-item_icon" v-if="(News.AttachedGoods.indexOf(item.id) !== -1)" @click.native="actionAttachment(item_id)" />

                  <v-button size="small" plain="" circle="" icon="" slot="overlay" native="button" @click="actionAttachment(item_id)" v-if="News_Attachment.State === 'Select-Item' && (News.AttachedGoods.indexOf(item.id) === -1)">
                    <v-icon name="Check" color="primary" fill="" size="small" slot="icon" />
                  </v-button>

                </v-image>
              </div>
            </div>
          </el-form-item>

          <el-form-item class="news__form-item_between">
            <template slot="label">
              <div class="flag" :style="{ backgroundImage: 'url('+require(`~/assets/flags/${News.Language.icon}.svg`)+')' }" />
              <div class="news__form-label">
                <span>Текст новости</span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете написать текст для более подробного описания новости" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
            </template>
            <Editor ref="tinymce" api-key="lbwbw0j62bbd25kd0rukrtnao7hchkjkzlimni8xmchkfv70" :init="tinymce_options" v-model="News.Text[News.Language.value]" />
          </el-form-item>

          <el-form-item>
            <template slot="label">
              <div class="news__form-label">
                <span>Время публикации</span>
                <el-tooltip class="item" effect="dark" content="Здесь Вы можете выбрать дату, когда появится новость, либо опубликовать ее сразу" placement="top">
                  <svg class="svg-sprite">
                    <use xlink:href="#icon-question-mark"></use>
                  </svg>
                </el-tooltip>
              </div>
              <div class="news__form-checkbox">
                <span class="text text__dark">Опубликовать сейчас?</span>
                <v-checkbox v-model="News.PublishNow" />
              </div>
            </template>
            <el-row :gutter="12" v-if="!News.PublishNow">
              <el-col :sm="24">
                  <el-date-picker v-model="News.DataTimeOfPublication" type="datetime" placeholder="Дата публикации"></el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>

      </div>
    </template>
  </vue-template-grid>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SwitchLang from "@/components/atoms/SwitchLang"
import Image from '@/components/atoms/Image'
import Button from '@/components/atoms/button'
import Icon from '@/components/atoms/icon'
import Checkbox from "@/components/atoms/checkbox"
export default {
  name: "add",

  components: {
    'v-switch-lang': SwitchLang, // Компонент выбора языка
    'v-img-loader': () => import("~/components/imgLoader"),
    'v-image': Image,
    'v-button': Button,
    'v-icon': Icon,
    'v-checkbox': Checkbox,
    Editor: () => import('@tinymce/tinymce-vue'),
    NewsList: () => import('~/components/molecules/News/List'),
    'vue-template-grid': () => import('~/components/templates/template-grid')
  },
  computed: {
    ...mapGetters({
      Languages: 'getLanguages', // Список поддерживаемых языков
      Categories: 'category/getCategories',
      Items: 'items/getItems',
    })
  },
  mounted() {
    // Добавляем ключи поддерживаемых языков переменным --
    this.$nextTick(async () => {
      await this.getLanguages()
      await this.refreshCategories()
      await this.getItems()
      this.Languages.forEach((Language) => {
        this.$set(this.News.Title, Language.value, '')
        this.$set(this.News.Text, Language.value, '')
      })
      if ( typeof this.$refs.NewsForm !== 'undefined' ) {
        $(this.$refs.NewsForm.$el).on('submit', (e) => (e.preventDefault()))
      }
      this.News_Attachment.Items = this.Categories.filter((category) => (( typeof this.Items.find((item) => ( item.category_id === category.id )) !== 'undefined' ))).map((category) => ({ image: category.image, label: category.name['RU'], id: category.id, active: false }))
      this.News_Carousel_Arrow = await require('~/assets/icons/ArrowLeft.svg?raw')
      await this.NewsCarousel ()
    })
  },
  methods: {
    ...mapActions({
      getLanguages: 'getLanguages',
      refreshCategories: 'category/refreshCategories',
      getItems: 'items/getItems',
      addNews: 'news/addNews',
      fetchAllNews: 'preview/fetchAllNews',
    }),
    async returnAttachment () {
      if (this.News_Attachment.State !== 'Select-Item') return
      this.News_Attachment.State = 'Select-Category'
      this.News_Attachment.Items = this.Categories.filter((category) => (( typeof this.Items.find((item) => ( item.category_id === category.id )) !== 'undefined' ))).map((category) => ({ image: category.image, label: category.name['RU'], id: category.id, active: false }))
      await this.NewsCarousel ()
    },
    async actionAttachment (index) {
      const News_Attachment_Item = this.News_Attachment.Items[index]
      switch (this.News_Attachment.State) {
        case 'Select-Category': {
          this.News_Attachment.Items = this.Items.filter((item) => ( item.category_id === News_Attachment_Item.id )).map((item) => ({ id: item.id, image: item.preview_image, label: item.name['RU'], active: false }))
          this.News_Attachment.State = 'Select-Item'
          await this.NewsCarousel()
          break;
        }
        case 'Select-Item': {
          const Attachment_Index = this.News.AttachedGoods.indexOf(News_Attachment_Item.id)
          if (Attachment_Index === -1) {
            this.News.AttachedGoods.push(News_Attachment_Item.id)
          } else {
            this.News.AttachedGoods.splice(Attachment_Index, 1)
          }
          break;
        }
      }
    },
    async SubmitNewsForm () {
      this.validatorNews(this.News)
      if(!Object.values(this.NewsValidator).every(value => (value.value === true))) {
        this.$notify.error({ title: 'Ошибка', message: this.NewsValidatorNotify(), dangerouslyUseHTMLString: true })
      } else {
        if (this.News.PublishNow) {
          await this.addNews({
            description: this.News.Text,
            image: this.News.Image,
            preview_image: this.News.Preview_Image,
            items: this.News.AttachedGoods,
            publication: new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
            title: this.News.Title,
            type: (this.News.AttachedGoods.length) ? 'news' : 'news',
          })
          await this.$router.push({ name: 'news' })
        } else if (this.News.DataTimeOfPublication !== null) {
          await this.addNews({
            description: this.News.Text,
            image: this.News.Image,
            preview_image: this.News.Preview_Image,
            items: this.News.AttachedGoods,
            publication: new Date(this.News.DataTimeOfPublication).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
            title: this.News.Title,
            type: (this.News.AttachedGoods.length) ? 'news' : 'news',
          })
          await this.$router.push({ name: 'news' })
        }
      }
    },
    NewsValidatorNotify () {
      return Object.values(this.NewsValidator).filter((item) => (!item.value)).map((value) => (`<div class="text text__small text__left" style="margin-bottom: 6px">${value.notify}</div>`)).join('')
    },
    sleep (ms) {
      return new Promise((resolve) => ( setTimeout(()=> ( resolve() ), ms) ))
    },
    async NewsCarousel () {
      let Interval = 200
      if (!this.News_Attachment.Show) {
        this.News_Attachment.Show = true
        await this.sleep(Interval)
      } else {
        if (this.News_Carousel != null) {
          this.News_Carousel.trigger('destroy.owl.carousel')
        }
        this.News_Attachment.Show = false
        await this.sleep(Interval)
        this.News_Attachment.Show = true
        await this.sleep(Interval)
      }
      this.News_Carousel = $(this.$refs.News_Carousel).owlCarousel({
        dots: false, nav: true, autoWidth: true, margin: 18, navContainerClass: 'Items__Add-Nav', navClass: [ 'Items__Add-Nav_Btn Prev', 'Items__Add-Nav_Btn Next' ], navText: [ this.News_Carousel_Arrow, this.News_Carousel_Arrow ]
      })
      await this.sleep(Interval)
      this.News_Carousel.trigger('refresh.owl.carousel')
      this.News_Carousel.trigger('update.owl.carousel')
    },
    validatorNews (News) {
      const validatorNewsName = () => {
        const validObjectName = !Object.values(News.Title).every(value => ((value === null) ? true : (value.length === 0)))
        if (validObjectName && /^\s+/gm.exec(News.Title[News.Language.value]) !== null) {
          return false
        } else return validObjectName
      }
      this.NewsValidator.Title.value = validatorNewsName()
      this.NewsValidator.Text.value = !Object.values(News.Text).every(value => (value.length === 0 && typeof value.length !== 'undefined'))
      this.NewsValidator.Image.value = !(News.Image == null)
      this.NewsValidator.Preview_Image.value = !(News.Preview_Image == null)
      this.NewsValidator.Time.value = (this.News.PublishNow || this.News.DataTimeOfPublication !== null)
    }
  },
  watch: {
    News: {
      handler(News) {
        this.validatorNews(News)
      }, deep: true
    }
  },
  destroyed() {
    if (this.News_Carousel != null) {
      this.News_Carousel.trigger('destroy.owl.carousel')
      this.News_Carousel = null
    }
  },
  data: () => {
    return {
      News_Carousel: null,
      News_Carousel_Arrow: null,
      News_Attachment: {
        Items: [],
        State: 'Select-Category',
        Show: false
      },
      NewsValidator: {
        Title: { value: false, notify: 'Заполните поле "Заголовок новости"' },
        Image:  { value: false, notify: 'Заполните поле "Фотография новости"' },
        Preview_Image: { value: false, notify: 'Заполните поле "Обложка новости"' },
        Text:  { value: false, notify: 'Заполните поле "Текст новости"' },
        Time:  { value: false, notify: 'Заполните поле "Время публикации"' },
      },
      News: { // Массив для данных формы новостей
        Title: {}, // Заголовок
        Preview_Image: null, // Обложка новости
        Image: null, // Фотография новости
        PublishNow: false, // Опубликовать сейчас -- отправить вместо false - null
        DataTimeOfPublication: null, // Дата публикации
        AttachedGoods: [], // Прикреплённые товары
        Text: {}, // Текст новости
        Language: { label: 'RU', value: 'RU', icon: 'ru' } // Выбранный язык для редактирования
      },
      tinymce_options: {
        height: 350,
        menubar: false,
        language: 'ru',
        plugins: [
          'advlist autolink lists link image charmap',
          'searchreplace visualblocks code fullscreen',
          'print preview anchor insertdatetime media',
          'paste code help wordcount table'
        ],
        toolbar:
          'undo redo | formatselect | bold italic | \
          alignleft aligncenter alignright | \
          bullist numlist outdent indent | help'
      },
    }
  }
}
</script>