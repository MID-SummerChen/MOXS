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
          <input id="email" type="text" v-model="loginForm.email">
          <p class="error" v-if="$v.loginForm.$dirty && !$v.loginForm.email.required">此為必填</p>
        </div>
        <div class="form-group">
          <label for="pw">密碼</label>
          <input id="pw" type="password" v-model="loginForm.pw">
          <p class="error" v-if="$v.loginForm.$dirty && !$v.loginForm.pw.required">此為必填</p>
        </div>
        <button type="button" class="signin" @click="onLogin">登  入 Sign In</button>
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
          <input type="checkbox" id="agree">
          <label for="agree">我已詳閱並同意<a href="/">會員使用條款</a></label>
        </div>
        <button type="button" class="signup" @click="onRegister">建立帳戶</button>
        <div class="back">
            <a @click="signupMode = false"><i class="fa fa-arrow-left"></i> 返回登入</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import { required, minLength, between, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'LoginModal',
  data() {
    return {
      signupMode: false,
      loginForm : {
        email: "",
        pw: ""
      },
      registerForm: {
        email: "",
        pw: "",
        pw_c: ""
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
    signupMode() {
      this.$v.$reset()
    }
  },
  computed: {
    ...mapGetters([
    ]),
  },
  mounted() {
    console.log(this)
  },
  methods: {
    ...mapMutations([
      'controlModal',
      'setAlertMsg',
    ]),
    ...mapActions([
      'login',
      'register'
    ]),
    async onLogin() {
      if(this.checkValidate(this.$v.loginForm)) {
        var f = this.loginForm
        var data = {
          id: f.email,
          pw: f.pw
        }
        var res = await this.login(data)
        if(res.resultCode === 10) {
          this.setAlertMsg("登入成功！")
          this.controlModal({target: 'login', boo: false})
          this.controlModal({target: 'alertBox', boo: true, timeout: 2000})
        }
      }
      
    },
    checkValidate(formGroup) {
      formGroup.$touch()
      console.log(formGroup)
      return !formGroup.$invalid
    },
    async onRegister() {
      if(this.checkValidate(this.$v.registerForm)) {
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
        if(res.resultCode === 10) {
          var res2 = await this.login(data.ac)
          if(res2.resultCode === 10) {
            this.setAlertMsg("註冊成功！")
            this.controlModal({target: 'login', boo: false})
            this.controlModal({target: 'alertBox', boo: true, timeout: 2000})
          }
        }
      }
      
      
    }
  }
}
</script>

<style lang="stylus">

</style>
