<template>
  <div id="checkout-modal" class="my-modal-wrap" @click.self="controlQRCodeModal(false)">
    <div class="modal-box">
      <div class="close-btn"  @click="controlQRCodeModal(false)">
        <v-icon>clear</v-icon>
      </div>
      <div class="modal-box-content">
        <div style="margin-top: 10px"></div>
        <h4>下載官方APP<br>預約更即時！</h4>
        <div style="margin-top: 10px"></div>
        <div><img src="/static/imgs/qrcode.png"></div>
        <div style="margin-top: 5px"></div>
        <div><img src="/static/imgs/appstore.png"></div>
        <div style="margin-top: 5px"></div>
        <div><img src="/static/imgs/googleplay.png"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'QRCodeModal',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'isShowQRCodeModal'
    ])
  },
  methods: {
    ...mapMutations([
      'controlQRCodeModal'
    ]),

  }
}
</script>

<style lang="stylus">

</style>
