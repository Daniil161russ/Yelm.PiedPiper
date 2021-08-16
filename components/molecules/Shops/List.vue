<template>
  <div class="Shops__List">
    <div class="Shops__List-Row" v-for="(item, item_id) in value" :key="item_id">
      <v-img :link="item.image" :radius="10" :width="48" :height="48" size="cover" class="Shops__List-Image" v-if="typeof item.image !== 'undefined'"
             @click="$emit('click', item.id)" />
      <div class="Shops__List-Label" @click="$emit('click', item.id)">{{ item.label }}</div>
      <div class="Shops__List-Actions">
        <v-button plain="" native="button" circle="" icon="" :to="{ name: 'polygons-id', params: { id: item.id } }" v-if="typeof item.shop !== 'undefined'">
          <v-icon slot="icon" color="primary" name="Anten" fill=""  />
        </v-button>
        <v-button plain="" native="button" circle="" icon="" @click="$emit('edit', item.data)">
          <v-icon slot="icon" color="success" name="Edit" fill=""  />
        </v-button>
        <v-button plain="" native="button" circle="" icon="" @click="$emit('delete', { id: item.id, name: item.label })">
          <v-icon slot="icon" color="danger" name="trash" fill=""  />
        </v-button>
      </div>
      <div class="shops__list-instructions">

      </div>
    </div>
  </div>
</template>

<script>
import Image from '@/components/atoms/Image'
import Button from '@/components/atoms/button'
import Icon from '@/components/atoms/icon'
export default {
  name: "List",
  components: {
    'v-img': Image,
    'v-button': Button,
    'v-icon': Icon
  },
  created() {
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
