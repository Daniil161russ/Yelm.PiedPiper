<template>
  <div class="guide__wrapper">
    <div class="guide" v-for="guide in guides" v-if="guide.route === $nuxt.$route.name" :class="`guide_${guide.modify}`">
      <h3 class="guide__title">{{ guide.title }}</h3>
      <p class="guide__text">{{ guide.text }}</p>
      <div class="guide__actions">
        <button data-text="Далее" class="button button__main button__small" @click="getNext(guide.next)">Далее</button>
        <p @click="setShowGuide(false)">Пропустить</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "guide",

  data: () => ({
    guides: [
      { title: 'Аналитика',
        text: 'В этой вкладке вы можете отслеживать количество установок вашего приложения, следить за действиями аудитории, выявлять наиболее популярные товары и т.д. Аналитика станет доступна после выпуска приложения',
        route: 'index',
        next: 'news',
        modify: 'analytics'
      },
      { title: 'Новости',
        text: 'Здесь вы можете размещать новости и акции, в них же можно прикреплять уже существующие товары или ссылки на сторонний ресурс (видео на ютуб, ссылку на Instagram профиль,  онлайн калькулятор).',
        route: 'news',
        next: 'items',
        modify: 'news'
      },
      { title: 'Товары',
        text: 'Здесь вы можете разместить ваши товары или услуги',
        route: 'items',
        next: 'chat',
        modify: 'items'
      },
      { title: 'Чат с клиентами',
        text: 'Помимо простого общения в чате, вы можете выслать клиенту фото товара, заглянуть к нему в корзину и замотивировать его к покупке, а также в чате отображаются все действия по заказам и оплатам.',
        route: 'chat',
        next: 'orders',
        modify: 'chat'
      },
      { title: 'Заказы',
        text: 'Все заказы от клиентов попадают в этот пункт меню. В нем вы видите все необходимые сведения: что заказал клиент, его контактные данные и способ оплаты товара или услуги',
        route: 'orders',
        next: 'publication',
        modify: 'orders'
      },
      { title: 'Публикация',
        text: 'После заполнения приложения контентом его необходимо отправить его на публикацию в App Store и Play Market, на этой странице вы можете подать заявку и следить за всеми этапами публикации',
        route: 'publication',
        next: 'push',
        modify: 'publication'
      },
      { title: 'Уведомления',
        text: 'Здесь вы можете настроить и отправить Push - уведомления для всех пользователей вашего приложения',
        route: 'push',
        modify: 'push',
        next: '',
      }
    ]
  }),

  methods: {
    ...mapMutations({
      setShowGuide: 'instructions/setShowGuide'
    }),

    getNext(route) {
      if (route === '') {
        this.setShowGuide(false)
      }
      this.$router.push(route)
    },
  }
}
</script>
