<template>
  <div id="phone-verify-modal" class="my-modal-wrap" @click.self="controlModal({target: 'phoneVerify', boo: false})">
    <div v-if="statusTab === 0" class="modal-box">
      <div class="modal-box-content">
        <h5>請輸入手機驗證碼</h5>
        <p>系統已發送驗證碼簡訊至0921988766</p>
        <form>
          <input type="text" placeholder="驗證碼...">
          <button class="submit-btn">發送驗證碼</button>
        </form>
      </div>
      <div class="modal-box-footer">
        <button @click="controlModal({target: 'phoneVerify', boo: false})">取消</button>
        <button class="blue-text" @click="onVerifySubmit">確認</button>
      </div>
    </div>
    <div v-if="statusTab === 3" class="modal-box">
      <div class="modal-box-content">
        <h5 class="success-title"> <i class="fa fa-check-circle"></i> 預約成功</h5>
        <label>您的預約代碼</label>
        <div class="code-box">
          123456
        </div>
        <p>其他資訊其他資訊其他資訊其他資訊其他資訊其他資訊其他資訊其他資訊</p>
      </div>
      <div class="modal-box-footer">
        <button class="blue-text" @click="controlModal({target: 'phoneVerify', boo: false})">確認</button>
      </div>
    </div>
    <div v-if="statusTab === -2" class="modal-box">
      <div class="modal-box-content">
        <h5 class="error-title"> <i class="fa fa-times-circle"></i> 預約失敗</h5>
        <p>其他資訊其他資訊其他資訊其他資訊其他資訊其他資訊其他資訊其他資訊</p>
        
      </div>
      <div class="modal-box-footer">
        <button class="blue-text" @click="controlModal({target: 'phoneVerify', boo: false})">確認</button>
      </div>
    </div>
    
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'PhoneVerifyModal',
    data() {
      return {
        statusTab: 0
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
      onVerifySubmit() {
        this.statusTab = 3
      }

    }
  }

</script>

<style lang="stylus">

</style>