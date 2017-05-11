import {mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed() {
    
  },
  methods: {
    ...mapMutations([
      'controlModal'
    ]),
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