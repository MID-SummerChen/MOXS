<template>
  <div class="cart">
      <div class="top">
        <span class="close" @click="CONTROL_MODAL({target: 'cart', boo: false})"><v-icon>clear</v-icon></span>
        <span class="title">{{checkoutType.title}}</span>
        <span class="reset" @click="onReset">重設</span>
      </div>
      <!--<div class="content">填寫預約資料...</div>-->
      
      <div v-if="currentResv.display" class="content" @click="CONTROL_MODAL({target: checkoutType.code === 'resv' ? 'resvCheckout' : 'ordCheckout', boo: true})">
        <!--{{currentResv.display}}-->
        <h5>{{currentResv.display.resvType}}</h5>
        <p>
          {{currentResv.display.date}}
          <span v-if="checkoutType.code === 'resv'">{{currentResv.display.time}}</span>
          <span v-if="checkoutType.code === 'resv' && currentResv.display.resvTypeCode === 'STAYIN'">({{currentResv.display.adultNum}}人)</span>
          <span>{{toPayType(currentResv.display.payType)}}</span>
        </p>
        <p>{{currentResv.display.name}}{{toGender(currentResv.display.gender)}} <span>{{currentResv.display.mobile}}</span></p>
        <p>{{currentResv.display.address}}</p>
      </div>
      <div v-else class="content" @click="CONTROL_MODAL({target: checkoutType.code === 'resv' ? 'resvCheckout' : 'ordCheckout', boo: true})">
        <p>請填寫{{checkoutType.title}}資料</p>
      </div>
      <div ref="scrollBox" class="items">
        <div v-for="(item, i) in orderItems" class="item">
          <div class="item-content" @click="showOrderItem(i)">
            <p class="title">{{item.name}}<mu-icon v-if="item.rtmNote" value="chat" :size="18" color="#ccc"/></p>
            <p v-for="prc in item.prcs" class="sub-title">{{prc.opt.name}} <span>{{item.count}}份</span></p>
            <span v-for="chk in item.chks" class="tags">
              <span v-for="opt in chk.opts">{{opt.name}}</span>
            </span>
          </div>
          <div class="item-price">${{item.unitPrice * item.count}}</div>
          <div class="item-cancel" @click.stop="REMOVE_ORDER_ITEM(i)"><i class="el-icon-close"></i></div>
        </div>
      </div>
      <div class="total">
        合計 NT$ {{orderItemsTotalPrice}}
        <button v-if="checkoutType.code === 'resv'" type="button" class="submit" @click="onResvCheckSubmit">送出{{checkoutType.title}}</button>
        <button v-if="checkoutType.code === 'ord'" type="button" class="submit" @click="onOrdCheckSubmit">送出{{checkoutType.title}}</button>
      </div>

    </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
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
    ...mapState({
      modules: state => state.modules,
      menu: state => state.menu,
    }),
    ...mapGetters([
      'storeList',
      'orderItems',
      'orderItemsTotalPrice',
      'currentResv',
      'checkoutType',
      'checkedOutResv',
    ]),
  },
  mounted() {
    Ps.initialize(this.$refs.scrollBox);
  },
  methods: {
    ...mapMutations([
      'CONTROL_MODAL',
      'REMOVE_ORDER_ITEM',
      'GOT_CHECKOUT_ORDER',
      'CLEAR_CURRENT_RESV',
      'CLEAR_ORDER_ITEM',
      'SET_CURRENT_PRODUCT',
    ]),
    ...mapActions([
      'addResv',
      'addOrd',
      'sendResvVerify',
    ]),
    onResvCheckSubmit() {
      if(this.currentResv.display) {
        this.$confirm('是否送出預約？', '預約確認', {
          confirmButtonText: '確定',
          cancelButtonText: '繼續購物',
          type: 'warning'
        }).then(this.onResvSubmit).catch(() => false);
      }else {
        this.$message("請先填寫預約資訊")
        this.CONTROL_MODAL({target: 'resvCheckout', boo: true})
      }
    },
    onOrdCheckSubmit() {
      if(!this.currentResv.display) {
        this.$message("請先填寫預約資訊")
        this.CONTROL_MODAL({target: 'ordCheckout', boo: true})
        
      }
      else if(!this.isLogin) {
        this.CONTROL_MODAL({target: 'login', boo: true})
      }
      else {
        this.$confirm('是否送出訂單？', '訂單確認', {
          confirmButtonText: '確定',
          cancelButtonText: '繼續購物',
          type: 'warning'
        }).then(this.onOrdSubmit).catch(() => false);
      }
    },
    showOrderItem(targetIndex) {
      this.SET_CURRENT_PRODUCT(targetIndex)
      this.CONTROL_MODAL({target: 'productOrder', boo: true})
    },
    onReset() {
      this.CLEAR_CURRENT_RESV()
      this.CLEAR_ORDER_ITEM()
    },
    async onResvSubmit() {
      var f = this.currentResv.form
      var data = {
        stoResvOptId: f.resvTypeId,
        stoSn: f.store || this.storeList[0].sn,
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
        resvNote: f.note,
      }
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
      console.log(data)
      var res = await this.addResv(data)
      if(res.code === 10) {
        this.CLEAR_CURRENT_RESV()
        this.CLEAR_ORDER_ITEM()
        this.GOT_CHECKOUT_ORDER(res.data)
        console.log(f.payType)
        this.CONTROL_MODAL({target: 'cart', boo: false})
        this.CONTROL_MODAL({target: 'resvSuccess', boo: true})

      }
      
      
    },
    async onOrdSubmit() {
      var f = this.currentResv.form
      var data = {
        stoResvOptId: f.resvTypeId,
        stoSn: f.store || this.storeList[0].sn,
        startAt: f.time,
        userGender: f.gender,
        userCell: f.mobile,
        payType: f.payType,
        userCity: f.city,
        userArea: f.area,
        userAddr: f.addr,
        userName: f.name,
        ordNote: f.note,
      }
      data.ordItem = _.map(this.orderItems, item => {
        return {
          itemSn: item.sn,
          otmAmount: item.count,
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
      console.log(data)
      var res = await this.addOrd(data)
      if(res.code === 10) {
        this.CLEAR_CURRENT_RESV()
        this.CLEAR_ORDER_ITEM()
        this.GOT_CHECKOUT_ORDER(res.data)
        console.log(f.payType)
        this.CONTROL_MODAL({target: 'cart', boo: false})
        if(f.payType === 'ONLINE') {
          this.$router.push({name: "Checkout", query: {chk: this.checkedOutResv.chk.chkSn, ord: this.checkedOutResv.ordSn}})
        }else {
          this.CONTROL_MODAL({target: 'phoneVerify', boo: true})
        }
        

      }
      
    },
  }
}
</script>

<style lang="stylus">

</style>
