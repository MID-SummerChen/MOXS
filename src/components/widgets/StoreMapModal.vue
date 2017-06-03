<template>
  <div id="store-map-modal" class="my-modal-wrap" @click.self="controlModal({target: 'storeMap', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="controlModal({target: 'storeMap', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      
      <div class="modal-box-content">
        <div ref="map" class="mapWrap"></div>
        
      </div>
      
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'StoreMapModal',
    data() {
      return {
        currentTab: 1,
        isPayNow: 1,
      }
    },
    computed: {
      ...mapState({
        mapInfo: state => state.storeMapModal.mapInfo,
        googleKey: state => state.googleKey,
      }),
      ...mapGetters([
      ]),
    },
    mounted() {
      this.onGotMapInfo()
    },
    methods: {
      ...mapMutations([
        'controlModal'
      ]),
      async onGotMapInfo() {
        var data = {
          key: this.googleKey,
          address: this.mapInfo.addr || '台中市南區新和街',
        }
        var res = await $.get('https://maps.googleapis.com/maps/api/geocode/json', data)
        if(res.status === 'OK') {
          var {lat, lng} = res.results[0].geometry.location
          var _opt = {center: {lat, lng}, zoom: 15};
          var map = new google.maps.Map(this.$refs.map, _opt);
        }
      }
    }
  }

</script>

<style lang="stylus">

</style>