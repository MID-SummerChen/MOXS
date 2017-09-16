<template>
  <div id="product-order-modal" class="my-modal-wrap" @click.self="onClose">
    <div class="modal-box">
      <div v-if="product.sn" ref="scrollBox" class="modal-box-content">
        <h5>{{product.name}}</h5>
        <el-row :gutter="20">
          <el-col :span="16" class="form-item">
            <div v-for="prc in product.prcs">
              <mu-select-field :disabled="prc.opts.length === 1" v-model="form.prcOptId" label="價格" labelFloat :labelFocusClass="['label-foucs']" style="width: 100%">
                <mu-menu-item v-for="opt in prc.opts" :key="opt.id" :value="opt.id" :title="opt.name + ' $' + opt.value" />
              </mu-select-field>
            </div>
          </el-col>
          <el-col :span="16" class="form-item">
            <div v-for="chk in product.chks">
              <!-- {{chekChkNum(chk)}} -->
              <!-- {{chk.submitType}} -->
              <template v-if="chekChkNum(chk) === 'single'">
                <mu-select-field v-if="form.optAtChk[chk.id]" :value="form.optAtChk[chk.id]" @change="function(optId) {return onSelectChk(chk, optId)}" multiple :label="chk.name" labelFloat :labelFocusClass="['label-foucs']" style="width: 100%">
                  <mu-menu-item v-for="opt in chk.opts" :key="opt.id" :value="opt.id" :title="opt.name + (opt.value ? opt.value + product.unit : '')" />
                </mu-select-field>
              </template>
              <div style="margin-bottom: 15px" v-else>
                <p style="margin-bottom: 10px; font-size: 12px; color: #666">{{chk.name}}</p>
                <span class="chkItem" :class="{selected: form.optAtChk[chk.id].indexOf(opt.id) > -1}" v-for="opt in chk.opts" @click="onSelectChk(chk, opt.id)">{{opt.name}} ${{opt.value}}</span>
              </div>
              
              
            </div>

          </el-col>
          <el-col :span="16" class="form-item">
            <mu-text-field v-model="form.count" :label="'數量(' + product.unit + ')'" labelFloat style="width: 100%"/>
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
          <button @click.prevent="onAddedToCart" class="text-blue">{{orderIndex !== null ? '修改項目' : '確認加入'}}</button>
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
          if(chk.submitType === 'REQUIRED' || this.form.optAtChk[chk.id].length > 0) {
            return this.onCheckOptNum(chk, this.form.optAtChk[chk.id])
          }else {
            return true
          }
          
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
              unit: p.unit,
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
        // val = typeof optId === 'string' ? [optId] : optId
        if(typeof optId === 'string') {
          var i = this.form.optAtChk[chk.id].indexOf(optId)
          console.log(i)
          val = i > -1 ? this.form.optAtChk[chk.id].filter(id => id !== optId) : this.form.optAtChk[chk.id].concat(optId)
        }else {
          val = optId
        }

        this.form.optAtChk[chk.id] = val
        
        this.$forceUpdate()
        
      },
      chekChkNum(chk) {
        if(chk.expOp === 'EQ') {
          return chk.selectNum >= 2 ? 'multi' : 'single'
        }else if(chk.expOp === 'GT') {
          return 'multi'
        }else if(chk.expOp === 'LT') {
          return chk.selectNum > 2 ? 'multi' : 'single'
        }else if(chk.expOp === 'GE') {
          return 'multi'
        }else if(chk.expOp === 'LE') {
          return chk.selectNum >= 2 ? 'multi' : 'single'
        }
      },
      onCheckOptNum(chk, val) {
        console.log(chk)
        if(chk.expOp === 'EQ') {
          if(!(val.length === chk.selectNum)) {
            this.$message.error(`${chk.name}數量須為${chk.selectNum}個`)
            return false
          }
        }else if(chk.expOp === 'GT') {
          if(!(val.length > chk.selectNum)) {
            this.$message.error(`${chk.name}數量須為${chk.selectNum+1}個以上`)
            return false
          }
        }else if(chk.expOp === 'LT') {
          if(!(val.length < chk.selectNum)) {
            this.$message.error(`${chk.name}數量須為${chk.selectNum-1}個以下`)
            return false
          }
        }else if(chk.expOp === 'GE') {
          if(!(val.length >= chk.selectNum)) {
            // this.$message.error(`${chk.name}數量須大於等於${chk.selectNum}`)
            this.$message.error(`${chk.name}數量須為${chk.selectNum}個以上`)
            return false
          }
        }else if(chk.expOp === 'LE') {
          if(!(val.length <= chk.selectNum)) {
            // this.$message.error(`${chk.name}數量須小於等於${chk.selectNum}`)
            this.$message.error(`${chk.name}數量須為${chk.selectNum}個以下`)
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