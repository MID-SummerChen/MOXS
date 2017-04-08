<template>
  <v-content>
    <v-container fluid>
      <div class="main-title">
        <ul>
          <li>帳單設定</li>
        </ul>
      </div>
      <div class="main-content">
        <div class="paper">
          <div class="items-header">
            <div class="title">產品名稱</div>
            <div class="count">數量</div>
            <div class="dollar">價格</div>
          </div>
          <div class="items">
            <div class="item"
                 v-for="n in 6">
              <div class="title">
                <p class="name">產品名稱在這</p>
                <p class="tags"><span>加辣</span><span>加起司</span></p>
              </div>
              <div class="count">x3</div>
              <div class="dollar">$170</div>
            </div>
          </div>
          <div class="total">
            合計： <b>$340</b>
          </div>
          <div class="form">
            <el-row :gutter="40">
              <el-col :sm="12">
                <div class="form-group">
                  <label>付款方式</label>
                  <div class="selector">歐付寶 <span>信用卡付款</span></div>
                </div>
              </el-col>
              <el-col :sm="12">
                <div class="form-group">
                  <label>發票類型</label>
                  <div class="selector">電子發票</div>
                </div>
              </el-col>
              <el-col :sm="24">
                <div class="check-group">
                  <label>
                    <input type="checkbox"> 需要統一編號？
                  </label>
                </div>
              </el-col>
              <el-col :sm="12">
                <div class="form-group">
                  <label>公司抬頭</label>
                  <input type="text"
                        placeholder="請輸入公司抬頭">
                </div>
              </el-col>
              <el-col :sm="12">
                <div class="form-group">
                  <label>統一編號</label>
                  <input type="text"
                        placeholder="請輸入統一編號">
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="btn-wrap">
            <a href="" class="text-blue">取消</a>
            <router-link :to="{name: 'CheckoutResult'}">確認付款</router-link>
          </div>
  
        </div>
      </div>
  
    </v-container>
  </v-content>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import SideBar from '@/components/layout/SideBar.vue'
import eventHub from '@/utils/eventHub'
import commonMixin from '@/utils/commonMixin'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Products',
  components: {
    HeaderCpt: Header,
    SideBar,
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}

</script>


<style lang="stylus">

</style>