<template>
  <div id="member-pw-modal" class="my-modal-wrap" @click.self="controlModal({target: 'memberPw', boo: false})">
    <div class="modal-box">
      <div class="modal-box-content">
        <h5>修改帳戶密碼</h5>
        <form>
            <div class="form-group">
                <label>原密碼</label>
                <input type="text">
            </div>
            <div class="form-group">
                <label>新密碼</label>
                <input type="text">
            </div>
            <div class="form-group">
                <label>確認密碼</label>
                <input type="text">
            </div>
        </form>
      </div>
      <div class="modal-box-footer">
        <button @click="controlModal({target: 'memberPw', boo: false})">取消</button>
        <button class="blue-text">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'MemberPwModal',
    data() {
      return {
        currentTab: 1,
        isPayNow: 1
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