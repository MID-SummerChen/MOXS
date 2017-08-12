<template>
  <div id="phone-verify-modal" class="my-modal-wrap" @click.self="CONTROL_MODAL({target: 'phoneVerify', boo: false})">
    <div class="modal-box">
      <div class="modal-box-content">
        <h5>請輸入手機驗證碼</h5>
        <p>系統已發送驗證碼簡訊至{{checkedOutResv.userCell || checkedOutResv.cell}}</p>
        <div class="verifySection">
          <input type="text" placeholder="驗證碼..." v-model="verifyCode" @keyup.enter="onVerifySubmit">
          <button v-if="checkoutType === 'ord'" class="submit-btn" @click.prevent="sendOrdVerifyAgain">發送驗證碼</button>
          <button v-if="checkoutType === 'resv'" class="submit-btn" @click.prevent="sendResvVerifyAgain">發送驗證碼</button>
        </div>
      </div>
      <div class="modal-box-footer">
        <button @click="CONTROL_MODAL({target: 'phoneVerify', boo: false})">取消</button>
        <button v-if="checkoutType === 'ord'" type="submit" class="blue-text" @click.prevent="onOrdVerifySubmit">確認</button>
        <button v-if="checkoutType === 'resv'" type="submit" class="blue-text" @click.prevent="onResvVerifySubmit">確認</button>
      </div>
    </div>
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
        verifyCode: ""
      }
    },
    computed: {
      ...mapGetters([
        'checkedOutResv',
        'checkoutType',
      ])
    },
    methods: {
      ...mapMutations([
      ]),
      ...mapActions([
        'sendResvVerify',
        'sendOrdVerify',
        'verifyResv',
        'verifyOrd',
      ]),
      async sendResvVerifyAgain() {
        var res = await this.sendResvVerify(this.checkedOutResv.sn)
        if(res.code === 10) {
          this.$message('已重新發送驗證碼');
        }
      },
      async sendOrdVerifyAgain() {
        var res = await this.sendOrdVerify(this.checkedOutResv.ordSn)
        if(res.code === 10) {
          this.$message('已重新發送驗證碼');
        }
      },
      async onOrdVerifySubmit() {
        var data = {
          ordSn: this.checkedOutResv.ordSn,
          verifyCode: this.verifyCode
        }
        var res = await this.verifyOrd(data)
        if(res.code === 10) {
          this.CONTROL_MODAL({target: 'phoneVerify', boo: false})
          this.$message('驗證成功');
          if(this.$route.name === 'OrdRecordDetail') {
            this.$router.push({name: 'OrdRecordDetail', params: {ord_sn: this.checkedOutResv.ordSn}, query: {re: 1}})
          }else {
            this.$router.push({name: 'OrdRecordDetail', params: {ord_sn: this.checkedOutResv.ordSn}})
          }
          
        }
        
      },
      async onResvVerifySubmit() {
        var data = {
          resvSn: this.checkedOutResv.sn,
          verifyCode: this.verifyCode
        }
        var res = await this.verifyResv(data)
        if(res.code === 10) {
          this.CONTROL_MODAL({target: 'phoneVerify', boo: false})
          this.$message('驗證成功');
          if(this.$route.name === 'ResvRecordDetail') {
            this.$router.push({name: 'ResvRecordDetail', params: {resv_sn: this.checkedOutResv.sn}, query: {re: 1}})
          }else {
            this.$router.push({name: 'ResvRecordDetail', params: {resv_sn: this.checkedOutResv.sn}})
          }
        }
        
      },
      goToPay() {
        this.CONTROL_MODAL({target: 'phoneVerify', boo: false})
        this.$router.push({name: "Checkout", query: {chk: this.checkedOutResv.chk.chkSn, resv: this.checkedOutResv.sn}})
      }

    }
  }

</script>

<style lang="stylus">

</style>