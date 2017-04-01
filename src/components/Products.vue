<template>
  <div class="page" id="products">
    <header-cpt></header-cpt>
    <main>
      <side-bar></side-bar>
      <div class="cart">
        <div class="title">訂位點餐</div>
        <div class="subTitle">請填妥下方預約資訊，完成後按下預約確認按鈕即可完成預約。</div>
        <!--<div class="content">填寫預約資料...</div>-->
        <div class="content">
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
            <div class="item-img"><img src="/static/imgs/food03.jpg"></div>
            <div class="item-content">
              <p class="title">餐點的名稱</p>
              <p class="tags"><span>加雞蛋</span><span>加雞蛋</span><span>加雞蛋</span></p>
              <p class="dollar">$180</p>
            </div>
            <div class="item-cancel"><i class="el-icon-close"></i></div>
          </div>
        </div>
        <div class="total">
          合計 NT$ 170
          <button type="button" class="submit" @click="$router.push({name: 'Checkout'})">確認預約</button>
        </div>
        
      </div>
      <v-content>
        <v-container fluid>
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">主餐</el-breadcrumb-item>
            <el-breadcrumb-item>西式</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="margin-top: 20px"></div>

          <div>
            <el-button v-for="n in 8">漢堡</el-button>
          </div>

          <div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="8" :md="6" v-for="(o, index) in 10" style="padding: 10px">
                <el-card :body-style="{ padding: '0px' }">
                  <img src="/static/imgs/food03.jpg" class="image">
                  <div class="card-content">
                    <div>
                      <p class="tag">微辣</p>
                      <p class="title">藍帶豬排堡</p>
                      <p class="dollar">$180</p>
                    </div>
                    <div class="icon-plus"></div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

        </v-container>
      </v-content>

    </main>
  </div>

</template>

<script>
  import Header from '@/components/layout/Header.vue'
  import SideBar from '@/components/layout/SideBar.vue'
  import QRCodeModal from '@/components/widgets/QRCodeModal.vue'
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    name: 'Products',
    components: {
      HeaderCpt: Header,
      SideBar,
      QrcodeModal: QRCodeModal
    },
    data () {
      return {
      }
    },
    mounted() {
    }
  }
</script>


<style lang="stylus">

</style>
