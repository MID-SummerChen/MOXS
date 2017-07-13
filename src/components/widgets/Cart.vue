<template>
  <div class="cart">
      <div class="top">
        <span class="close" @click="controlModal({target: 'cart', boo: false})"><v-icon>clear</v-icon></span>
        
        <span class="title">訂位點餐</span>
        <span class="reset">重設</span>
      </div>
      <!--<div class="content">填寫預約資料...</div>-->
      <div v-if="currentResv.sn" class="content" @click="controlModal({target: 'checkout', boo: true})">
        <h5>{{currentResv.typeName}}</h5>
        <p>
          {{currentResv.date}}
          <span>{{currentResv.startAt}}({{currentResv.adultNum + currentResv.kidNum}}人)</span>
          <span>{{currentResv.payType}}</span>
        </p>
        <p>{{currentResv.name}}{{currentResv.gender}} <span>{{currentResv.cell}}</span></p>
        <p>{{currentResv.city + currentResv.area + currentResv.addr}}</p>
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
        <button type="button" class="submit" @click="controlModal({target: 'checkout', boo: true})">確認預約</button>
      </div>

    </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'LoginModal',
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
    ]),

  }
}
</script>

<style lang="stylus">

</style>
