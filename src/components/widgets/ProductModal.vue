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
        <h5>起司牛奶鍋</h5>
        <div class="btn-wrap">
          <button class="my-btn t1" :class="{active: currentTab === 1}" @click="currentTab = 1">餐點介紹</button>
          <button class="my-btn t1" :class="{active: currentTab === 2}" @click="currentTab = 2">餐點預定</button>
        </div>
        <div class="content">
          <template v-if="currentTab === 1">
            起司牛奶鍋起司牛奶鍋起司牛奶鍋起司牛奶鍋起司牛奶鍋起司牛奶鍋起司牛奶鍋，起司牛奶鍋起司牛奶鍋起司牛奶鍋起司牛奶鍋起司牛奶鍋，起司牛奶鍋起司牛奶鍋起司牛奶鍋，
            起司牛奶鍋起司牛奶鍋起司牛奶鍋起司牛奶鍋起司牛奶鍋起司牛奶鍋，起司牛奶鍋起司牛奶鍋起司牛奶鍋起司牛奶鍋，起司牛奶鍋起司牛奶鍋起司牛奶鍋。
          </template>
          <template v-else>
            <div class="selector-t2"><span>價格：</span> <span>大390元</span><i class="el-icon-arrow-down"></i></div>
          <div class="selector-t2"><span>辣度：</span> <span>中辣</span><i class="el-icon-arrow-down"></i></div>
          <div class="selector-t2"><span>副餐：</span> <span>白飯10元</span><i class="el-icon-arrow-down"></i></div>
          <div class="plus">加購：
            <span>雞蛋10</span> <span>蔥末10</span> <span>麵10</span>
          </div>
          <div class="total">
            <div>單價
              <p>300元</p>
            </div>
            <div class="sign"><span>+</span></div>
            <div>數量
              <p>6個</p>
            </div>
            <div class="sign"><span>-</span></div>
            <div>小計
              <p>1800元</p>
            </div>
          </div>
          <div class="ps">
            <p>備註</p>
            <textarea></textarea>
          </div>
            
          </template>
          
          
        </div>
        <div class="sub-btn-wrap">
          <div class="button" @click="onAddedToCart">加入預約清單</div>
          <div class="button" @click="controlModal({target: 'product', boo: false})">關閉</div>
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
        currentTab: 1
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
      onAddedToCart() {
        this.controlModal({target: 'cart', boo: true})
        this.controlModal({target: 'product', boo: false})
      }

    }
  }

</script>

<style lang="stylus">

</style>