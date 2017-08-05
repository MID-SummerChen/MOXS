<template>
  <div id="product-intro-modal" class="my-modal-wrap" @click.self="onClose">
    <div class="modal-box">
      <div v-if="product.sn" ref="scrollBox" class="modal-box-content">
        <el-row :gutter="20">
          <el-col :span="12">
            <img :src="toImgSrc(product.imgUrl)" alt="">
          </el-col>
          <el-col :span="12" class="intro">
            <h5>{{product.name}}</h5>
            <div v-for="attr in product.attrs" class="attr">
              {{attr.name}}: {{attr.value}}
            </div>
            <p class="desc">{{product.desc}}</p>
          </el-col>
        </el-row>
      </div>
      <div class="modal-box-footer">
          <button @click.prevent="onClose">關閉</button>
          <button @click.prevent="onSwitchToOrder" class="text-blue">加入預約</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  import commonMixin from '@/utils/commonMixin'
  export default {
    name: 'ProductModal',
    mixins: [commonMixin],
    data() {
      return {
        product: {},
        form: {
          chkOpts: [],
          prcOpt: {},
          count: 1,
          note: ""
        },
      }
    },
    computed: {
      ...mapGetters([
        'orderItems'
      ]),
      ...mapState({
        itemSn: state => state.productModal.itemSn,
        orderIndex: state => state.productModal.orderIndex,
      })
    },
  async mounted() {
      await this._getItem()
      if(this.orderIndex !== null) {
        this.setOrderedData()
      }
      setTimeout(() => {
        Ps.update(this.$refs.scrollBox)
      })
      
    },
    methods: {
      ...mapMutations([
        'CONTROL_MODAL',
        'ADD_ORDER_ITEM',
        'CLEAR_CURRENT_PRODUCT',
        'UPDATE_ORDER_ITEM',
      ]),
      ...mapActions([
        'getItem',
      ]),
      async _getItem() {
        var sn = this.orderIndex !== null ? this.orderItems[this.orderIndex].sn : this.itemSn
        var res = await this.getItem(sn)
        if(res.code === 10) {
          this.product = res.data
          if(this.product.prcs.length > 0) {
            this.form.prcOpt = this.product.prcs[0].opts[0]
          }
          setTimeout(() => {
            Ps.update(this.$refs.scrollBox)
          })
        }
        return
      },
      setOrderedData() {
        var f = this.form 
        var item = this.orderItems[this.orderIndex]
        console.log(item)
        f.count = item.count
        f.note = item.rtmNote
        f.prcOpt = _.find(this.product.prcs[0].opts, {id: item.prcs[0].opt.id})
        if(item.chks) f.chkOpts = _.map(item.chks[0].opts, "id")
      },
      onSwitchToOrder() {
        this.CONTROL_MODAL({target: 'productIntro', boo: false})
        this.CONTROL_MODAL({target: 'productOrder', boo: true})
      },
      onAddedToCart() {
        var p = this.product
        var item = {
          sn: p.sn,
          name: p.name,
          count: this.form.count,
          unitPrice: this.getUnitPrice(),
          rtmNote: this.form.note,
          prcs: [
            {
              prcId: p.prcs[0] ? p.prcs[0].id : "",
              opt: this.form.prcOpt,
            }
          ]
        }
        if(p.chks[0]) {
          item.chks = [{
          chkId: p.chks[0].id,
          opts: _(p.chks[0].opts).filter(opt => this.form.chkOpts.indexOf(opt.id) > -1).value()
        }]
        }
        
        if(this.orderIndex !== null) {
          this.UPDATE_ORDER_ITEM({index: this.orderIndex, item})
        }else {
          this.ADD_ORDER_ITEM(item)
        }
        
        this.CONTROL_MODAL({target: 'cart', boo: true})
        this.CONTROL_MODAL({target: 'product', boo: false})
        this.CLEAR_CURRENT_PRODUCT()
      },
      onSelectChk(chk, optId) {
        var i = _.indexOf(this.form.chkOpts, optId)
        if(i > -1) {
          this.form.chkOpts = this.form.chkOpts.filter(t => t !== optId)
        }else {
          this.form.chkOpts = this.form.chkOpts.concat([optId])
        }
      },
      getUnitPrice() {
        var selectedChks = _.map(this.form.chkOpts, optId => {
          var i = this.product.chks[0].opts.findIndex(t => t.id === optId)
          return i > -1 ? this.product.chks[0].opts[i] : null
        })

        return this.form.prcOpt.value + _.sumBy(selectedChks, 'value') 
      },
      onClose() {
        this.CLEAR_CURRENT_PRODUCT()
        this.CONTROL_MODAL({target: 'productIntro', boo: false})
      }
    }
  }

</script>

<style lang="stylus">

</style>