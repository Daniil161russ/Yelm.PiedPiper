export const state = () => ({
  rooms: [],
  images: [],
  room: {
    client: 1,
    current_page: 1,
    device: '',
    id: '',
    next_page: null,
    messages: [],
    user: '',
  },
  currentRoom: null,
  currentUser: null,
  loading: false,
})

export const mutations = {
  setRoom (state, payload) {
    state.room = payload
  },

  setCurrentUser (state, payload) {
    state.currentUser = payload
  },

  setCurrentRoom(state, payload) {
    state.currentRoom = payload
  },

  emptyMessagesByRoom (state) {
    state.room.messages = []
  },

  emptyRooms (state) {
    state.rooms = []
  },

  updateLoading (state, payload) {
    state.loading = payload
  },

  setImages (state, payload) {
    if(state.images.length) {
      state.images = []
    }
    if(payload) {
      payload.map((message) => {
        if (message.images !== null) {
          state.images.push(message.images[0])
        }
      })
    }
  },

  setVisitedRoom(state, payload) {
    state.rooms.map(room => {
      if (room.id === payload.id) {
        room.visited = true
      }
    })
  },

  setSocketImages (state, payload) {
    if(payload) {
      payload.map(image => {
        if (image.type === 'images') {
          state.images.push(image.images[0])
        }
      })
    }
  },

  setSocketDialogs(state, payload) {
   if(state.rooms.length) {
     state.rooms.forEach(room => {
       if(room.id === payload.room_id) {
         room.messages.push(payload.message)
         room.time = this.$moment(payload.updated_at).add(30, 's').fromNow()
         room.type = payload.type
         room.notification = state.currentRoom !== payload.room_id ? (payload.from_whom !== state.currentUser) : false
         room.visited = false
       }
     })
   }
  },

  setRooms (state, payload) {
    for (const newRoom of payload) {
      if(newRoom.message !== null) {
        const message_last = newRoom.message
        let device = ''
        if (newRoom.client_info) {
          device = newRoom.client_info.model === 'iPhone' ? newRoom.client_info.safeDescription : `${newRoom.client_info.brand} - ${newRoom.client_info.model}`
        } else {
          device = 'Устройство не определенно'
        }
        state.rooms.push({
          id: newRoom.id,
          time: this.$moment(message_last.updated_at).add(30, 's').fromNow(),
          text: message_last.type === 'images' ? 'Изображение' : message_last.type === 'item' ? 'Товары' : message_last.message,
          client: newRoom.client,
          device: device,
          user: newRoom.user,
          messages: []
        })
        state.room = {
          id: state.rooms[0].id,
          client: state.rooms[0].client,
          user: state.rooms[0].user,
          device: state.rooms[0].device,
          messages: []
        }
      }
    }
  },

  setRoomsOrder(state, payload) {
    let roomIndex = state.rooms.findIndex((room) => room.id === payload)
    let roomCurrent = state.rooms.filter(room => {
      return room.id === payload
    })
    state.rooms.splice(roomIndex, 1)
    state.rooms.unshift(roomCurrent[0])
  },

 setMessagesByRoom(state, payload) {
    state.room.current_page = payload.current_page
    state.room.next_page = payload.next_page_url
   if(state.room.id === payload.id && payload.client === 1) {
     state.room.messages.push(payload.message)
   }
   else {
     if(state.room.current_page === 1) {
       payload.data.map(message => {
         state.room.messages.push({
           images: message.type === 'images' ? message.images : null,
           items: message.type === 'items' ? message.items : null,
           message: message.type === 'message' || 'order' ? message.message : null,
           from_whom: message.from_whom,
           type: message.type,
           time: this.$moment(message.updated_at).format('HH:mm')
         })
       })
       state.room.messages.reverse()
     } else {
       payload.data.map(message => {
         state.room.messages.unshift({
           images: message.type === 'images' ? message.images : null,
           items: message.type === 'items' ? message.items : null,
           message: message.type === 'message' || 'order' ? message.message : null,
           from_whom: message.from_whom,
           type: message.type,
           time: this.$moment(message.updated_at).format('HH:mm')
         })
       })
     }
   }
  },
}

export const getters = {
  getRooms: state => {
    return state.rooms
  },

  getRoom: state => {
    return state.room
  },

  getCurrentRoom: state => {
    return state.currentRoom
  },

  getImages: state => {
    return state.images
  },

  getCurrentUser: state => {
    return state.currentUser
  },

  getLoading: state => {
    return state.loading
  }
}

export const actions = {
  async getAllRooms({ commit, dispatch }) {
    try {
      let rooms = await this.$axios.$get('/rooms')
      if (rooms.length) {
        await commit('emptyRooms')
        await commit('setRooms', rooms.reverse().sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)))
        await commit('setCurrentUser', rooms[0].user)
        await dispatch('getMessagesByRoom', {id: rooms[0].id})
      }
    } catch (e) {
      console.log(e)
    }
  },

  async getMessagesByRoom({ state, commit }, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.$axios.$get(`/messages?page=${data.page ? data.page : null}`, {
          params: {
            platform: this.$auth.user.platform,
            room_id: data.id,
          }
        })
        if (state.room.id === data.id) {
          commit('emptyMessagesByRoom')
          commit('setMessagesByRoom', response)
          commit('setCurrentRoom', data.id)
        }
        resolve(response)
      } catch(e) {
        reject(e)
      }
    })
  },

  async getMessagesByPage({commit}, data) {
    await this.$axios.$get(`/messages?page=${data.page}`, {
      params: {
        platform: this.$auth.user.platform,
        room_id: data.id,
      }
    }).then((resp) => commit('setMessagesByRoom', resp))
  }
}
