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
                <p>交易時間：???</p>
                <p>支付類型：歐付寶 信用卡</p>
                <p>發票類型：{{toInvoiceType(chkInfo.invoiceType)}}</p>
                <p v-if="resvInfo.invoiceTitle">發票抬頭：{{chkInfo.invoiceTitle}}</p>
                <p v-if="resvInfo.taxId">統一編號：{{chkInfo.taxId}}</p>
              </el-col>
            </el-row>
          </div>
         
          <div class="btn-wrap">
            <router-link :to="{name: 'MemberRecordDetail', params: {resv_sn: $route.query.resv}}" class="text-blue">查訊預約記錄</router-link>
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
      chkInfo: {},
    }
  },
  mounted() {
    this._getResv()
    if(this.$route.query.chk) {
      this._getResvChk()
    }
  },
  methods: {
    ...mapActions([
      'getAllResvItems',
      'getResvChk',
      'getResv',
    ]),
    async _getResvChk() {
      var res = await this.getResvChk(this.$route.query.resv)
      if(res.code === 10) {
        this.chkInfo = res.data
      }
    },
    async _getResv() {
      var res = await this.getResv(this.$route.query.resv)
      if(res.code === 10) {
        this.resvInfo = res.data
      }
    },

  }
}

</script>


<style lang="stylus">

</style>