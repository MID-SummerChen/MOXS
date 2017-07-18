<template>
  <div id="qrcode-modal" class="my-modal-wrap" @click.self="CONTROL_MODAL({target: 'qrcode', boo: false})">
    <div class="modal-box">
      <div class="modal-box-title">
        下載官方APP
        <div class="close-btn"  @click="CONTROL_MODAL({target: 'qrcode', boo: false})">
          <v-icon>clear</v-icon>
        </div>
      </div>
      <div class="modal-box-content">
        <img src="/static/imgs/qrcode2.png">
        <div class="app-icons clearfix">
          <div>
            <img src="/static/imgs/ios_icon.png" alt="">
          </div>
          <div>
            <img src="/static/imgs/android_icon.png" alt="">
          </div>
        </div>
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
    ])
  },
  methods: {
    ...mapMutations([
      'CONTROL_MODAL'
    ]),

  }
}
</script>

<style lang="stylus">

</style>
