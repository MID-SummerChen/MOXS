<template>
  <div id="alert-box" class="my-modal-wrap" @click.self="controlModal({target: 'alertBox', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="controlModal({target: 'alertBox', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      
      <div class="modal-box-content">
        <v-icon>error_outline</v-icon>{{msg}}
        
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
        }),
        ...mapGetters([
        ])
    },
    methods: {
        ...mapMutations([
            'controlModal',
        ]),

    }
  }

</script>

<style lang="stylus">

</style>