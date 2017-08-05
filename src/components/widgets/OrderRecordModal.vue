<template>
  <div id="order-record-modal" class="my-modal-wrap" @click.self="CONTROL_MODAL({target: 'orderRecord', boo: false})">
    <div class="modal-box">
      <div class="modal-box-content">
        <h5>交易紀錄</h5>
        <p>帳單編號： {{chkInfo.chkSn}}</p>
        <p>帳單金額： ${{chkInfo.totalPrice}}</p>
        <p>交易時間：{{chkInfo.updateAt}}</p>
        <p>支付類型：{{toPayMode(chkInfo.payMode)}}</p>
        <p>發票類型：{{toInvoiceType(chkInfo.invoiceType)}}</p>
         <p>收件人：{{chkInfo.chkSn}}</p>
        <p>發票地址：{{chkInfo.invoiceAddress}}</p> 
        <p v-if="chkInfo.invoiceTitle">公司抬頭：{{chkInfo.invoiceTitle}}</p>
        <p v-if="chkInfo.taxId">統一編號：{{chkInfo.taxId}}</p>
        
      </div>
      <div class="modal-box-footer">
        <button @click="CONTROL_MODAL({target: 'orderRecord', boo: false})" class="blue-text">確認</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import commonMixin from '@/utils/commonMixin'
  export default {
    name: 'CheckoutModal',
    mixins: [commonMixin],
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'chkInfo'
      ])
    },
    mounted() {
    },
    methods: {
      ...mapMutations([
        'CONTROL_MODAL'
      ]),
      ...mapActions([
      ]),
    }
  }

</script>

<style lang="stylus">

</style>