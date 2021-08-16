<template>
	<div class="design">
		<div class="design__content">
			<h2 class="design__title">Хотите отличный дизайн?</h2>
	  	<span class="design__description">
				Наши дизайнеры сделают конфетку из вашего приложения,
				для этого вам стоит только заполнить бриф, после чего с вами свяжется
				менеджер и обсудит любые вопросы
			</span>
			<v-button round="" color="gradient-BlueToPurpleToRed" native="button" left="">Заполнить бриф</v-button>
		</div>
		<div class="design__carousel">
			<VueSlickCarousel v-bind="settings">
				<div class="design__example">
					<img src="~/assets/images/services/design/phone/phone__example1.png" alt="phone" class="design__img">
				</div>
				<div class="design__example">
					<img src="~/assets/images/services/design/phone/phone__example2.png" alt="phone" class="design__img">
				</div>
				<div class="design__example">
					<img src="~/assets/images/services/design/phone/phone__example3.png" alt="phone" class="design__img">
				</div>
				<div class="design__example">
					<img src="~/assets/images/services/design/phone/phone__example4.png" alt="phone" class="design__img">
				</div>
				<div class="design__example">
					<img src="~/assets/images/services/design/phone/phone__example5.png" alt="phone" class="design__img">
				</div>
			</VueSlickCarousel>
		</div>
	</div>
</template>

<script>
import button from '@/components/atoms/button'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
	name: 'design',
	components: {
    'v-button': button,
		VueSlickCarousel
  },
	data: () => ({
		settings:{
			arrows: false,
			dots: false,
			centerMode: true,
			centerPadding: '150px',
			focusOnSelect: true,
			autoplay: true,
			autoplaySpeed: 5000,
			variableWidth: false,
			accessibility: false,
  		infinite: false,
		}
	})
}
</script>
