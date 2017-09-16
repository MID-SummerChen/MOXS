<template>
  <div id="alert-box" class="my-modal-wrap" @click.self="displayAlertBox(false)">
    <div class="modal-box" :class="color">
      <div class="close-btn" @click="displayAlertBox(false)">
        <v-icon>clear</v-icon>
      </div>
      
      <div class="modal-box-content">
        <i class="fa fa-check-circle"></i> {{msg}}
        
      </div>
      
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'AlertBox',
    data() {
      return {
      }
    },
    mounted() {
    },
    computed: {
        ...mapState({
          msg: state => state.alertBox.msg,
          color: state => state.alertBox.color,
        }),
        ...mapGetters([
        ])
    },
    methods: {
        ...mapMutations([
            'setAlertBox',
            'displayAlertBox',
        ]),

    }
  }

</script>

<style lang="stylus">

</style>