<template>
  <div class="message" :class="{ 'message__image' : message.type === 'images', 'In' : room.client !== message.from_whom, 'Out' : room.client === message.from_whom}">
    <span v-if="message.type === 'message'">{{ message.message  }}</span>
    <img v-else-if="message.type === 'images'" v-lazy="message.images[0]" @click="$emit('gallery', message.images[0])"/>
    <span v-else-if="message.type === 'items'">{{ 'Товар id - ' + message.items.id }} <br/> {{'Название - ' + message.items.name}}</span>
    <span v-else-if="message.type === 'order'">{{ message.message.split('Ч')[0] }}</span>
    <span class="message__time-stamp">{{ message.time }}</span>
  </div>
</template>

<script>

export default {
  name: "message",
  props: ['message', 'room'],
}
</script>
