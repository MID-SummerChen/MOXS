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
                 v-for="item in items">
              <div class="title">
                <p class="name">{{item.name}} {{item.priceSet[0].opts[0].name}}</p>
                
                <!--<p class="tags">{{item.rtmSubtitle}}</p>-->
                <p v-for="chk in item.checkSet" class="tags">
                  {{chk.name}}: 
                  <span v-for="opt in chk.opts">{{opt.name}}</span>
                </p>
              </div>
              <div class="count">x{{item.amount}}</div>
              <div class="dollar">${{item.totalPrice}}</div>
            </div>
          </div>
          <div class="total">
            合計： <b>${{itemsTotalPrice}}</b>
          </div>
          <div class="form">
            <el-row :gutter="40">
              <el-col :sm="12">
                <div class="form-group">
                  <label>付款方式</label>
                  <!--<div class="selector">歐付寶 <span>信用卡付款</span></div>-->
                  <el-select v-model="form.paySetId" style="width: 100%">
                    <el-option v-for="p in paySets" :label="p.NAME" :value="p.ORG_PAY_SET_ID"></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :sm="12">
                <div class="form-group">
                  <label>發票類型</label>
                  <!--<div class="selector">電子發票</div>-->
                  <el-select v-model="form.invoiceType" style="width: 100%">
                    <!--<el-option v-for="p in paySets" :label="p.NAME" :value="p.ORG_PAY_SET_ID"></el-option>-->
                    <el-option label="電子發票" value="E"></el-option>
                    <el-option label="紙本發票" value="P"></el-option>
                    <el-option label="捐贈" value="D"></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :sm="24">
                <div class="check-group">
                  <label>
                    <input type="checkbox" v-model="form.needTax"> 需要統一編號？
                  </label>
                </div>
              </el-col>
              <template v-if="form.needTax">
                <el-col :sm="12">
                  <div class="form-group">
                    <label>公司抬頭</label>
                    <input type="text" v-model="form.invoiceTitle"
                          placeholder="請輸入公司抬頭">
                  </div>
                </el-col>
                <el-col :sm="12">
                  <div class="form-group">
                    <label>統一編號</label>
                    <input type="text" v-model="form.taxId"
                          placeholder="請輸入統一編號">
                  </div>
                </el-col>
              </template>
            </el-row>
          </div>
          <div class="btn-wrap">
            <a href="" class="text-blue">取消</a>
            <a href="" @click.prevent="onCheckout">確認付款</a>
            <!--<router-link :to="{name: 'CheckoutResult'}">確認付款</router-link>-->
          </div>
          <form v-show="false" ref="hiddingForm" :action="hiddingForm.link" method="post"></form>
  
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Products',
  components: {
    HeaderCpt: Header,
    SideBar,
  },
  data() {
    return {
      items: [],
      form: {
        paySetId: "",
        needTax: false,
        invoiceTitle: "",
        invoiceType: "",
        taxId: "",
      },
      hiddingForm: {
        link: "",
        data: {}
      },
    }
  },
  computed: {
    ...mapState([
      'paySets'
    ]),
    ...mapGetters([
      'apiHost',
      'apiModule',
      'orgSn',
      'sevSn',
    ]),
    itemsTotalPrice() {
      return _.sumBy(this.items, "totalPrice")
    }
  },
  mounted() {
    // this.getResvCheckoutInfo(this.$route.query.resv)
    this._getResvItems()
  },
  methods: {
    ...mapActions([
      'resvCheckout',
      'getResvItems',
    ]),
    async _getResvItems() {
      var res = await this.getResvItems(this.$route.query.resv)
      if(res.code === 10) {
        this.items = res.data.items
      }
    },
    async onCheckout() {
      var data = {
        chkSn: this.$route.query.chk,
        orgPaySetId: "ab87a641-993b-41a6-a667-3d16566064ff",
        payMode: "CREDIT",
        InvoiceType: "E",
      }
      this.hiddingForm.link = `http://${this.apiHost}/${this.apiModule.sev}/api/cs/org/${this.orgSn}/sev/${this.sevSn}/chk/${this.$route.query.chk}/pay`
      this.hiddingForm.data = data
      this.$nextTick(() => {
        _.each(this.hiddingForm.data, (v, k) => {
          $(this.$refs.hiddingForm).append(`<input name='${k}' value='${v}' />`)
        })
        
        this.$refs.hiddingForm.submit();
      })
      
    },
  }
}

</script>


<style lang="stylus">

</style>