<template>
  <div class="preview__cart cart">
    <div class="cart__header">
      <div class="cart__header_left">
        <div class="preview__main-icon" :style="`background: #${getUser.settings.theme}`" @click="setVisibleCart">
          <svg class="svg-sprite">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </div>
        <div class="cart__header-title">Корзина</div>
      </div>
      <span class="cart__header-clear" @click="emptyArrayOfCartItems">Очистить</span>
    </div>
    <div class="cart__body">
      <div class="cart__body_empty" v-if="cartIsEmpty && !getArrayOfCartItems.length">
        <div class="cart__empty-message">
          <p>Тут пусто :с</p>
          <p>Для поиска и выбора нужных Вам товаров перейдите в каталог</p>
        </div>
      </div>
      <div class="cart__body_populated" v-if="getArrayOfCartItems.length">
        <div class="cart__item" v-for="item of getArrayOfCartItems" :key="item.id">
          <div class="cart__item-image" :style="`background: url(${item.images[0]}) no-repeat center; background-size: cover;`"></div>
          <div class="cart__item-characteristics">
            <span class="cart__item-name">{{ item.name }}</span>
            <span class="cart__item-price">
              {{ item.price  }}
             <svg class="svg-sprite badge__currency">
               <use xlink:href="#icon-rub"></use>
             </svg>
            </span>
            <div class="cart__item-amount">
              <div class="preview__icon-amount" :style="`background: #${getUser.settings.theme}`" @click="removeItemFromArrayOfCartItems(item.id)">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-minus"></use>
                </svg>
              </div>
              <span>{{ item.amount }}</span>
              <div class="preview__icon-amount" :style="`background: #${getUser.settings.theme}`" @click="setArrayOfCartItems(item); setTotalCartPrice(parseInt(item.price))">
                <svg class="svg-sprite">
                  <use xlink:href="#icon-plus"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="cart__item-right" :style="`color: #${getUser.settings.theme}`">
            <span class="cart__item-price">
              {{ item.price  }}
             <svg class="svg-sprite" :style="`fill: #${getUser.settings.theme}`">
               <use xlink:href="#icon-rub"></use>
             </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="cart__footer">
      <div class="cart__footer-left" v-if="getArrayOfCartItems.length">
        <span :style="`color: #${getUser.settings.theme}`">{{ getTotalCartPrice }}</span>
        <svg class="svg-sprite" :style="`fill: #${getUser.settings.theme}`">
          <use xlink:href="#icon-rub"></use>
        </svg>
      </div>
      <div class="cart__footer-actions">
        <button class="preview__btn" :style="!getArrayOfCartItems.length ? 'background: #BDBDBD' : `background: #${getUser.settings.theme}`">Оформить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: "cart",
  props: ['getUser'],

  data: () => ({
    cartIsEmpty: true,
    listOfItems: [],
  }),

  computed: {
    ...mapGetters({
      getArrayOfCartItems: 'preview/getArrayOfCartItems',
      getTotalCartPrice: 'preview/getTotalCartPrice'
    })
  },

  methods: {
    ...mapMutations({
      emptyArrayOfCartItems: 'preview/emptyArrayOfCartItems',
      removeItemFromArrayOfCartItems: 'preview/removeItemFromArrayOfCartItems',
      setArrayOfCartItems: 'preview/setArrayOfCartItems',
      setTotalCartPrice: 'preview/setTotalCartPrice',
    }),

    setVisibleCart() {
      this.$emit('setVisibleCart')
    },
  },
}
</script>

