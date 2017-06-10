<template>
  <div id="qrcode-modal" class="my-modal-wrap" @click.self="controlModal({target: 'qrcode', boo: false})">
    <div class="modal-box">
      <div class="modal-box-title">
        下載官方APP
        <div class="close-btn"  @click="controlModal({target: 'qrcode', boo: false})">
          <v-icon>clear</v-icon>
        </div>
      </div>
      <div class="modal-box-content">
        <img src="/static/imgs/qrcode2.png">
        <div class="app-icons">
          <img src="/static/imgs/qrcode2.png">
          <img src="/static/imgs/qrcode2.png">
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
      'controlModal'
    ]),

  }
}
</script>

<style lang="stylus">

</style>
