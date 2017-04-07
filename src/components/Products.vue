<template>

  <v-content>
    <transition name="slide-fade">
    <div v-if="isShowCart" class="cart">
      <div class="top">
        <span class="close" @click="isShowCart = false"><v-icon>clear</v-icon></span>
        
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
        <div v-for="n in 4" class="item" @click="controlModal({target: 'product', boo: true})">
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
      
    </transition>
    <v-container fluid>
      <div class="main-title">
        <ul>
          <li v-for="b in bread">
            <router-link :to="b.link">{{b.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="category-btn-group">
        <el-button v-for="n in 8">漢堡</el-button>
      </div>

      <div>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="6" v-for="(o, index) in 10" style="padding: 10px">
            <el-card :body-style="{ padding: '0px' }">
              <img src="/static/imgs/food03.jpg" class="image">
              <div class="card-content">
                <div>
                  <p class="title">藍帶豬排堡</p>
                  <p class="dollar">$180</p>
                </div>
                <div class="icon-plus" @click="isShowCart = true"></div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

    </v-container>
  </v-content>

</template>

<script>
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'Products',
    components: {
    },
    data() {
      return {
        isShowCart: false,
        bread: [
          {name: "主餐", link: "/"},
          {name: "美式", link: "/"},
          {name: "漢堡", link: "/"},
        ]
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters([
      ])
    },
    methods: {
      ...mapMutations([
        'controlModal'
      ])
    }
  }

</script>


<style lang="stylus">

</style>