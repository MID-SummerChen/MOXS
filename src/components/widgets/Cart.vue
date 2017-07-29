<template>
  <div class="cart">
      <div class="top">
        <span class="close" @click="CONTROL_MODAL({target: 'cart', boo: false})"><v-icon>clear</v-icon></span>
        
        <span class="title">訂位點餐</span>
        <span class="reset" @click="onReset">重設</span>
      </div>
      <!--<div class="content">填寫預約資料...</div>-->
      <div v-if="currentResv.display" class="content" @click="CONTROL_MODAL({target: checkoutType === 'resv' ? 'resvCheckout' : 'ordCheckout', boo: true})">
        <!--{{currentResv.display}}-->
        <h5>{{currentResv.display.resvType}}</h5>
        <p>
          {{currentResv.display.date}}
          <span v-if="checkoutType === 'resv'">{{currentResv.display.time}}({{currentResv.display.adultNum + currentResv.display.kidNum}}人)</span>
          <span>{{toPayType(currentResv.display.payType)}}</span>
        </p>
        <p>{{currentResv.display.name}}{{toGender(currentResv.display.gender)}} <span>{{currentResv.display.mobile}}</span></p>
        <p>{{currentResv.display.address}}</p>
      </div>
      <div v-else class="content" @click="CONTROL_MODAL({target: checkoutType === 'resv' ? 'resvCheckout' : 'ordCheckout', boo: true})">
        <h5>預約資訊</h5>
        <p>請填寫預約資料</p>
      </div>
      <div ref="scrollBox" class="items">
        <div v-for="(item, i) in orderItems" class="item">
          <div class="item-content" @click="showOrderItem(i)">
            <p class="title">{{item.name}}</p>
            <p v-for="prc in item.prcs" class="sub-title">{{prc.opt.name}} <span>{{item.count}}份</span></p>
            <p v-for="chk in item.chks" class="tags">
              <span v-for="opt in chk.opts">加{{opt.name}}</span>
            </p>
          </div>
          <div class="item-price">${{item.unitPrice * item.count}}</div>
          <div class="item-cancel" @click.stop="REMOVE_ORDER_ITEM(i)"><i class="el-icon-close"></i></div>
        </div>
      </div>
      <div class="total">
        合計 NT$ {{orderItemsTotalPrice}}
        <button type="button" class="submit" @click="onCheckSubmit">確認預約</button>
      </div>

    </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
import commonMixin from '@/utils/commonMixin'
export default {
  name: 'Cart',
  mixins: [commonMixin],
  data() {
    return {
      signupMode: false,
    }
  },
  computed: {
    ...mapGetters([
      'storeList',
      'orderItems',
      'orderItemsTotalPrice',
      'currentResv',
      'checkoutType',
    ]),
  },
  mounted() {
    Ps.initialize(this.$refs.scrollBox);
  },
  methods: {
    ...mapMutations([
      'CONTROL_MODAL',
      'REMOVE_ORDER_ITEM',
      'SAVE_CHECKED_OUT_RESV',
      'CLEAR_CURRENT_RESV',
      'CLEAR_ORDER_ITEM',
      'SET_CURRENT_PRODUCT',
    ]),
    ...mapActions([
      'addResv',
      'addOrd',
      'sendResvVerify',
    ]),
    onCheckSubmit() {
      if(this.currentResv.display) {
        this.$confirm('是否送出預約？', '預約確認', {
          confirmButtonText: '確定',
          cancelButtonText: '繼續購物',
          type: 'warning'
        }).then(this.onSubmit).catch(() => false);
      }else {
        this.$message("請先填寫預約資訊")
        this.CONTROL_MODAL({target: this.checkoutType === 'resv' ? 'resvCheckout' : 'ordCheckout', boo: true})
      }
      
    },
    showOrderItem(targetIndex) {
      this.SET_CURRENT_PRODUCT(targetIndex)
      this.CONTROL_MODAL({target: 'product', boo: true})
    },
    onReset() {
      this.CLEAR_CURRENT_RESV()
      this.CLEAR_ORDER_ITEM()
    },
    async onSubmit() {
      var f = this.currentResv.form
      var data = {
        stoResvOptId: f.resvTypeId,
        stoSn: f.store || this.storeList.sn,
        date: moment(f.date).format("YYYY-MM-DD"),
        startAt: f.time,
        adultNum: f.adultNum,
        kidNum: f.kidNum,
        gender: f.gender,
        cell: f.mobile,
        payType: f.payType,
        city: f.city,
        area: f.area,
        addr: f.addr,
        name: f.name,
      }
      if(this.checkoutType === 'resv') {
        data.items = _.map(this.orderItems, item => {
          return {
            itemSn: item.sn,
            amount: item.count,
            chks: _.map(item.chks, chk => {
              return {
                chkId: chk.chkId,
                opts: _.map(chk.opts, opt => ({optId: opt.id}))
              }
            }),
            prcs: _.map(item.prcs, prc => {
              return {
                prcId: prc.prcId,
                opts: [{optId: prc.opt.id}]
              }
            }),
          }
        })
        data.items = _.map(data.items, item => {
          item.chks = _.filter(item.chks, chk => chk.opts.length > 0)
          return item
        })
      }else {
        data.ordItem = _.map(this.orderItems, item => {
          return {
            itemSn: item.sn,
            amount: item.count,
            chks: _.map(item.chks, chk => {
              return {
                chkId: chk.chkId,
                opts: _.map(chk.opts, opt => ({optId: opt.id}))
              }
            }),
            prcs: _.map(item.prcs, prc => {
              return {
                prcId: prc.prcId,
                opts: [{optId: prc.opt.id}]
              }
            }),
          }
        })
        data.ordItem = _.map(data.ordItem, item => {
          item.chks = _.filter(item.chks, chk => chk.opts.length > 0)
          return item
        })
      }
      
      console.log(data)
      var res = await this[this.checkoutType === 'resv' ? 'addResv' : 'addOrd'](data)
      if(res.code === 10) {
        this.CLEAR_CURRENT_RESV()
        this.CLEAR_ORDER_ITEM()
        this.SAVE_CHECKED_OUT_RESV(res.data)
        console.log(f.payType)
        this.CONTROL_MODAL({target: 'cart', boo: false})
        this.CONTROL_MODAL({target: 'phoneVerify', boo: true})

      }
    },
  }
}
</script>

<style lang="stylus">

</style>
