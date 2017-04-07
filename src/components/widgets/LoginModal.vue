<template>
  <div id="login-modal" class="my-modal-wrap" @click.self="controlModal({target: 'login', boo: false})">
    <div class="modal-box">
      <div class="close-btn"  @click="controlModal({target: 'login', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      <div v-if="!signupMode" class="modal-box-content">
        <div class="icon-store-title"></div>
        <div style="margin-top: 20px"></div>
        <div class="form-group">
          <label for="email">E-MAIL</label>
          <input id="email" type="text">
        </div>
        <div class="form-group">
          <label for="pw">密碼</label>
          <input id="pw" type="password">
        </div>
        <button type="button" class="signin">登  入 Sign In</button>
        <div class="sub-link">
            <a>忘記密碼？</a>
            <a @click="signupMode = true">建立會員帳戶</a>
        </div>
        <div style="margin-top: 40px"></div>
        <button type="button" class="fb"><i class="fa fa-facebook"></i>Facebook帳號登入</button>
      </div>
      <div v-else class="modal-box-content">
        <div class="icon-store-title"></div>
        <div style="margin-top: 20px"></div>
        <div class="form-group">
          <label for="email">E-MAIL</label>
          <input id="email" type="text">
        </div>
        <div class="form-group">
          <label for="pw">密碼</label>
          <input id="pw" type="password">
        </div>
        <div class="form-group">
          <label for="pw_c">確認密碼</label>
          <input id="pw_c" type="password">
        </div>
        <div class="agreement">
          <input type="checkbox" id="agree">
          <label for="agree">我已詳閱並同意<a href="/">會員使用條款</a></label>
        </div>
        <button type="button" class="signup">建立帳戶</button>
        <div class="back">
            <a @click="signupMode = false"><i class="fa fa-arrow-left"></i> 返回登入</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'LoginModal',
  data() {
    return {
      signupMode: false
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
