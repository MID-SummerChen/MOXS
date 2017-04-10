<template>
  <div class="cart">
      <div class="top">
        <span class="close" @click="controlModal({target: 'cart', boo: false})"><v-icon>clear</v-icon></span>
        
        <span class="title">訂位點餐</span>
        <span class="reset">重設</span>
      </div>
      <!--<div class="content">填寫預約資料...</div>-->
      <div class="content" @click="controlModal({target: 'checkout', boo: true})">
        <h5>內用點餐</h5>
        <p>
          2017/03/20 星期三
          <span>16:30(2人)</span>
          <span>線上付款</span>
        </p>
        <p>林青揚先生 <span>0921-999888</span></p>
        <p>台中烏日區健行南路233號10樓</p>
      </div>
      <div class="items">
        <div v-for="n in 4" class="item">
          <div class="item-content">
            <p class="title">餐點的名稱</p>
            <p class="sub-title">大 <span>3份</span></p>
            <p class="tags"><span>加雞蛋</span><span>加雞蛋</span><span>加雞蛋</span></p>
          </div>
          <div class="item-price">$180</div>
          <div class="item-cancel"><i class="el-icon-close"></i></div>
        </div>
      </div>
      <div class="total">
        合計 NT$ 170
        <button type="button" class="submit" @click="$router.push({name: 'Checkout'})">確認預約</button>
      </div>

    </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'LoginModal',
  data() {
    return {
      signupMode: false
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
