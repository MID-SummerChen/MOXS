<template>
  <div id="loading-mask" class="my-modal-wrap">
    <div class="modal-box">
      <mu-circular-progress :size="100" :strokeWidth="5"/>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'LoadingMask',
    data() {
      return {
      }
    },
    mounted() {
    },
    computed: {
        ...mapState({
        }),
        ...mapGetters([
          'isLoading'
        ])
    },
    methods: {
        ...mapMutations([
        ]),

    }
  }

</script>

<style lang="stylus">

</style>