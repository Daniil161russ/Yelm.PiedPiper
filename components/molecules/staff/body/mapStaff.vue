<template>
  <div class="staff__map">
    <client-only>
      <yandex-map style="width: 100%; height: 100%;" :zoom="map.zoom" :coords="map.coords" :controls="map.controls" @map-was-initialized="mapInit" :options="{ suppressMapOpenBlock: true }">
        <!-- <ymap-marker v-for="mark in markers"
                       :key="mark.id"
                       :coords="[ mark.coords[0], mark.coords[1] ]"
                       :marker-id="'editable_'+mark.id"
                       :options="{ preset: mark.preset, draggable: false }"
                       :properties="{ iconCaption: mark.shop.Name, balloonContentBody: '' }" /> -->
      </yandex-map>
    </client-only>
  </div>
</template>

<script>
export default {
  data: () => ({
    ymap: null,
    ymaps: null,
    map: {
      coords: [55.933701, 37.496336], 
      zoom: 16, 
      controls: ['zoomControl'],
    },
    markers: [],
    show_ymap: false
  }),
  methods: {
    async mapInit(payload) {
      this.ymap = payload;
      this.ymaps = ymaps;
      this.showMap = false;
    }
  }
}
</script>