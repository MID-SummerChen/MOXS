<template>
  <div id="store-map-modal" class="my-modal-wrap" @click.self="controlModal({target: 'storeMap', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="controlModal({target: 'storeMap', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      
      <div class="modal-box-content">
        店家地圖
        
        
      </div>
      
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'CheckoutModal',
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