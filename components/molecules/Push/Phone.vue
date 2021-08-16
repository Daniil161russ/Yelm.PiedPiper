<template>
  <div class="Phone">
    <div class="Phone__Notification" v-if="Title.length || Text.length">
      <div class="Phone__Notification-Header">
        <div class="App">
          <img class="App__Icon" :src="$auth.user.image"/>
          <div class="App__Name" >{{ $auth.user.username }}</div>
        </div>
        <div class="Phone__Label-Right">Сейчас</div>
      </div>
      <div class="Phone__Notification-Content">
        <div class="Phone__Notification-Title" v-if="Title.length">{{ Title }}</div>
        <div class="Phone__Notification-Description" v-if="Text.length" v-html="Text"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Phone",
  created() {
    this.updateData (this.data)
  },
  watch: {
    data: {
      handler (data) {
        this.updateData(data)
      }, deep: true
    }
  },
  methods: {
    updateData (data) {
      if (typeof data.Title[data.Language.value] !== 'undefined') {
        this.Title = data.Title[data.Language.value]
      }
      if (typeof data.Text[data.Language.value] !== 'undefined') {
        this.Text = data.Text[data.Language.value]
      }
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    Title: '',
    Text: ''
  })
}
</script>

<style scoped>

</style>
