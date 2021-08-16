<template>
  <div class="preview__selected-item selected-item">
    <div class="selected-item__header" :style="`background: url(${item.images[0]}) center no-repeat; background-size: cover;`">
      <div class="preview__main-icon" :style="`background: #${getUser.settings.theme}`" @click="setVisibleItem">
        <svg class="svg-sprite">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </div>
      <div class="preview__main-icon icon-share" :style="`background: #${getUser.settings.theme}`">
        <svg class="svg-sprite">
          <use xlink:href="#icon-share"></use>
        </svg>
      </div>
    </div>
    <div class="selected-item__body">
      <div class="selected-item__title" :style="`color: #${getUser.settings.theme}`">{{ item.name }}</div>
      <div class="selected-item__stats">
        <div class="selected-item__discount">
          <div class="preview__main-icon" :style="`background: #${getUser.settings.theme}`">
            <svg class="svg-sprite">
              <use xlink:href="#icon-percent"></use>
            </svg>
          </div>
          <span>
            Скидка {{ item.discount }} %
          </span>
        </div>
        <div class="selected-item__rating"></div>
      </div>
      <p class="selected-item__description">
        {{ item.description }}
      </p>
      <h3>Характеристики</h3>
      <ul class="selected-item__specification" v-if="item.specification.length">
        <li class="selected-item__specification-item" v-for="specification of item.specification">
          <span>{{ specification.name }}</span>
          <span>{{ specification.value }}</span>
        </li>
      </ul>
    </div>
    <div class="selected-item__footer">
      <div class="selected-item__footer-props">
        <span>{{ item.name }}</span>
        <span>
          {{ item.price }}
          <svg class="svg-sprite">
            <use xlink:href="#icon-rub"></use>
          </svg>
        </span>
      </div>
      <div class="selected-item__footer-actions">
<!--        <div class="selected-item__footer-amount">-->
<!--          <div class="preview__icon-amount" :style="`background: #${getUser.settings.theme}`">-->
<!--            <svg class="svg-sprite">-->
<!--              <use xlink:href="#icon-minus"></use>-->
<!--            </svg>-->
<!--          </div>-->
<!--          <span>1</span>-->
<!--          <div class="preview__icon-amount" :style="`background: #${getUser.settings.theme}`">-->
<!--            <svg class="svg-sprite">-->
<!--              <use xlink:href="#icon-plus"></use>-->
<!--            </svg>-->
<!--          </div>-->
<!--        </div>-->
        <button class="preview__btn" :style="`background: #${getUser.settings.theme}`" @click="setArrayOfCartItems(item);setTotalCartPrice(parseInt(item.price))">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "item",

  props: ['getUser', 'item' ],

  methods: {
    ...mapMutations({
      setTotalCartPrice: 'preview/setTotalCartPrice',
      setArrayOfCartItems: 'preview/setArrayOfCartItems',
    }),

    setVisibleItem() {
      this.$emit('setVisibleItem')
    }
  }
}
</script>

