<template>
  <v-content>
    <v-container fluid>
      <div class="main-title">
        <ul>
          <li>交易結果</li>
        </ul>
      </div>
      <div class="main-content">
        <div class="paper">
          <div class="status is-success">
            <i class="fa fa-check-circle"></i>預約成功
          </div>
          <!--<div class="status is-error">
            <i class="fa fa-times-circle"></i> 預約失敗
          </div>-->
          <div class="content-wrap">
            <template v-if="checkoutType.code === 'resv'">
              預約號碼
              <div v-if="resvInfo.resvCode" class="number-box">
                {{resvInfo.resvCode.slice(resvInfo.resvCode.length-4)}}
              </div>
              <el-row :gutter="40">
                <el-col :sm="12">
                  <p>紀錄編號：{{resvInfo.sn}}</p>
                  <p>預約分店：{{resvInfo.stoSn}}</p>
                  <p>預約類型：{{toResvType(resvInfo.typeName)}}</p>
                  <p>預約時間：{{resvInfo.date}} {{resvInfo.startAt}}</p>
                  <p>預約人數：{{resvInfo.adultNum + resvInfo.kidNum}}</p>
                  <p>預約人：{{resvInfo.name}} {{toGender(resvInfo.gender)}} {{resvInfo.cell}}</p>
                  <p>地址：{{resvInfo.city + resvInfo.area + resvInfo.addr}}</p>
                  <p>付款方式：{{toPayType(resvInfo.payType)}} <span style="color: #f53b11">[{{toChkStatus(resvInfo.status)}}]</span></p>
                  <p>建檔時間：{{resvInfo.createAt}}</p>
                </el-col>
                <el-col v-if="chkInfo.chkSn" :sm="12">
                  <p>帳單編號：{{chkInfo.chkSn}}</p>
                  <p>帳單金額：${{resvInfo.totalPrice}}</p>
                  <p>交易時間：{{chkInfo.updateAt}}</p>
                  <p>支付類型：{{toPayMode(chkInfo.payMode)}}</p>
                  <p>發票類型：{{toInvoiceType(chkInfo.invoiceType)}}</p>
                  <p v-if="chkInfo.invoiceTitle">發票抬頭：{{chkInfo.invoiceTitle}}</p>
                  <p v-if="chkInfo.taxId">統一編號：{{chkInfo.taxId}}</p>
                </el-col>
              </el-row>
            </template>
            <template v-if="checkoutType.code === 'ord'">
              <el-row :gutter="40" v-if="checkoutType.code === 'ord'">
                <el-col :sm="12">
                  <p>紀錄編號：{{ordInfo.ordSn}}</p>
                  <p>預約分店：{{ordInfo.stoSn}}</p>
                  <p>預約人：{{ordInfo.userName}} {{toGender(ordInfo.gender)}} {{ordInfo.userCell}}</p>
                  <p>地址：{{ordInfo.userCity + ordInfo.userArea + ordInfo.userAddr}}</p>
                  <p>付款方式：{{toPayType(ordInfo.payType)}} <span style="color: #f53b11">[{{toChkStatus(ordInfo.ordStatus)}}]</span></p>
                  <p>建檔時間：{{ordInfo.createAt}}</p>
                </el-col>
                <el-col v-if="chkInfo.chkSn" :sm="12">
                  <p>帳單編號：{{chkInfo.chkSn}}</p>
                  <p>帳單金額：${{ordInfo.ordTotalPrice}}</p>
                  <p>交易時間：{{chkInfo.updateAt}}</p>
                  <p>支付類型：{{toPayMode(chkInfo.payMode)}}</p>
                  <p>發票類型：{{toInvoiceType(chkInfo.invoiceType)}}</p>
                  <p v-if="chkInfo.invoiceTitle">發票抬頭：{{chkInfo.invoiceTitle}}</p>
                  <p v-if="chkInfo.taxId">統一編號：{{chkInfo.taxId}}</p>
                </el-col>
              </el-row>
            </template>
            
          </div>
         
          <div class="btn-wrap">
            <a v-if="checkoutType.code === 'resv'" href="" @click.prevent="goToResvRecord" class="text-blue">查訊預約記錄</a>
            <a v-if="checkoutType.code === 'ord'" href="" @click.prevent="goToOrdRecord" class="text-blue">查訊訂單記錄</a>
            <!-- <router-link :to="{name: 'ResvRecordDetail', params: {resv_sn: $route.query.resvSn}}" class="text-blue">查訊預約記錄</router-link> -->
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
  name: 'CheckoutResult',
  mixins: [commonMixin],
  components: {
    HeaderCpt: Header,
    SideBar,
  },
  data() {
    return {
      resvInfo: {},
      ordInfo: {},
      chkInfo: {},
    }
  },
  mounted() {
    
    if(this.checkoutType.code === 'resv') {
      this._getResv()
      this._getResvChk()
    }else if(this.checkoutType.code === 'ord') {
      this._getOrd()
      this._getOrdChk()
    }
  },
  computed: {
    ...mapGetters([
      'checkoutType'
    ])
  },
  methods: {
    ...mapActions([
      'getAllResvItems',
      'getResvChk',
      'getResv',
      'getOrdChk',
      'getOrd',
    ]),
    goToResvRecord() {
      this.$router.push({name: 'ResvRecordDetail', params: {resv_sn: this.$route.query.resvSn}})
    },
    goToOrdRecord() {
      this.$router.push({name: 'OrdRecordDetail', params: {ord_sn: this.$route.query.ordSn}})
    },
    async _getResvChk() {
      var res = await this.getResvChk(this.$route.query.resvSn)
      if(res.code === 10) {
        this.chkInfo = res.data
      }
    },
    async _getResv() {
      var res = await this.getResv(this.$route.query.resvSn)
      if(res.code === 10) {
        this.resvInfo = res.data
      }
    },
    async _getOrdChk() {
      var res = await this.getOrdChk(this.$route.query.ordSn)
      if(res.code === 10) {
        this.chkInfo = res.data
      }
    },
    async _getOrd() {
      var res = await this.getOrd(this.$route.query.ordSn)
      if(res.code === 10) {
        this.ordInfo = res.data
      }
    },

  }
}

</script>


<style lang="stylus">

</style>