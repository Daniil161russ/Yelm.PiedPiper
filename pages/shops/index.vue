<template>
  <div class="Shops">
    <div class="Shops__Header">
      <v-shops-label label="Список магазинов" />
      <v-shops-input v-model="Shops.Geometry.address" :loading="Shops.Geometry.loading" v-if="(Shops.State === 'Add' || Shops.State === 'Edit')" :ymaps="ymaps" :ymap="ymap"/>
      <v-shops-add v-model="Shops.Add_State" @change="changeAddState" />
    </div>
    <v-shops-list v-if="Shops.State === 'View'" v-model="list" @click="clickShop" @delete="deleteShop" @edit="editShop" />
    <component :is="Shops.AddShop.Component" v-if="Shops.AddShop.Component != null" @hide="addShopClose" @complete="addShopComplete" :address="Shops.Geometry.address" :coords="Shops.Geometry.coords" :city="Shops.Geometry.city" />
    <component :is="Shops.EditShop.Component" v-if="Shops.EditShop.Component != null" @hide="editShopClose" @complete="editShopComplete" :address="Shops.Geometry.address" :coords="Shops.Geometry.coords" :city="Shops.Geometry.city" :shop="Shops.EditShop.Shop" />
    <component :is="Shops.DeleteShop.Component" v-if="Shops.DeleteShop.Component != null" :id="Shops.DeleteShop.ID" :name="Shops.DeleteShop.Name" @hide="deleteShopClose" />
    <div class="Shops__YMap-Marker" v-if="Shops.State === 'Add' || Shops.State === 'Edit'">
      <v-button class="Shops__YMap-Marker_Add" v-if="Shops.Geometry.city.length && Shops.State === 'Add'" :class="{ 'Active': Shops.AddShop.Button }" native="" plain="" round="" color="primary" size="small" @click="addShop">Добавить магазин</v-button>
      <v-button class="Shops__YMap-Marker_Add" v-if="Shops.Geometry.city.length && Shops.State === 'Edit'" :class="{ 'Active': Shops.AddShop.Button }" native="" plain="" round="" color="primary" size="small" @click="editShopCall">Изменить магазин</v-button>
      <div class="Shops__YMap-Marker_Inner" :class="{ 'Animated': Shops.Geometry.iconUp }" />
    </div>
    <div class="Shops__YMap" :class="{ 'Shops__YMap-Fade': (!show_ymap) }">
      <client-only>
        <yandex-map ref="ymap" :zoom="map.zoom" :coords="map.coords" :bounds="map.bounds" :controls="map.controls" @map-was-initialized="mapInit" :options="{ suppressMapOpenBlock: true }" >
          <ymap-marker v-for="mark in markers"
                       :key="mark.id"
                       :coords="[ mark.coords[0], mark.coords[1] ]"
                       :marker-id="'editable_'+mark.id"
                       :options="{ preset: mark.preset, draggable: false }"
                       :properties="{ iconCaption: mark.shop.Name, balloonContentBody: '' }" />
        </yandex-map>
      </client-only>
    </div>
  </div>
</template>

<script>
import List from '@/components/molecules/Shops/List'
import Label from '@/components/molecules/Shops/Label'
import Add from '@/components/molecules/Shops/ActionAdd'
import Input from '@/components/molecules/Shops/Input'
import Icon from '@/components/atoms/icon'
import Button from '@/components/atoms/button'
import { mapGetters, mapActions } from "vuex";


export default {
  name: "index",
  components: {
    'v-shops-list': List,
    'v-shops-label': Label,
    'v-shops-add': Add,
    'v-shops-input': Input,
    'v-icon': Icon,
    'v-button': Button
  },
  computed: {
    ...mapGetters({
      shops: 'shops/getShops'
    }),
  },
  data: () => ({
    ymap: null,
    ymaps: null,
    map: {coords: [55.749552744318315, 37.62173055468749], zoom: 8, bounds: [[ 55.50090388956289, 37.18227742968749 ], [ 55.99662016956414, 38.06118367968748 ]], controls: ['zoomControl'],},
    markers: [],
    show_ymap: false,
    onResizeFunction: null,
    Shops: {
      Add_State: 'View',
      State: 'View',
      AddShop: { Button: false, Timer: null, Component: null },
      EditShop: { Component: null, Shop: [] },
      DeleteShop: { Component: null, ID: null, Name: null },
      Geometry: { address: '', city: '', coords: [], loading: false, iconUp: false }
    }
  }),
  methods: {
    ...mapActions({
      updateShops: 'shops/getShops'
    }),
    editShopClose () {
      this.Shops.EditShop.Component = null
    },
    async editShopComplete () {
      this.$children.find((child) => (child.$options.name === 'ActionAdd')).changeStatus()
      await this.$nextTick(async () => {
        this.Shops.EditShop.Component = null
        this.Shops.State = 'View'
        await this.updateShops()
        this.list = this.shops.map((shop) => ({ id: shop.id, label: shop.name, image: shop.image, data: shop, shop: true }))
        await this.mapUpdate(false)
      })
    },
    editShopCall () {
      this.Shops.EditShop.Component = require('@/components/molecules/Shops/Edit').default
    },
    editShop (shop) {
      this.$children.find((child) => (child.$options.name === 'ActionAdd')).changeStatus()
      this.Shops.State = 'Edit'
      this.Shops.EditShop.Shop = shop
      this.clickShop(shop.id)
      this.$nextTick(() => {
        this.Shops.Geometry.city = shop.city
        this.Shops.Geometry.coords = [ parseFloat(shop.latitude), parseFloat(shop.longitude) ]
        this.Shops.Geometry.address = shop.address
        this.Shops.AddShop.Button = true
      })
    },
    async deleteShopClose (payload) {
      this.Shops.DeleteShop.Component = null
      if (payload.complete) {
        await this.updateShops()
        this.list = this.shops.map((shop) => ({ id: shop.id, label: shop.name, image: shop.image, data: shop, shop: true }))
        await this.mapUpdate(false)
      }
    },
    deleteShop (payload) {
      this.Shops.DeleteShop.Name = payload.name
      this.Shops.DeleteShop.ID = payload.id
      this.Shops.DeleteShop.Component = require('@/components/molecules/Shops/Delete').default
    },
    addShopClose () {
      this.Shops.AddShop.Component = null
    },
    async addShopComplete () {
      await this.updateShops()
      this.list = this.shops.map((shop) => ({ id: shop.id, label: shop.name, image: shop.image, data: shop, shop: true }))
      this.Shops.AddShop.Component = null
      setTimeout(async ()=>{
        this.$children.find((child) => (child.$options.name === 'ActionAdd')).changeStatus()
        this.Shops.State = 'View'
        await this.mapUpdate(false)
     }, 1000)
    },
    addShop () {
      this.Shops.AddShop.Component = require('@/components/molecules/Shops/Add').default
    },
    async mapBoundsChange () {
      if (this.Shops.State !== 'Add' && this.Shops.State !== 'Edit') return 1
      if (this.Shops.AddShop.Timer !== null) {
        clearTimeout(this.Shops.AddShop.Timer)
        this.Shops.AddShop.Timer = null
      }
      this.Shops.Geometry.loading = true
      const geoResponse = await this.ymaps.geocode(this.ymap.getCenter(), { results: 1 })
      const geoObjects = geoResponse.geoObjects.get(0)
      this.Shops.Geometry.address = geoObjects.getAddressLine()
      this.Shops.Geometry.city = await geoObjects.getLocalities()
      this.Shops.Geometry.city = (this.Shops.Geometry.city.length) ? this.Shops.Geometry.city[0] : ''
      this.Shops.Geometry.coords = geoObjects.geometry.getCoordinates()
      this.Shops.Geometry.loading = false
      this.Shops.Geometry.iconUp = false
      this.Shops.AddShop.Button = (!this.Shops.AddShop.Button)
    },
    changeAddState (state) {
      this.Shops.State = state
    },
    clickShop (shop_id) {
      const findMarker = [this.markers.find((marker) => (marker.shop.id === shop_id))].map((marker) => ({ bounds: marker.bounds, zoom: (marker.zoom - 2) }))[0]
      this.ymap.setBounds(findMarker.bounds)
      this.ymap.setZoom(findMarker.zoom)
    },
    async mapUpdate (bounds = true) {
      if (this.Shops.State === 'Add' || this.Shops.State === 'Edit') return 1
      await this.setMarkers()
      if (bounds) {
        await this.setAllBounds()
      }
    },
    async mapInit(payload) {
      this.ymap = payload
      this.ymaps = ymaps
      this.onResizeFunction = window.addEventListener('resize', this.onResize)
      this.onResize ()
      await this.mapUpdate(true)
      this.show_ymap = true
      payload.events.add('boundschange', () => (this.mapBoundsChange()))
      payload.events.add('actiontick', () => {
        if (this.Shops.State !== 'Add' && this.Shops.State !== 'Edit') return 1
        this.Shops.Geometry.iconUp = true
        this.Shops.AddShop.Button = (this.Shops.AddShop.Button) ? false : this.Shops.AddShop.Button
      })
    },
    async setMarkers () {
      this.markers = []
      this.$nextTick(async () => {
        for (const shop of this.shops) {
          const MarkerData = await this.getMarkerData([parseFloat(shop.Latitude), parseFloat(shop.Longitude)], shop)
          this.markers.push (MarkerData)
        }
      })
    },
    getMarkerData (coords, shop) {
      return new Promise(async (resolve, reject) => {
        if ( typeof this.$refs.ymap === 'undefined' ) {
          resolve ()
        } else {
          try {
            const Coordinates = await this.getCoordsByAddress(shop.address)
            const response = await this.ymaps.geocode(Coordinates, { results: 1 })
            const geoObject = response.geoObjects.get(0)
            resolve ({
              coords: Coordinates, bounds: geoObject.geometry.getBounds(),
              zoom: this.ymaps.util.bounds.getCenterAndZoom(geoObject.properties.get('boundedBy'), [ parseInt(this.$refs.ymap.$el.style.width), parseInt(this.$refs.ymap.$el.style.height) ]).zoom,
              id: this.markers.length + 1, caption: shop.address, preset: 'islands#redDotIcon', shop: shop
            })
          }
          catch(e) { reject(e) }
        }
      })
    },
    getCoordsByAddress (address) {
      return new Promise(async (resolve) => {
        const responseGeoCode = await this.ymaps.geocode(address)
        resolve(responseGeoCode.geoObjects.get(0).geometry.getCoordinates())
      })
    },
    setAllBounds () {
      return new Promise(async (resolve) => {
        await this.ymap.setBounds(( this.ymap.geoObjects.getBounds() !== null ) ? this.ymap.geoObjects.getBounds() : this.map.bounds)
        if (this.ymap.getZoom() > 16) {
          this.ymap.setZoom(16)
        }
        resolve ('set bounds')
      })
    },
    onResize () {
      if (typeof this.$refs.ymap.$el !== 'undefined') {
        this.$refs.ymap.$el.style.height = window.innerHeight+"px"
        this.$refs.ymap.$el.style.width = document.querySelector('.Shops').offsetWidth + "px"
      }
    },
  },
  beforeDestroy() {
    if (!(typeof this.onResizeFunction == null)) window.removeEventListener('resize', this.onResize);
  },
  created() {
    this.list = this.shops.map((shop) => ({
      id: shop.id,
      label: shop.name,
      image: shop.image,
      data: shop,
      shop: true
    }))
  },
  async asyncData({ store }) {
    await store.dispatch('shops/getShops')
  }
}

</script>
