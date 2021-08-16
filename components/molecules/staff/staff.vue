<template>
  <div class="grid__aside-container">
    <div class="grid__aside-header">
      <h1 class="h1">Сотрудники</h1>
      <v-button @click="setSelectedWindow('AddStaff')" color="primary" plain="" circle="" icon=""><v-icon slot="icon" name="Plus" /></v-button>
    </div>
    <div class="grid__aside-body">
      <div class="staff__containers">
        <div class="staff__block" v-for="(user, index) in staff" :key="index">
          <div class="staff__information">
            <img class="staff__photo" :src="user.data.photo" alt="Фотография сотрудника" loading="lazy">
            <h3 class="h3">{{ user.data.first_name }} {{ user.data.last_name }}</h3>
          </div>
          <el-popover class="logistics-user-actions" :width="160" trigger="click" :visible-arrow="false" placement="bottom-end" popper-class="el-popover__buttons" ref="logisticPopover">
            <v-button color="primary" plain="" circle="" icon="" slot="reference">
              <template slot="icon"><v-icon name="More" color="primary" fill="" /></template>
            </v-button>
            <template slot="default">
              <ul class="popover">
                <li class="popover__item">
                  <button @click="setSelectedStaff(`${user.id}`); setSelectedWindow('EditStaff')" class="popover__item-btn">Редактировать</button>
                </li>
                <li class="popover__item">
                  <button @click="remove(`${user.id}`)" class="popover__item-btn popover__item-btn_delete">Удалить</button>
                </li>
              </ul>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Atoms
import Button from '@/components/atoms/button'
import Icon from '@/components/atoms/icon'

//Store
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    'v-icon': Icon,
    'v-button': Button,
  },
  data: () => ({
    staff: {}
  }),
  async created() {
    if (this.$store.dispatch('staff/empty')) await this.$store.dispatch('staff/getAll', this.$auth.user.platform)
    this.staff = JSON.parse(JSON.stringify(this.personal))
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'staff/updateStaff') this.staff = JSON.parse(JSON.stringify(this.personal))
    })
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  computed: {
    ...mapGetters({
      personal: 'staff/getStaff',
    })
  },
  methods: {
    ...mapMutations({
      setSelectedWindow: 'staff/setSelectedWindow',
      setSelectedStaff: 'staff/setSelectedStaff'
    }),
    ...mapActions({
      remove: 'staff/remove'
    })
  }
}
</script>
