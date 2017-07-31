<template>
  <div id="phone-verify-modal" class="my-modal-wrap" @click.self="CONTROL_MODAL({target: 'resvSuccess', boo: false})">
    <div class="modal-box">
      <div class="modal-box-content">
        <h5 class="success-title"> <i class="fa fa-check-circle"></i> 預約成功</h5>
        <label>您的預約代碼</label>
        <div class="code-box">
          {{checkedOutResv.resvCode.slice(checkedOutResv.resvCode.length-4)}}
        </div>
        <p v-if="checkedOutResv.payType === 'ONSITE'">已發送驗證碼至您的手機，請繼續完成驗證。</p>
        <p v-if="checkedOutResv.payType === 'ONLINE'">已為您保留預約，請於10分鐘內繼續完成付款，逾時自動取消預約。</p>
      </div>
      <div class="modal-box-footer">
        <button v-if="checkedOutResv.payType === 'ONSITE'" class="blue-text" @click="openPhoneVerify">輸入驗證碼</button>
        <button v-if="checkedOutResv.payType === 'ONLINE'" class="blue-text" @click="goToPay">線上付款</button>
      </div>
    </div>
    <!-- <div v-if="statusTab === 'fail'" class="modal-box">
      <div class="modal-box-content">
        <h5 class="error-title"> <i class="fa fa-times-circle"></i> 預約失敗</h5>
        <p>其他資訊其他資訊其他資訊其他資訊其他資訊其他資訊其他資訊其他資訊</p>
        
      </div>
      <div class="modal-box-footer">
        <button class="blue-text" @click="CONTROL_MODAL({target: 'resvSuccess', boo: false})">確認</button>
      </div>
    </div> -->
    
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import commonMixin from '@/utils/commonMixin'
  export default {
    name: 'PhoneVerifyModal',
    mixins: [commonMixin],
    data() {
      return {
        statusTab: 'code',
        verifyCode: ""
      }
    },
    computed: {
      ...mapGetters([
        'checkedOutResv',
      ])
    },
    methods: {
      ...mapMutations([
      ]),
      ...mapActions([
        'sendResvVerify',
        'verifyResv',
      ]),
      openPhoneVerify() {
        this.CONTROL_MODAL({target: 'resvSuccess', boo: false})
        this.CONTROL_MODAL({target: 'phoneVerify', boo: true})
      },
      goToPay() {
        this.CONTROL_MODAL({target: 'resvSuccess', boo: false})
        this.$router.push({name: "Checkout", query: {chk: this.checkedOutResv.chk.chkSn, resv: this.checkedOutResv.sn}})
      }

    }
  }

</script>

<style lang="stylus">

</style>