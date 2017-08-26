<template>
  <div id="qrcode-modal" class="my-modal-wrap" @click.self="CONTROL_MODAL({target: 'qrcode', boo: false})">
    <div class="modal-box">
      <div class="icon-circle-close"  @click="CONTROL_MODAL({target: 'qrcode', boo: false})">
      </div>
      <div class="modal-box-title">
        <h5>{{sev.SEV_NAME}} APP</h5>
        <p>輕鬆掌握店家最新消息與優惠！</p>
      </div>
      <div class="modal-box-content">
        <el-row :gutter="20">
          <el-col :span="12">
            <img src="/static/imgs/qrcode2.png">
            <div class="icon-ios-app"></div>
          </el-col>
          <el-col :span="12">
            <img src="/static/imgs/qrcode2.png">
            <div class="icon-andorid-app"></div>
          </el-col>
        </el-row>
        <!-- <div class="app-icons clearfix">
          <div>
            <img src="/static/imgs/ios_icon.png" alt="">
          </div>
          <div>
            <img src="/static/imgs/android_icon.png" alt="">
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'QRCodeModal',
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'sev'
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
