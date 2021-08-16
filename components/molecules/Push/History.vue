<template>
  <div class="Push__History">
    <div class="Row Row-Column">
      <div class="Header">
        <div class="Header__Label">Сегодня, 1 февраля 2021</div>
        <div class="Header__Label-Right">Отправлено 5 уведомлений</div>
      </div>
      <div class="Body">
        <div class="Row" v-for="i in 5" :key="i">
          <div class="Box">
            <div class="Header">
              <div class="App">
                <div class="App__Icon" />
                <div class="App__Name">Yelm</div>
              </div>
              <div class="Text">15:00</div>
            </div>
            <div class="Content">
              <div class="Title">Notification Title</div>
              <div class="Description">Notification text would be placed right here. This is where notification text would be placed.</div>
            </div>
          </div>
          <v-button plain="" circle="" icon="" native="button"><v-icon name="refresh" fill="" color="primary" slot="icon" /></v-button>
        </div>
      </div>
    </div>
    <div class="Row Row-Column">
      <div class="Header">
        <div class="Header__Label">28 января 2021</div>
        <div class="Header__Label-Right">Отправлено 5 уведомлений</div>
      </div>
      <div class="Body">
        <div class="Row" v-for="i in 5" :key="i">
          <div class="Box">
            <div class="Header">
              <div class="App">
                <div class="App__Icon" />
                <div class="App__Name">Yelm</div>
              </div>
              <div class="Text">15:00</div>
            </div>
            <div class="Content">
              <div class="Title">Notification Title</div>
              <div class="Description">Notification text would be placed right here. This is where notification text would be placed.</div>
            </div>
          </div>
          <v-button plain="" circle="" icon="" native="button"><v-icon name="refresh" fill="" color="primary" slot="icon" /></v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/atoms/button'
import Icon from '@/components/atoms/icon'
export default {
  name: "History",
  components: {
    'v-button': Button,
    'v-icon': Icon
  }
}
</script>

<style scoped>

</style>
