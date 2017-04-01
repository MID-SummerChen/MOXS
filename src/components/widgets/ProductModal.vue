<template>
  <div id="product-modal" class="my-modal-wrap" @click.self="controlModal({target: 'product', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="controlModal({target: 'product', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      <div class="modal-box-content">
        <div class="img-wrap">
          <img src="/static/imgs/food03.jpg" alt="">
        </div>
        <div class="tabs">
          <div class="tab">餐點介紹</div>
          <div class="tab active">餐點預定</div>
        </div>
        <div class="content">
          <h5>起司牛奶鍋</h5>
          <div class="selector"><span>價格：</span> <span>大390元</span><i class="el-icon-arrow-down"></i></div>
          <div class="selector"><span>辣度：</span> <span>中辣</span><i class="el-icon-arrow-down"></i></div>
          <div class="selector"><span>副餐：</span> <span>白飯10元</span><i class="el-icon-arrow-down"></i></div>
          <div class="plus">加購：
            <span>雞蛋10</span> <span>蔥末10</span> <span>麵10</span>
          </div>
          <div class="total">
            <div>單價
              <p>300元</p>
            </div>
            <div class="sign">+</div>
            <div>數量
              <p>6個</p>
            </div>
            <div class="sign">-</div>
            <div>小計
              <p>1800元</p>
            </div>
          </div>
        </div>
        <div class="button">
          加入購物車
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'ProductModal',
    data() {
      return {
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