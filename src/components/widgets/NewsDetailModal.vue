<template>
  <div id="news-detail-modal" class="my-modal-wrap" @click.self="controlModal({target: 'newsDetail', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="controlModal({target: 'newsDetail', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      <div class="modal-box-header">
        <p class="title-top">動態消息類別</p>
        <h5>新品上市 嚐鮮折扣</h5>
        <p class="date">2017/03/22</p>
      </div>
      <div class="modal-box-content">
        <div class="img-wrap">
          <img src="/static/imgs/food01.jpg" alt="">
        </div>
        <p>消息內容消息內容消息內容消息內容，消息內容消息內容消息內容消息內容消息內容消息內容，消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容，
          消息內容消息內容消息內容消息內容消息內容消息內容。
        </p>
        
        
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