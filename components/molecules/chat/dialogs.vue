<template>
  <div class="chat__dialogs">
    <div class="chat__dialogs-header">
      <div class="text text__dark text__large text__medium">Чат с клиентами</div>
    </div>
    <div class="chat__dialogs-body">
      <div class="chat__dialogs-room room" :class="{'room_active' : room.id === CurrentRoom}" v-for="(room, index) in Rooms" :key="index" @click="$emit('change-room', { id: room.id, client: room.client, device: room.device, user: room.user, visited: room.visited })">
        <div class="chat__avatar-Yelm" v-if="room.client === 1"></div>
        <div class="chat__avatar" v-else><span>{{ room.client }}</span></div>
        <div class="room__name"><span>{{ room.client === 1 ?  'Yelm' : room.device }}</span>
         <span>{{ room.type === 'message' ? (room.messages.length ? room.messages[room.messages.length-1] : room.text) : room.type === 'images' ? 'Изображение' : room.text}}</span>
        </div>
        <div class="room__time">
          <span>
            {{ room.time }}
          </span>
        </div>
        <div class="room__notification">
          <span v-for="(notification, index) of newMessageAlert" :key="index" v-if="notification.id === room.id">
            {{ !room.visited && room.notification  ?  'Новое сообщение' : ''}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/icon'
import { mapGetters } from 'vuex'

export default {
  name: "dialogs",

  components: {
    'v-icon': Icon,
  },

  data: () => ({
    search: '',
    dialog: '',
    newMessageAlert: [],
  }),

  computed: {
    ...mapGetters({
      Rooms: 'chat/getRooms',
      room: 'chat/getRoom',
      CurrentRoom: 'chat/getCurrentRoom',
      CurrentUser: 'chat/getCurrentUser',
    }),
  },

  methods: {
    goToRoom(index, data) {
      this.$emit('change-room', index, data)
    },
  },

  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'chat/setSocketDialogs') {
        state.chat.rooms.filter((room) => {
          if(room.notification) {
            if(this.newMessageAlert.length) {
              if(this.newMessageAlert.some(notifi=> {
                if(notifi.id === room.id ) {
                 return true
                }
              })) {
                return true
              }
            }
            this.newMessageAlert.push({
              id: room.id,
              notification: true
            })
          }
        })
      }
    })
  },

  destroyed() {
    this.unsubscribe()
  }
}
</script>

