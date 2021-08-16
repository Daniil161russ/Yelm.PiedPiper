<template>
  <div class="Shops">
    <div class="Shops__Header Shops__Header-Polygons">
      <v-button :to="{ name: 'shops' }" circle="" icon="" plain="" color="primary">
        <v-icon slot="icon" name="ArrowLeft" color="primary" fill="" />
      </v-button>
      <v-shops-label :label="`Области доставки для магазина \'${shop.name}\'`" />
      <v-shops-add v-model="statePolygon" @change="changePolygonState" />
    </div>
    <v-shops-list v-model="list" @click="clickPolygon" @edit="editPolygon" @delete="dropPolygon" v-if="statePolygon === 'View'" />
    <div class="Shops__YMap" :class="{ 'Shops__YMap-Fade': (!show_ymap) }">
      <client-only>
        <yandex-map ref="ymap" :zoom="map.zoom" :coords="map.coords" :bounds="map.bounds" :controls="map.controls" @map-was-initialized="mapInit" :options="{ suppressMapOpenBlock: true }" >
          <ymap-marker v-for="marker in markers" :key="marker.id" :coords="[ marker.coords[0], marker.coords[1] ]" :marker-id="'editable_'+marker.id" :options="{ preset: marker.preset, draggable: false }" :properties="{ iconCaption: marker.shop.Name, balloonContentBody: '' }" />
        </yandex-map>
      </client-only>
    </div>
    <component :is="deletePolygon.Component" v-if="deletePolygon.Component != null" :id="deletePolygon.ID" :name="deletePolygon.Name" @hide="deletePolygonClose" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Button from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";

export default {
  name: "id",
  components: {
    'v-shops-label': () => import('~/components/molecules/Shops/Label'),
    'v-shops-list': () => import('~/components/molecules/Shops/List'),
    'v-shops-add': () => import('~/components/molecules/Shops/ActionAdd'),
    'v-button': Button,
    'v-icon': Icon,
  },
  data: () => ({
    ymap: null,
    ymaps: null,
    map: {
      coords: [55.749552744318315, 37.62173055468749],
      zoom: 8,
      bounds: [[55.50090388956289, 37.18227742968749], [55.99662016956414, 38.06118367968748]],
      controls: ['zoomControl'],
    },
    deletePolygon: { Component: null, ID: null, Name: null },
    markers: [],
    show_ymap: false,
    onResizeFunction: null,
    myPolygon: null,
    stateMonitor: null,
    statePolygon: 'View',
    statePolygon_Inner: 'View',
    editedPolygon: null,
    list: []
  }),
  computed: {
    ...mapGetters({
      shops: 'shops/getShops',
    }),
  },
  methods: {
    ...mapActions({
      addPolygon: 'shops/addPolygon',
      updatePolygon: 'shops/updatePolygon',
      getPolygons: 'shops/getPolygons',
    }),
    dropPolygon (data) {
      this.deletePolygon.ID = data.id
      this.deletePolygon.Name = data.name
      this.deletePolygon.Component = require('@/components/molecules/Shops/DeletePolygon').default
    },
    async deletePolygonClose(payload) {
      this.deletePolygon.Component = null
      if (payload.complete) {
        this.polygons = await this.getPolygons ({ id: this.id })
        await this.mapUpdate(false)
      }
    },
    sleep (ms) {
      return new Promise((resolve) => (
        setTimeout(()=> ( resolve() ), ms)
      ))
    },
    async editPolygon(point) {
      const point_index = this.polygons[0].polygons.findIndex((p) => (p.id === point.id))
      const polygon = this.polygons[0].polygons[point_index].polygon
      if(this.stateMonitor === null && this.myPolygon === null && this.editedPolygon === null) {
        this.ymap.container.fitToViewport()
        this.ymap.setBounds(polygon.geometry.getBounds())
        this.stateMonitor = new ymaps.Monitor(polygon.editor.state)
        this.stateMonitor.add("drawing", (newValue) => {
          polygon.options.set("strokeColor", newValue ? 'rgba(10, 132, 255, 1)' : 'rgba(10, 132, 255, 1)')
        })
        polygon.editor.startDrawing()
        this.editedPolygon = this.polygons[0].polygons[point_index]
        this.statePolygon = 'Add'
        this.statePolygon_Inner = 'Edit Polygon'
      }
    },
    async finishEditPolygon() {
      if (this.editedPolygon !== null) {
        this.stateMonitor.remove("drawing")
        this.editedPolygon.polygon.editor.stopDrawing()
        this.stateMonitor = null
        try {
          await this.updatePolygon({ id: this.editedPolygon.id, points: this.editedPolygon.polygon.geometry.getCoordinates() })
        } catch (e) {
          console.log('error: ', e)
          if (typeof e.response.data !== 'undefined') {
            this.$notify.error({ title: 'Ошибка', message: e.response.data })
          }
        }
        this.editedPolygon = null
        this.polygons = await this.getPolygons ({ id: this.id })
        await this.mapUpdate (false)
      }
    },
    async clickPolygon(point_id) {
      const polygon = this.polygons[0].polygons.find((point) => (point.id === point_id)).polygon
      this.ymap.container.fitToViewport()
      this.ymap.setBounds(polygon.geometry.getBounds())
      polygon.options.set('fillColor', 'rgba(10, 132, 255, 1)')
      polygon.options.set('strokeWidth', 0)
      for (let i = 9, j = 1; i >= 0; i--, j++) {
        await this.sleep(j * 5)
        polygon.options.set('fillColor', ( i > 0 ) ? ('rgba(235, 87, 87, .'+i+')') : ('rgba(235, 87, 87, 0)'))
      }
      for ( let i = 0; i <= 7; i++ ) {
        await this.sleep(i * 5)
        polygon.options.set('fillColor', 'rgba(10, 132, 255, .'+i+')')
      }
      polygon.options.set('strokeWidth', 1)
    },
    changePolygonState(event) {
      switch (event) {
        case 'Add': {
          this.createPolygon ();
          this.statePolygon_Inner = 'Add Polygon';
          break;
        }
        case 'View': {
          if ( this.statePolygon_Inner === 'Add Polygon' ) {
            this.finishPolygon ()

          } else if ( this.statePolygon_Inner === 'Edit Polygon' ) {
            this.finishEditPolygon ()
          }
          this.statePolygon_Inner = ''
          break;
        }
      }
    },
    async finishPolygon() {
      const polygonCoords = this.myPolygon.geometry.getCoordinates()
      this.stateMonitor.remove("drawing")
      this.myPolygon.editor.stopDrawing()
      this.ymap.geoObjects.remove(this.myPolygon)
      this.myPolygon = null
      this.stateMonitor = null
      if ( polygonCoords[0].length ) {
        try {
          await this.addPolygon({ id: this.id, data: polygonCoords })
          this.polygons = await this.getPolygons ({ id: this.id })
          await this.mapUpdate (false)
        } catch (e) {
          console.log(e)
        }
      }
    },
    createPolygon() {
      if (this.myPolygon === null && this.stateMonitor === null) {
        this.myPolygon = new ymaps.Polygon([], {}, {
          editorDrawingCursor: "crosshair",
          editorMaxPoints: 10000,
          fillColor: 'rgba(10, 132, 255, .7)',
          strokeColor: 'rgba(10, 132, 255, 1)',
          strokeWidth: 3
        })
        this.ymap.geoObjects.add(this.myPolygon)
        this.stateMonitor = new ymaps.Monitor(this.myPolygon.editor.state)
        this.stateMonitor.add("drawing", (newValue) => {
          this.myPolygon.options.set("strokeColor", newValue ? 'rgba(10, 132, 255, 1)' : 'rgba(10, 132, 255, 1)')
        })
        this.myPolygon.editor.startDrawing()
      }
    },
    async setMarkers() {
      this.markers = []
      for (const shop of this.shops) {
        const MarkerData = await this.getMarkerData([parseFloat(shop.Latitude), parseFloat(shop.Longitude)], shop)
        this.markers.push (MarkerData)
      }
    },
    getAddressFromPoints(points) {
      return new Promise(async (resolve, reject) => {
        try {
          const geoResponse = await this.ymaps.geocode(points[0][0])
          let AddressLine = geoResponse.geoObjects.get(0).getAddressLine()
          let Country = geoResponse.geoObjects.get(0).getCountry()
          let Administrative = geoResponse.geoObjects.get(0).getAdministrativeAreas()
          AddressLine = AddressLine.replace(Country+', ', '')
          if ( Administrative.length ) {
            AddressLine = AddressLine.replace(Administrative[0]+', ', '')
            if ( typeof Administrative[1] !== 'undefined' ) {
              AddressLine = AddressLine.replace(Administrative[1]+', ', '')
            }
          }
          AddressLine = AddressLine.replace(/^\s{1}/gm, '')
          AddressLine = AddressLine.replace(/\s{1}$/gm, '')
          resolve(AddressLine)
        } catch (e) {
          reject(e)
        }
      })
    },
    getCoordsByAddress(address) {
      return new Promise(async (resolve) => {
        const responseGeoCode = await this.ymaps.geocode(address)
        resolve(responseGeoCode.geoObjects.get(0).geometry.getCoordinates())
      })
    },
    setAllBounds() {
      return new Promise(async (resolve, reject) => {
        await this.ymap.setBounds(( this.ymap.geoObjects.getBounds() !== null ) ? this.ymap.geoObjects.getBounds() : this.map.bounds)
        if (this.ymap.getZoom() > 16) {
          this.ymap.setZoom(16)
        }
        resolve ('set bounds')
      })
    },
    getMarkerData(coords, shop) {
      return new Promise(async (resolve, reject) => {
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
      })
    },
    async setPolygons () {
      this.list = []
      for (const [Polygon_Idx, Polygon] of this.polygons.entries()) {
        for (const [Polygon_Inner_Idx, Point] of Polygon.polygons.entries()) {
          if (Point.points[0].length) {
            let Point_Address = await this.getAddressFromPoints(Point.points)
            this.$set(this.polygons[Polygon_Idx].polygons[Polygon_Inner_Idx], 'polygon', await this.drawPolygon (Point.points, Polygon.shop_id))
            this.list.push({
              id: Point.id,
              label: Point_Address,
              data: this.polygons[Polygon_Idx].polygons[Polygon_Inner_Idx],
            })
          }
        }
      }
    },
    drawPolygon(points, shopID) {
      return new Promise(async (resolve, reject) => {
        try {
          let polygon = new ymaps.Polygon(points)
          await this.ymap.geoObjects.add(polygon)
          if ( shopID !== parseInt(this.id) ) {
            polygon.options.set('fillColor', 'rgba(196,196,196,.6)')
            polygon.options.set('strokeColor', 'rgba(196,196,196,.4)')
          }
          resolve(polygon)
        } catch(e) {
          reject(e)
        }
      })
    },
    async mapUpdate(bounds = true) {
      this.ymap.geoObjects.removeAll()
      await this.setMarkers()
      await this.setPolygons()
      if (bounds) {
        await this.setAllBounds()
      }
    },
    async mapInit(payload) {
      this.ymap = payload
      this.ymaps = ymaps
      this.onResizeFunction = window.addEventListener('resize', this.onResize)
      this.onResize ()
      await this.mapUpdate()
      this.show_ymap = true
    },
    onResize() {
      if (typeof this.$refs.ymap.$el !== 'undefined') {
        this.$refs.ymap.$el.style.height = window.innerHeight+"px"
        this.$refs.ymap.$el.style.width = document.querySelector('.Shops').offsetWidth + "px"
      }
    },
  },
  beforeDestroy() {
    if (!(typeof this.onResizeFunction == null)) {
      window.removeEventListener('resize', this.onResize)
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch('shops/getShops')
    const shop = await store.dispatch('shops/getShop', { id: params.id })
    const polygons = await store.dispatch('shops/getPolygons', { id: params.id })
    return {
      id: params.id,
      shop: shop,
      polygons: polygons
    }
  }
}
</script>
