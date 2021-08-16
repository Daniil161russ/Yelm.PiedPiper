<template>
  <el-dropdown class="Shops__Input" trigger="click" :append-to-body="true" placement="bottom-start" @command="AddressSelect">
    <el-input :value="value" @input="inputAddress" :class="{ 'Shops__Input-Loading': loading }" slot="default">
      <v-icon color="dark" fill="" name="mapPin"  slot="prepend" v-if="!loading && showIcon" />
      <v-icon color="dark" fill="" name="mapLoading"  slot="prepend" v-if="loading && showIcon" />
    </el-input>
    <el-dropdown-menu slot="dropdown" :visible-arrow="false" class="Shops__Input-Menu">
      <el-dropdown-item v-for="(address, address_id) in addressList" :key="address_id" :command="address">{{ address }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Icon from '@/components/atoms/icon'
export default {
  name: "Input",
  components: {
    'v-icon': Icon
  },
  methods: {
    async inputAddress ($event) {
      this.$emit('input', $event)
      this.addressList = []
      if ($event.length) {
        const geo_res = await this.ymaps.geocode($event)
        const geo_length = await geo_res.geoObjects.getLength()
        for (let index = 0; index < geo_length; index++) {
          let address = await geo_res.geoObjects.get(index).getAddressLine()
          if (this.value !== address) {
            this.addressList.push(address)
          }
        }
      }
    },
    async AddressSelect (address) {
      this.$emit('input', address)
      const geo_res = await this.ymaps.geocode(address)
      const geo_object = await geo_res.geoObjects.get(0)
      const geo_coord = await geo_object.geometry.getCoordinates()
      const geo_zoom = await this.ymaps.util.bounds.getCenterAndZoom(geo_object.properties.get('boundedBy'), [ parseInt(this.$parent.$refs.ymap.$el.style.width), parseInt(this.$parent.$refs.ymap.$el.style.height) ]).zoom
      await this.ymap.setCenter(geo_coord, geo_zoom, { checkZoomRange: true, duration: 500 })
    }
  },
  watch: {
    loading: {
      handler(loading) {
        this.showIcon = false
        this.$nextTick(() => (this.showIcon = true))
      }, deep: true
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    ymaps: {
      type: Object,
      required: true
    },
    ymap: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      showIcon: true,
      addressList: []
    }
  }
}
</script>

<style scoped>

</style>
