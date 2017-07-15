<template>
  <div id="product-modal" class="my-modal-wrap" @click.self="controlModal({target: 'product', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="controlModal({target: 'product', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      <div class="modal-box-content">
        <div class="img-wrap">
          <img src="/static/imgs/food03.jpg" alt="">
        </div>
        <h5>{{product.name}}</h5>
        <!--{{product}}-->
        <div class="btn-wrap">
          <button class="my-btn t1" :class="{active: currentTab === 1}" @click="currentTab = 1">餐點介紹</button>
          <button class="my-btn t1" :class="{active: currentTab === 2}" @click="currentTab = 2">餐點預定</button>
        </div>
        <div class="content" ref="scrollBox">
          <template v-if="currentTab === 1">
            {{product.desc}}
            <div v-for="attr in product.attrs" class="attr">
              {{attr.name}}: {{attr.value}}
            </div>
            <div style="margin-top: 30px"></div>
          </template>
          <template v-else>
            <div v-for="prc in product.prcs" class="selector-t2">
              <label>{{prc.name}}：</label>
              <el-select v-model="form.prcOpt">
                <el-option v-for="opt in prc.opts" :value="opt" :label="opt.name + opt.value + '元'">
                </el-option>
              </el-select>
            </div>
            

            <div v-for="chk in product.chks" class="plus">{{chk.name}}：
              <span v-for="opt in chk.opts" :class="{active: form.chkOpts.indexOf(opt.id) > -1}" @click="onSelectChk(chk, opt.id)">{{opt.name + opt.value}}</span> 
            </div>
            <div v-if="product.prcs.length > 0" class="total">
              <div>單價
                <p>{{getUnitPrice()}}元</p>
              </div>
              <div class="sign" @click="form.count > 0 ? form.count-=1 : null"><span>-</span></div>
              <div>數量
                <p>{{form.count}}個</p>
              </div>
              <div class="sign"@click="form.count+=1"><span>+</span></div>
              <div>小計
                <p>{{getUnitPrice() * form.count}}元</p>
              </div>
            </div>
            <div v-else class="singleCount">
              <span>數量：</span>
              <el-input-number v-model="form.count" :min="1" :max="10" size="small" ></el-input-number>
            </div>
            <div class="ps">
              <p>備註</p>
              <textarea v-model="form.note"></textarea>
            </div>
              
          </template>
          
          
        </div>
        <div class="sub-btn-wrap">
          <div v-show="currentTab === 2" class="button" @click="onAddedToCart">加入預約清單</div>
          <!--<div class="button" @click="controlModal({target: 'product', boo: false})">關閉</div>-->
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'ProductModal',
    data() {
      return {
        currentTab: 2,
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
      ]),
      ...mapState({
        product: state => state.productModal.product
      })
    },
    mounted() {
      Ps.initialize(this.$refs.scrollBox);
      if(this.product.prcs.length > 0) {
        this.form.prcOpt = this.product.prcs[0].opts[0]
      }
      
    },
    watch: {
      currentTab() {
        setTimeout(() => {
          Ps.update(this.$refs.scrollBox)
        })
      }
    },
    methods: {
      ...mapMutations([
        'controlModal',
        'ADD_ORDER_ITEM',
      ]),
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
          ],
          chks: [
            {
              chkId: p.chks[0].id,
              opts: _(p.chks[0].opts).filter(opt => this.form.chkOpts.indexOf(opt.id) > -1).value()
            }
          ]
        }
        this.ADD_ORDER_ITEM(item)
        this.controlModal({target: 'cart', boo: true})
        this.controlModal({target: 'product', boo: false})
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
    }
  }

</script>

<style lang="stylus">

</style>