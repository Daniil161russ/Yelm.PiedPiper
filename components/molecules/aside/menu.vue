<template>
  <nav class="aside__nav">
    <ul class="aside__navigation">
      <li class="aside__navigation-item">
        <NuxtLink to="/" prefetch>
          <svg class="svg-sprite svg-sprite_aside" v-if="$auth.user.first_login === 'true'">
            <use xlink:href="#icon-welcome"></use>
          </svg>
          <span v-if="$auth.user.first_login === 'true'">Welcome</span>
          <svg v-if="$auth.user.first_login === 'false'" class="svg-sprite svg-sprite_aside">
            <use xlink:href="#icon-analytics"></use>
          </svg>
          <span v-if="$auth.user.first_login === 'false'">Аналитика</span>
        </NuxtLink>
      </li>
      <li class="aside__navigation-item">
        <NuxtLink to="/news" prefetch>
          <svg class="svg-sprite svg-sprite_aside">
            <use xlink:href="#icon-news"></use>
          </svg>
          <span>Новости</span>
        </NuxtLink>
      </li>
      <li class="aside__navigation-item">
        <NuxtLink to="/items" prefetch>
          <svg class="svg-sprite svg-sprite_aside">
            <use xlink:href="#icon-items"></use>
          </svg>
          <span>Товары</span>
        </NuxtLink>
      </li>
      <li class="aside__navigation-item">
        <NuxtLink to="/chat" prefetch>
          <svg class="svg-sprite svg-sprite_aside">
            <use xlink:href="#icon-chat"></use>
          </svg>
          <span>Чат</span>
        </NuxtLink>
      </li>
      <li class="aside__navigation-item">
        <NuxtLink to="/orders" prefetch>
          <svg class="svg-sprite svg-sprite_aside">
            <use xlink:href="#icon-orders"></use>
          </svg>
          <span>Заказы</span>
        </NuxtLink>
      </li>
      <!-- <li class="aside__navigation-item">
        <NuxtLink to="/delivery" prefetch>
          <svg class="svg-sprite svg-sprite_aside">
            <use xlink:href="#icon-delivery"></use>
          </svg>
          <span>Доставка</span>
        </NuxtLink>
      </li> -->
      <li class="aside__navigation-item">
        <NuxtLink to="/publication" prefetch>
          <svg class="svg-sprite svg-sprite_aside">
            <use xlink:href="#icon-publication"></use>
          </svg>
          <span>Публикация</span>
        </NuxtLink>
      </li>
      <li class="aside__navigation-item">
        <NuxtLink to="/push" prefetch>
          <svg class="svg-sprite svg-sprite_aside">
            <use xlink:href="#icon-push"></use>
          </svg>
          <span>Уведомления</span>
        </NuxtLink>
      </li>
      <!-- <li class="aside__navigation-item">
        <NuxtLink to="/services" prefetch>
          <svg class="svg-sprite svg-sprite_aside">
            <use xlink:href="#icon-services"></use>
          </svg>
          <span>Услуги</span>
        </NuxtLink>
      </li> -->
      <li v-if="$auth.user.permission_id > 1" class="aside__navigation-item">
        <NuxtLink to="/admin" prefetch>
          <svg class="svg-sprite svg-sprite_admin">
            <use xlink:href="#icon-admin"></use>
          </svg>
          <span>Администратор</span>
        </NuxtLink>
      </li>
      <li class="aside__preview-item" @click="setVisible">
        <div class="aside__preview-wrapper">
          <svg class="svg-sprite svg-sprite_settings">
            <use xlink:href="#icon-smartphone"></use>
          </svg>
          <span>Предпросмотр</span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({
      setVisible: "preview/setVisible"
    }),
  }
}
</script>
