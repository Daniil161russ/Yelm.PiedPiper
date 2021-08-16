<template>
 <div class="chat__messages">
   <div class="chat__messages-header">
     <div class="chat__messages-header-room">
       <div class="chat__avatar-Yelm" v-if="room.client === 1"></div>
       <div class="chat__avatar" v-else><span>{{ room.client }}</span></div>
       <div class="chat__messages-roomname">{{ room.client === 1 ? 'Yelm' : room.device }}</div>
     </div>
   </div>
   <div class="chat__messages-wrapper" id="messages-wrapper">
     <div class="chat__messages-body">
       <div class="see-here"></div>
       <div class="chat__messages-box" v-for="(message, index) in room.messages" :key="index" v-if="room.messages.length">
         <Message :message="message" :room="room" @gallery="changeImage"/>
       </div>
       <div class="chat__messages-box" v-if="innerMessages.length" v-for="innerMessage in innerMessages">
         <Message :message="innerMessage" :room="room" @gallery="changeImage"/>
       </div>
     </div>
   </div>
   <div class="chat__messages-footer">
     <form class="chat__messages-input" @submit="submitMessage">
       <input type="file" ref="FileUploader" @change="onFileSelected" :style="{ display: 'none' }" accept="image/x-png,image/jpeg" :disabled="room.client === 1">
       <el-input v-model="input_message" :placeholder="room.client === 1 ? 'В этом чате отправка сообщений невозможна' : 'Введите сообщение'" class="chat-input" :disabled="room.client === 1">
         <v-icon name="PaperClip" color="secondary" fill="" slot="append" @click.native="$refs.FileUploader.click()" />
       </el-input>
       <button class="chat__messages-input-submit" type="submit" >
         <v-icon name="PaperPlaneSend" color="secondary" fill="" />
       </button>
     </form>
   </div>
   <LightGallery :images="gallery" :index="index" :disable-scroll="true" @close="index = null"/>
 </div>
</template>

<script>
import icon from '@/components/atoms/icon'
import button from '@/components/atoms/button'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: "messages",
  components: {
    Message: () => import("@/components/molecules/chat/message"),
    'v-icon': icon,
    'v-button': button,
  },

  props: ["innerWidth"],

  data: () => ({
    searchMessages: '',
    input_message: '',
    type: '',
    images: [],
    index: null,
    innerMessages: [],
    page: 1,
  }),

  computed: {
    ...mapGetters({
      userData: 'user/getUser',
      gallery: 'chat/getImages',
      room: 'chat/getRoom',
    }),
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'chat/setMessagesByRoom') {
        this.$forceUpdate()
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },

  mounted() {
    this.getUserData()
    this.setImages(this.room.messages)
    this.setVisitedRoom(this.room)

    this.socket = this.$nuxtSocket({
      name: 'chat',
      teardown: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      emitTimeout: 1000,
      query: {
        room_id: parseInt(this.room.id),
        token: this.$auth.user.chat.api_token,
        id: this.$auth.user.id,
      }
    });

    this.socket.on(`room.${this.room.id}`, (data) => {
      switch(data.type) {
        case 'connected':
          // console.log('Вошел в чат', this.room.id)
          break
        case 'disconnected':
          // console.log('Вышел из чата', this.room.id)
          break
        default: {
          this.innerMessages.push({
            message: data.message,
            images: data.images,
            items: data.items,
            type: data.type,
            from_whom: data.from_whom,
            time: this.$moment(data.created_at).format('hh:mm'),
            id: data.room_id
          })
          if(data.type !== 'message'){
            this.setSocketImages(this.innerMessages)
          }
          break;
        }
      }
    })

    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        if(this.room.next_page !== null) {
          this.page += 1
          this.getMessagesByPage({page: this.page, id: this.room.id})
        }
      }
    } , {rootMargin: "150px",});
    const messagesBody = document.querySelector(".see-here");
    observer.observe(messagesBody);
  },

  methods: {
    ...mapActions({
      getUserData: 'user/getUserData',
      getMessagesByPage: 'chat/getMessagesByPage'
    }),

    ...mapMutations({
      setImages: 'chat/setImages',
      setSocketImages: 'chat/setSocketImages',
      setVisitedRoom: 'chat/setVisitedRoom',
      setMessagesByRoom: 'chat/setMessagesByRoom',
    }),

    changeImage(payload) {
      this.gallery.map((image, index) => {
        if (image === payload){
          this.index = index
        }
      })
    },

    submitMessage(event) {
      event.preventDefault()
      event.stopPropagation()
      if (this.input_message.length) {
        this.socket.emit(`room.${this.room.id}`, {
          room_id: this.room.id,
          to_whom: this.room.client,
          message: this.input_message,
          from_whom: this.room.user,
          images: [],
          items: '{}',
          platform: this.userData.platform,
          type: 'message'
        });
      }
      this.input_message = ''
    },

   onFileSelected(event) {
     const file = event.target.files[0]
     this.createBase64(file)
   },

    createBase64(file) {
      const reader = new FileReader()
      reader.onload = e => {
        let base64result = e.target.result.split(',')[1];
        this.images.push({image: base64result})
        this.uploadImage()
      }
      reader.readAsDataURL(file)
    },

    uploadImage() {
      this.socket.emit(`room.${this.room.id}`, {
        room_id: this.room.id,
        from_whom: this.room.user,
        to_whom: this.room.client,
        message: this.input_message,
        images: JSON.stringify(this.images),
        items: '{}',
        platform: this.userData.platform,
        type: 'images'
      });
      this.images = []
    },
  },
}
</script>

