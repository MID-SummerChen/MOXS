<template>
  <div id="product-order-modal" class="my-modal-wrap" @click.self="onClose">
    <div class="modal-box">
      <div v-if="product.sn" ref="scrollBox" class="modal-box-content">
        <h5>{{product.name}}</h5>
        <el-row :gutter="20">
          <el-col :span="16" class="form-item">
            <div v-for="prc in product.prcs">
              <mu-select-field v-model="form.prcOptId" label="價格" labelFloat :labelFocusClass="['label-foucs']" style="width: 100%">
                <mu-menu-item v-for="opt in prc.opts" :key="opt.id" :value="opt.id" :title="opt.name + ' $' + opt.value" />
              </mu-select-field>
            </div>
          </el-col>
          <el-col :span="16" class="form-item">
            <!-- {{form.chkOpts}}<br> -->
            <!-- {{form.optAtChk}} -->
            <div v-for="chk in product.chks">
              <!-- <mu-select-field :value="form.optAtChk[chk.id].join()" v-if="form.optAtChk[chk.id] && chk.expOp === 'EQ' && chk.selectNum === 1" :label="chk.name" labelFloat :labelFocusClass="['label-foucs']" style="width: 100%" @change="function(optId) {return onSelectChk(chk, optId)}">
                <mu-menu-item v-for="opt in chk.opts" :key="opt.id" :value="opt.id" :title="opt.name + (opt.value ? opt.value : '')" />
              </mu-select-field> -->
              <mu-select-field v-if="form.optAtChk[chk.id]" :value="form.optAtChk[chk.id]" @change="function(optId) {return onSelectChk(chk, optId)}" multiple :label="chk.name" labelFloat :labelFocusClass="['label-foucs']" style="width: 100%">
                <mu-menu-item v-for="opt in chk.opts" :key="opt.id" :value="opt.id" :title="opt.name + (opt.value ? opt.value : '')" />
              </mu-select-field>
            </div>

          </el-col>
          <el-col :span="16" class="form-item">
            <mu-text-field v-model="form.count" label="數量" labelFloat style="width: 100%"/>
            <!-- <mu-select-field v-model="form.count" :labelFocusClass="['label-foucs']" hintText="數量：" style="width: 100%">
              <mu-menu-item v-for="n in 20" :value="n" :title="n+''" />
            </mu-select-field> -->
          </el-col>
          <el-col :span="8" class="form-item">
            <mu-float-button icon="remove" @click.native="form.count > 1 ? form.count-- : null" mini class="demo-float-button"/>
            <mu-float-button icon="add" @click.native="form.count++" mini class="demo-float-button"/>
          </el-col>
          <el-col :span="16" class="form-item">
            <mu-text-field v-model="form.note" label="備註" labelFloat multiLine :rows="3" style="width: 100%"/>
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
          optAtChk: {},
          prcOptId: null,
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
            this.form.prcOptId = this.product.prcs[0].opts[0].id
          }
          if(this.product.chks.length > 0) {
            _.each(this.product.chks, chk => {
              this.form.optAtChk[chk.id] = []
            })
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
            f.optAtChk[chk.chkId] = _.map(chk.opts, "id")
          })
          this.$forceUpdate()
        }
      },
      onAddedToCart() {
        var p = this.product
        var valid = _(p.chks).map(chk => {
          return this.onCheckOptNum(chk, this.form.optAtChk[chk.id])
        }).every()
        if(valid) {
          var priceOptIndex = _.findIndex(p.prcs[0].opts, {id: this.form.prcOptId})
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
                  opt: p.prcs[0].opts[priceOptIndex],
                }
              ]
            }
            if(p.chks.length > 0) {
              item.chks = _.mapValues(this.form.optAtChk, (opts, chkId) => {
                var i = _.findIndex(p.chks, {id: chkId})
                return {
                    chkId: chkId,
                    opts:  _(p.chks[i].opts).filter(opt => opts.indexOf(opt.id) > -1).value()
                  }
              })
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
        }
        
        
      },
      onSelectChk(chk, optId) {
        // EQ	等於
        // GT	大於
        // LT	小於
        // GE	大於等於
        // LE	小於等於
        console.log(chk, optId)
        var val = []
        val = typeof optId === 'string' ? [optId] : optId
        this.form.optAtChk[chk.id] = val
        this.$forceUpdate()
        
      },
      onCheckOptNum(chk, val) {
        if(chk.expOp === 'EQ') {
          if(!(val.length === chk.selectNum)) {
            this.$message.error(`選擇數量須等於${chk.selectNum}`)
            return false
          }
        }else if(chk.expOp === 'GT') {
          if(!(val.length > chk.selectNum)) {
            this.$message.error(`選擇數量須大於${chk.selectNum}`)
            return false
          }
        }else if(chk.expOp === 'LT') {
          if(!(val.length < chk.selectNum)) {
            this.$message.error(`選擇數量須小於${chk.selectNum}`)
            return false
          }
        }else if(chk.expOp === 'GE') {
          if(!(val.length >= chk.selectNum)) {
            this.$message.error(`選擇數量須大於等於${chk.selectNum}`)
            return false
          }
        }else if(chk.expOp === 'LE') {
          if(!(val.length <= chk.selectNum)) {
            this.$message.error(`選擇數量須小於等於${chk.selectNum}`)
            return false
          }
        }
        return true
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