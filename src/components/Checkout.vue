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
            <div class="item" v-for="item in items">
              <div class="title">
                <p class="name">{{item.title}}</p>
                
                <!--<p class="tags">{{item.rtmSubtitle}}</p>-->
                <p class="tags">{{item.subtitle}}</p>
              </div>
              <div class="count">x{{item.num}}</div>
              <div class="dollar">${{item.total_price}}</div>
            </div>
          </div>
          <div class="total">
            合計： <b>${{itemsTotalPrice}}</b>
          </div>
          <div class="form">
            <el-row :gutter="40">
              <el-col :sm="12">
                <div class="form-group">
                  <label>付款金流</label>
                  <el-select v-model="form.paySetId" style="width: 100%" @change="onPaySetChanged">
                    <el-option v-for="p in paySets" :label="p.NAME + ' - 信用卡'" :value="p.ORG_PAY_SET_ID"></el-option>
                  </el-select>
                </div>
              </el-col>
              <!--<el-col :sm="12">
                <div class="form-group">
                  <label>付款方式</label>
                  <el-select v-model="form.payMode" style="width: 100%">
                    <el-option v-for="t in payModeOpts" :label="t.label" :value="t.value"></el-option>
                  </el-select>
                </div>
              </el-col>-->
              <el-col :sm="12">
                <div class="form-group">
                  <label>發票類型</label>
                  <el-select v-model="form.invoiceType" style="width: 100%">
                    <el-option v-for="t in invoiceTypeOpts" :label="t.label" :value="t.value"></el-option>
                  </el-select>
                </div>
              </el-col>
              <template v-if="form.invoiceType === 'P'">
                <el-col :sm="12">
                  <div class="form-group">
                    <label>發票收件人</label>
                    <input type="text" v-model="form.invoiceReceiver"
                          placeholder="請輸入收件人">
                  </div>
                </el-col>
                <el-col :sm="12">
                  <div class="form-group">
                    <label>發票地址</label>
                    <input type="text" v-model="form.invoiceAddress"
                          placeholder="請輸入地址">
                  </div>
                </el-col>
              </template>
              
              <el-col :sm="24">
                <div class="check-group">
                  <label>
                    <input type="checkbox" v-model="form.invoiceFormatType" true-value="COMPANY" false-value="DEFAULT"> 需要統一編號？
                  </label>
                </div>
              </el-col>
              <template v-if="form.invoiceFormatType === 'COMPANY'">
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
                    <input type="text" v-model="form.taxId" placeholder="請輸入統一編號">
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
          <form v-show="false" ref="hiddingForm" :action="hiddingForm.link" method="post" enctype="multipart/form-data" accept-charset="UTF-8"></form>
  
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
      payModeOpts: [],
      invoiceTypeOpts: [],
      form: {
        paySetId: "",
        payMode: "",
        invoiceFormatType: "DEFAULT",
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
      'account',
      'apiHost',
      'apiModule',
      'orgSn',
      'sevSn',
      'checkoutType',
    ]),
    itemsTotalPrice() {
      return _.sumBy(this.items, "total_price")
    }
  },
  mounted() {
    // this.getResvCheckoutInfo(this.$route.query.resv)
    if(this.checkoutType === 'resv') {
      this._getResvChk()
    }else if(this.checkoutType === 'ord'){
      this._getOrdChk()
    }
    
    this.setForm()
    
  },
  methods: {
    ...mapActions([
      'resvCheckout',
      'getAllResvItems',
      'getResvChk',
      'getOrdChk',
    ]),
    async _getOrdChk() {
      var res = await this.getOrdChk(this.$route.query.ord)
      if(res.code === 10) {
        this.items = res.data.chkDetail
      }
    },
    async _getResvChk() {
      var res = await this.getResvChk(this.$route.query.resv)
      if(res.code === 10) {
        this.items = res.data.chkDetail
      }
    },
    onPaySetChanged() {
      var i = _.findIndex(this.paySets, {ORG_PAY_SET_ID: this.form.paySetId})
      if(i > -1) {
        this.invoiceTypeOpts = _.map(this.paySets[i].INVOICE_TYPE, t => ({label: t.NAME, value: t.VALUE}))
        this.form.invoiceType = this.invoiceTypeOpts[0] ? this.invoiceTypeOpts[0].value : ""
        this.payModeOpts = _.map(this.paySets[i].PAY_MODE, t => ({label: t.NAME, value: t.VALUE}))
        this.form.payMode = this.payModeOpts[0] ? this.payModeOpts[0].value : ""
      }
    },
    setForm() {
      if(this.paySets.length > 0 && this.account.mb) {
        this.form.paySetId = this.paySets[0].ORG_PAY_SET_ID

        var mb = this.account.mb
        this.form.invoiceReceiver = mb.name
        this.form.invoiceAddress = mb.city + mb.area + mb.addr
      }else {
        setTimeout(this.setForm, 500)
      }
      
    },
    // async _getAllResvItems() {
    //   var res = await this.getAllResvItems(this.$route.query.resv)
    //   if(res.code === 10) {
    //     this.items = res.data.items
    //   }
    // },
    async onCheckout() {
      var f = this.form
      var data = {
        chkSn: this.$route.query.chk,
        orgPaySetId: f.paySetId,
        chkType: "DEFAULT",
        payMode: f.payMode,
        InvoiceType: f.invoiceType,
        invoiceReceiver: f.invoiceReceiver,
        invoiceAddress: f.invoiceAddress,

        invoiceFormatType: f.invoiceFormatType,
        invoiceTitle: f.invoiceTitle,
        taxId: f.taxId,
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