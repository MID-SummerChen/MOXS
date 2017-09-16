<template>
  <div id="news-detail-modal" class="my-modal-wrap" @click.self="onClose">
    <div class="modal-box">
      <div class="close-btn" @click="onClose">
        <i class="icon-circle-close"></i>
      </div>
      <div class="modal-box-header">
        <h5>{{newsData.newsTitle}}</h5>
      </div>
      <div class="modal-box-content">
        <img v-if="newsData.newsImageUrl" :src="toImgSrc(newsData.newsImageUrl)" alt="">
        <p>{{newsData.newsContent}}</p>
        
      </div>
      
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import commonMixin from '@/utils/commonMixin'
  export default {
    name: 'CheckoutModal',
    mixins: [commonMixin],
    data() {
      return {
        newsData: {}
      }
    },
    computed: {
      ...mapGetters([
      ])
    },
    mounted() {
      this._getNews()
    },
    methods: {
      ...mapMutations([
        'CONTROL_MODAL'
      ]),
      ...mapActions([
        'getNews'
      ]),
      async _getNews() {
        var res = await this.getNews(this.$route.query.sn)
        if(res.code === 10) {
          this.newsData = res.data
        }
      },
      onClose() {
        this.$router.push({name: 'News'})
        this.CONTROL_MODAL({target: 'newsDetail', boo: false})
      }

    }
  }

</script>

<style lang="stylus">
</style>