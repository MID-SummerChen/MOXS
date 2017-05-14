import {mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
        'isLogin',
    ])
    },
  methods: {
    ...mapMutations([
      'controlModal',
    ]),
    ...mapActions([
      'checkLoginStatus'
    ]),
    async limitedPageCheck() {
      await this.checkLoginStatus()
      if(this.isLogin === false) {
        this.$router.push({name: 'Home'})
      }
      if(this.isLogin === null) {
        setTimeout(this.limitedPageCheck, 500)
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    checkValidate(formGroup) {
      formGroup.$touch()
      console.log(formGroup)
      return !formGroup.$invalid
    },
  }
}