<template>
  <div class="page" id="checkout">
    <header-cpt></header-cpt>
    <main>
      <side-bar></side-bar>
    
      <v-content>
        <v-container fluid>
          <h5 class="pageTitle">帳單設定</h5>
          <el-row :gutter="20">
            <el-col :sm="12">
              <div class="paper">
                <div class="items">
                  <div class="item" v-for="n in 6">
                    <div class="title">
                      <p class="name">產品名稱在這</p>
                      <p class="tags"><span>加辣</span><span>加起司</span></p>
                    </div>
                    <div class="count">x3</div>
                    <div class="dollar">$170</div>
                  </div>
                </div>
                <div class="total">
                  <span class="total-count">共3項餐點</span>
                  <span class="total-dollar">合計： <b>$340</b></span>
                </div>
              </div>
            </el-col>
            <el-col :sm="12">
              <div class="paper">
                <div class="form">
                    <div class="form-group">
                    <label>付款方式</label>
                    <div class="selector">歐付寶 <span>信用卡付款</span></div>
                  </div>
                  <div class="form-group">
                    <label>發票類型</label>
                    <div class="selector">電子發票</div>
                  </div>
                  <div class="check-group">
                    <label>
                      <input type="checkbox">
                      需要統一編號？
                    </label>
                  </div>
                  <div class="form-group">
                    <label>公司抬頭</label>
                    <input type="text" placeholder="請輸入公司抬頭">
                  </div>
                  <div class="form-group">
                    <label>統一編號</label>
                    <input type="text" placeholder="請輸入統一編號">
                  </div>
                </div>
                <div class="btn-wrap">
                  <button type="button">確認付款</button>
                </div>

              </div>
            </el-col>

          </el-row>

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
