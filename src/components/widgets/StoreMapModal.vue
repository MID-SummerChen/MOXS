<template>
  <div id="store-map-modal" class="my-modal-wrap" @click.self="CONTROL_MODAL({target: 'storeMap', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="CONTROL_MODAL({target: 'storeMap', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      
      <div class="modal-box-content">
        <div ref="map" class="mapWrap"></div>
        <!-- <div style="margin-top: 15px"></div> -->
        <!-- <button class="my-btn btn-t1 active block" @click.self="CONTROL_MODAL({target: 'storeMap', boo: false})">關閉</button> -->
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
        'CONTROL_MODAL'
      ]),
      async onGotMapInfo() {
        var address = this.mapInfo.city && this.mapInfo.area && this.mapInfo.addr 
                    ? this.mapInfo.city + this.mapInfo.area + this.mapInfo.addr 
                    : '台中市'
        var data = {
          key: this.googleKey,
          address,
        }
        console.log(data.address)
        var res = await $.get('https://maps.googleapis.com/maps/api/geocode/json', data)
        if(res.status === 'OK') {
          var {lat, lng} = res.results[0].geometry.location
          var _opt = {center: {lat, lng}, zoom: 15};
          var map = new google.maps.Map(this.$refs.map, _opt);
          var marker = new google.maps.Marker({
            position: {lat, lng},
            map
          });
        }
      }
    }
  }

</script>

<style lang="stylus">

</style>