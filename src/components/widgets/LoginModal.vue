<template>
  <div id="login-modal" class="my-modal-wrap" @click.self="controlModal({target: 'login', boo: false})">
    <div class="modal-box">
      <div class="close-btn"  @click="controlModal({target: 'login', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      <!-- 登入 -->
      <div v-if="currentMode === 'login'" class="modal-box-content">
        <div class="logo">
          <img src="/static/imgs/moxs_logo.png" alt="">
        </div>
        <div style="margin-top: 20px"></div>
        <div class="form-group">
          <label for="email">E-MAIL</label>
          <input id="email" type="text" v-model="loginForm.email">
          <p class="error" v-if="$v.loginForm.$dirty && !$v.loginForm.email.required">此為必填</p>
        </div>
        <div class="form-group">
          <label for="pw">密碼</label>
          <input id="pw" type="password" v-model="loginForm.pw" @keyup.enter="handleLogin">
          <p class="error" v-if="$v.loginForm.$dirty && !$v.loginForm.pw.required">此為必填</p>
        </div>
        <button type="button" class="signin" @click="handleLogin">登  入 Sign In</button>
        <div class="sub-link">
            <a @click="currentMode = 'forget'">忘記密碼？</a>
            <a @click="currentMode = 'signup'">建立會員帳戶</a>
        </div>
        <div style="margin-top: 40px"></div>
        <button type="button" class="fb" @click="handleLoginWithFB"><i class="fa fa-facebook"></i>Facebook帳號登入</button>
      </div>

      <!-- 查詢密碼 -->
      <div v-if="currentMode === 'forget'" class="modal-box-content">
        <div class="logo">
          <img v-if="imgs.logoDarkWImg" :src="getLogoImg()" alt="">
        </div>
        <div style="margin-top: 20px"></div>
        <div class="form-group">
          <label for="email">E-MAIL</label>
          <input id="email" type="text" v-model="loginForm.email">
          <p class="error" v-if="$v.loginForm.$dirty && !$v.loginForm.email.required">此為必填</p>
        </div>
        <button type="button" class="signin" @click="sendPwMail">查詢密碼</button>
        <div class="back">
            <a @click="currentMode = 'login'"><i class="fa fa-arrow-left"></i> 返回登入</a>
        </div>
      </div>
      <!-- 會員註冊 -->
      <div v-else-if="currentMode === 'signup'" class="modal-box-content">
        <div class="icon-store-title"></div>
        <div style="margin-top: 20px"></div>
        <div class="form-group">
          <label for="email">E-MAIL</label>
          <input id="email" type="text" v-model="registerForm.email">
          <p class="error" v-if="$v.registerForm.$dirty && !$v.registerForm.email.required">此為必填</p>
        </div>
        <div class="form-group">
          <label for="pw">密碼</label>
          <input id="pw" type="password" v-model="registerForm.pw">
          <p class="error" v-if="$v.registerForm.$dirty && !$v.registerForm.pw.required">此為必填</p>
        </div>
        <div class="form-group">
          <label for="pw_c">確認密碼</label>
          <input id="pw_c" type="password" v-model="registerForm.pw_c">
          <p class="error" v-if="$v.registerForm.$dirty && !$v.registerForm.pw_c.required">此為必填</p>
          <p class="error" v-if="$v.registerForm.$dirty && !$v.registerForm.pw_c.sameAsPw">密碼不同</p>
        </div>
        <div class="agreement">
          <input type="checkbox" id="agree" v-model="registerForm.isAgree">
          <label for="agree">我已詳閱並同意<a href="/" target="_blank">會員使用條款</a></label>
        </div>
        <button type="button" class="signup" @click="onRegister">建立帳戶</button>
        <div class="back">
            <a @click="currentMode = 'login'"><i class="fa fa-arrow-left"></i> 返回登入</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import commonMixin from '@/utils/commonMixin'
  import { required, minLength, between, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'LoginModal',
  mixins: [commonMixin],
  data() {
    return {
      currentMode: 'login',
      forgetForm: {
        email: ""
      },
      loginForm : {
        email: "",
        pw: "",
      },
      registerForm: {
        email: "",
        pw: "",
        pw_c: "",
        isAgree: false,
      },
    }
  },
  validations: {
    loginForm: {
      email: {
        required
      },
      pw: {
        required
      },
    },
    registerForm: {
      email: {
        required
      },
      pw: {
        required
      },
      pw_c: {
        required,
        sameAsPw: sameAs('pw')
      }
    }
    // name: {
    //   required,
    //   minLength: minLength(4)
    // },
    // age: {
    //   between: between(20, 30)
    // }
  },
  watch: {
    currentMode() {
      this.$v.$reset()
    }
  },
  computed: {
    ...mapGetters([
      'apiHost',
      'apiModule',
    ]),
    ...mapState({
        imgs: state => state.imgs,
    })
  },
  mounted() {
    console.log(this)
  },
  methods: {
    ...mapMutations([
      'controlModal',
      'setAlertBox',
      'displayAlertBox',
    ]),
    ...mapActions([
      'login',
      'register',
      'getPw',
      'onLogin',
    ]),
    getLogoImg() {
      return `http://${this.apiHost}/${this.apiModule.sys}/${this.imgs.logoLightWImg}`
    },
    async sendPwMail() {
      var data = {
        id: this.loginForm.email
      }
      var res = await this.getPw(data)
      if(res.code === 10) {
        this.setAlertBox({msg: "已發送密碼至您的信箱", color: "grey darken-3"})
        this.displayAlertBox(true)
      }
    },
    async handleLogin() {
      if(this.checkValidate(this.$v.loginForm)) {
        var f = this.loginForm
        var data = {
          id: f.email,
          pw: f.pw
        }
        this.onLogin(data)
      }
      
    },
    handleLoginWithFB() {
      FB.login(loginCallBack.bind(this), {scope: 'public_profile,email'});

      async function loginCallBack(fbRes) {
        if(fbRes.status === "connected") {
          var accessToken = FB.getAuthResponse().accessToken
          var data = {
            accessToken,
            regType: "FB"
          }
          this.onLogin(data)
        }
      }
    },
    
    async onRegister() {
      if(this.checkValidate(this.$v.registerForm)) {
        if(this.registerForm.isAgree) {
          var f = this.registerForm
          var data = {
            devType: "WEB",
            email: f.email,
            ac: {
              id: f.email,
              pw: f.pw
            }
          }
          var res = await this.register(data)
          if(res.code === 10) {
            var res2 = await this.login(data.ac)
            if(res2.code === 10) {
              this.controlModal({target: 'login', boo: false})
              this.$message({
                message: '註冊成功！',
                type: 'success'
              });
              this.checkLoginStatus()
            }
          }
        }else {
          this.setAlertBox({msg: "請先閱讀會員條款後勾選確認"})
          this.displayAlertBox(true)
        }
        
      }
      
      
    }
  }
}
</script>

<style lang="stylus">

</style>
