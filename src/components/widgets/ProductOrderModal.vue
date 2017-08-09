<template>
  <div id="product-order-modal" class="my-modal-wrap" @click.self="onClose">
    <div class="modal-box">
      <div v-if="product.sn" ref="scrollBox" class="modal-box-content">
        <h5>{{product.name}}</h5>
        <el-row :gutter="20">
          <el-col :span="24" class="form-item">
            <div v-for="prc in product.prcs">
              <mu-select-field v-model="form.prcOptId" hintText="價格：" :labelFocusClass="['label-foucs']" style="width: 100%">
                <mu-menu-item v-for="opt in prc.opts" :key="opt.id" :value="opt.id" :title="opt.name + ' $' + opt.value" />
              </mu-select-field>
            </div>
          </el-col>
          <el-col :span="24" class="form-item">
            <div v-for="chk in product.chks" class="plus">{{chk.name}}：
              <span v-for="opt in chk.opts" :class="{active: form.chkOpts.findIndex(chk => chk.optId === opt.id) > -1}" @click="onSelectChk(chk, opt.id)">{{opt.name + opt.value}}</span> 
            </div>
          </el-col>
          <el-col :span="24" class="form-item">
            <mu-select-field v-model="form.count" :labelFocusClass="['label-foucs']" hintText="數量：" style="width: 100%">
              <mu-menu-item v-for="n in 20" :value="n" :title="n+''" />
            </mu-select-field>
          </el-col>
          <el-col :span="24" class="form-item">
            <mu-text-field v-model="form.note" hintText="備註：" multiLine :rows="6" style="width: 100%"/>
          </el-col>
        </el-row>
      </div>
      <div class="modal-box-footer">
          <button @click.prevent="onClose">取消</button>
          <button @click.prevent="onAddedToCart" class="text-blue">確認加入</button>
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
          prcOptId: null,
          count: "",
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
            // this.form.prcOptId = this.product.prcs[0].opts[0].id
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
        f.prcOptId = item.prcs[0].opt.id
        if(item.chks) {
          _.each(item.chks, chk => {
            _.each(chk.opts, opt => {
              f.chkOpts = f.chkOpts.concat({chkId: chk.chkId, optId: opt.id})
            })
          })
        }
      },
      onAddedToCart() {
        var p = this.product
        var priceOptIndex = _.findIndex(this.product.prcs[0].opts, {id: this.form.prcOptId})
        if(priceOptIndex > -1) {
          var item = {
            sn: p.sn,
            name: p.name,
            count: this.form.count,
            unitPrice: this.getUnitPrice(),
            rtmNote: this.form.note,
            prcs: [
              {
                prcId: p.prcs[0] ? p.prcs[0].id : "",
                opt: this.product.prcs[0].opts[priceOptIndex],
              }
            ]
          }
          console.dir(_(this.form.chkOpts).groupBy('chkId').value())
          if(p.chks[0]) {
            item.chks = _(this.form.chkOpts).groupBy('chkId').map(_opts =>{
              var i = _.findIndex(p.chks, {id: _opts[0].chkId})
              if(i > -1) {
                return {
                  chkId: p.chks[i].id,
                  opts: _(p.chks[i].opts).filter(opt => _.findIndex(_opts, {optId: opt.id}) > -1).value()
                }
              }
              
            }).value()
          }
          
          if(this.orderIndex !== null) {
            this.UPDATE_ORDER_ITEM({index: this.orderIndex, item})
          }else {
            this.ADD_ORDER_ITEM(item)
          }
          
          this.CONTROL_MODAL({target: 'cart', boo: true})
          this.CONTROL_MODAL({target: 'productOrder', boo: false})
          this.CLEAR_CURRENT_PRODUCT()
        }
        
      },
      onSelectChk(chk, optId) {
        var i = _.findIndex(this.form.chkOpts, {optId})
        var count = _.filter(this.form.chkOpts, {chkId: chk.id}).length
        if(i > -1) {
          this.form.chkOpts = this.form.chkOpts.filter(t => t.optId !== optId)
        }else if(chk.selectNum > count) {
          this.form.chkOpts = this.form.chkOpts.concat({chkId: chk.id, optId})
        }
      },
      getUnitPrice() {
        var selectedChks = _.map(this.form.chkOpts, chk => {
          var i = this.product.chks[0].opts.findIndex(t => t.id === chk.optId)
          return i > -1 ? this.product.chks[0].opts[i] : null
        })
        var priceOptIndex = _.findIndex(this.product.prcs[0].opts, {id: this.form.prcOptId})
        if(priceOptIndex > -1) {
          return this.product.prcs[0].opts[priceOptIndex].value + _.sumBy(selectedChks, 'value') 
        }
        
      },
      onClose() {
        this.CLEAR_CURRENT_PRODUCT()
        this.CONTROL_MODAL({target: 'productOrder', boo: false})
      }
    }
  }

</script>

<style lang="stylus">

</style>