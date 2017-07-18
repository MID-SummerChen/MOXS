<template>
  <div id="order-record-modal" class="my-modal-wrap" @click.self="CONTROL_MODAL({target: 'orderRecord', boo: false})">
    <div class="modal-box">
      <div class="modal-box-content">
        <h5>交易紀錄</h5>
        <p>帳單編號：CHK123456789</p>
        <p>帳單編號：CHK123456789</p>
        <p>帳單編號：CHK123456789</p>
        <p>帳單編號：CHK123456789</p>
        <p>帳單編號：CHK123456789</p>
        <p>帳單編號：CHK123456789</p>
        
      </div>
      <div class="modal-box-footer">
        <button @click="CONTROL_MODAL({target: 'orderRecord', boo: false})" class="blue-text">確認</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'CheckoutModal',
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