<template>
  <div class="cart">
      <div class="top">
        <span class="close" @click="controlModal({target: 'cart', boo: false})"><v-icon>clear</v-icon></span>
        
        <span class="title">訂位點餐</span>
        <span class="reset">重設</span>
      </div>
      <!--<div class="content">填寫預約資料...</div>-->
      <div v-if="currentResv.display" class="content" @click="controlModal({target: 'checkout', boo: true})">
        <!--{{currentResv.display}}-->
        <h5>{{currentResv.display.resvType}}</h5>
        <p>
          {{currentResv.display.date}}
          <span>{{currentResv.display.time}}({{currentResv.display.adultNum + currentResv.display.kidNum}}人)</span>
          <span>{{toPayType(currentResv.display.payType)}}</span>
        </p>
        <p>{{currentResv.display.name}}{{toGender(currentResv.display.gender)}} <span>{{currentResv.display.mobile}}</span></p>
        <p>{{currentResv.display.address}}</p>
      </div>
      <div v-else class="content" @click="controlModal({target: 'checkout', boo: true})">
        <h5>預約資訊</h5>
        <p>請填寫預約資料</p>
      </div>
      <div ref="scrollBox" class="items">
        <div v-for="item in orderItems" class="item">
          <div class="item-content">
            <p class="title">{{item.name}}</p>
            <p v-for="prc in item.prcs" class="sub-title">{{prc.opt.name}} <span>{{item.count}}份</span></p>
            <p v-for="chk in item.chks" class="tags">
              <span v-for="opt in chk.opts">加{{opt.name}}</span>
            </p>
          </div>
          <div class="item-price">${{item.unitPrice * item.count}}</div>
          <div class="item-cancel" @click="REMOVE_ORDER_ITEM(item.sn)"><i class="el-icon-close"></i></div>
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
      signupMode: false
    }
  },
  computed: {
    ...mapGetters([
      'orderItems',
      'orderItemsTotalPrice',
      'currentResv',
    ]),
  },
  mounted() {
    Ps.initialize(this.$refs.scrollBox);
  },
  methods: {
    ...mapMutations([
      'controlModal',
      'REMOVE_ORDER_ITEM',
      'SAVE_CHECKED_OUT_RESV',
    ]),
    ...mapActions([
      'addResv',
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
        this.controlModal({target: 'checkout', boo: true})
      }
      
    },
    async onSubmit() {
      var f = this.currentResv.form
      var data = {
        stoResvOptId: f.resvTypeId,
        stoSn: f.store,
        date: moment(f.date).format("YYYY-MM-DD"),
        startAt: f.time,
        adultNum: f.adultNum,
        kidNum: f.adultNum,
        gender: f.gender,
        cell: f.mobile,
        payType: f.payType,
        city: f.city,
        area: f.area,
        addr: f.addr,
        name: f.name,
        items: _.map(this.orderItems, item => {
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
      }
      data.items = _.map(data.items, item => {
        item.chks = _.filter(item.chks, chk => chk.opts.length > 0)
        return item
      })
      console.log(data)
      var res = await this.addResv(data)
      if(res.code === 10) {
        this.SAVE_CHECKED_OUT_RESV(res.data)
        console.log(f.payType)
        
        if(f.payType === "ONLINE") {
          var query = {resv: res.data.sn, chk: res.data.chk.chkSn}
          console.log(query)
          this.$router.push({name: "Checkout", query})
          this.controlModal({target: 'cart', boo: false})
        }else {
          var r = await this.sendResvVerify(res.data.sn)
          if(r.code === 10) {
            this.$message('已發送驗證碼');
            this.controlModal({target: 'phoneVerify', boo: true})
          }
        }

      }
    },
  }
}
</script>

<style lang="stylus">

</style>
