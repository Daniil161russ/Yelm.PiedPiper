<template>
	<div class="filling">
    <div class="filling__content">
      <h2 class="filling__title">Срочно нужно приложение, но нет времени заполнять самому?</h2>
      <span class="filling__description">
        Наши дизайнеры сделают конфетку из вашего приложения,
				для этого вам стоит только заполнить бриф, после чего с вами свяжется
				менеджер и обсудит любые вопросы
      </span>
      <v-button round="" color="gradient-BlueToPurpleToRed" native="button" left="">Заполнить бриф</v-button>
    </div>
	</div>
</template>

<script>
import button from '@/components/atoms/button'

export default {
	name: 'filling',
	components: {
    'v-button': button,
  },
}
</script>
