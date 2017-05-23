<template>
  <div id="product-modal" class="my-modal-wrap" @click.self="controlModal({target: 'product', boo: false})">
    <div class="modal-box">
      <!--<div class="close-btn" @click="controlModal({target: 'product', boo: false})">
        <v-icon>clear</v-icon>
      </div>-->
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
        <div class="content">
          <template v-if="currentTab === 1">
            {{product.desc}}
            <div v-for="attr in product.attrs" class="attr">
              {{attr.name}}: {{attr.value}}
            </div>
          </template>
          <template v-else>
            <div v-for="prc in product.prcs" class="selector-t2">
              <label>{{prc.name}}：</label>
              <el-select v-model="selectedPrc">
                <el-option v-for="opt in prc.opts" :value="opt" :label="opt.name + opt.value + '元'">
                </el-option>
              </el-select>
            </div>
            <!--<div v-for="chk in product.chks" class="selector-t2">
              <label>{{chk.name}}：</label>
              <el-select v-model="selectedChks">
                <el-option v-for="opt in chk.opts" :value="opt" :label="opt.name + opt.value + '元'">
                </el-option>
              </el-select>
            </div>-->
            
            <!--<div class="selector-t2"><span>辣度：</span> <span>中辣</span><i class="el-icon-arrow-down"></i></div>-->
            <!--<div class="selector-t2"><span>副餐：</span> <span>白飯10元</span><i class="el-icon-arrow-down"></i></div>-->
            <!--<div v-for="attr in product.attrs" class="selector-t2">
              <label>{{attr.name}}：</label> 
              <div class="static-content">
                {{attr.value}}
              </div>
            </div>-->
            
            <div v-for="chk in product.chks" class="plus">{{chk.name}}：
              <span v-for="opt in chk.opts" :class="{active: selectedChks.indexOf(opt.id) > -1}" @click="onSelectChk(chk, opt.id)">{{opt.name + opt.value}}</span> 
            </div>
            <div class="total">
              <div>單價
                <p>{{getUnitPrice()}}元</p>
              </div>
              <div class="sign" @click="count > 0 ? count-=1 : null"><span>-</span></div>
              <div>數量
                <p>{{count}}個</p>
              </div>
              <div class="sign"@click="count+=1"><span>+</span></div>
              <div>小計
                <p>{{getUnitPrice() * count}}元</p>
              </div>
            </div>
            <div class="ps">
              <p>備註</p>
              <textarea></textarea>
            </div>
              
          </template>
          
          
        </div>
        <div class="sub-btn-wrap">
          <div class="button" @click="onAddedToCart">加入預約清單</div>
          <div class="button" @click="controlModal({target: 'product', boo: false})">關閉</div>
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
        currentTab: 1,
        selectedPrc: {},
        selectedChks: [],
        count: 1,
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
      this.selectedPrc = this.product.prcs[0].opts[0]
    },
    methods: {
      ...mapMutations([
        'controlModal'
      ]),
      onAddedToCart() {
        this.controlModal({target: 'cart', boo: true})
        this.controlModal({target: 'product', boo: false})
      },
      onSelectChk(chk, optId) {
        var i = _.indexOf(this.selectedChks, optId)
        if(i > -1) {
          this.selectedChks = this.selectedChks.filter(t => t !== optId)
        }else {
          this.selectedChks = this.selectedChks.concat([optId])
        }
      },
      getUnitPrice() {
        var selectedChks = _.map(this.selectedChks, optId => {
          var i = this.product.chks[0].opts.findIndex(t => t.id === optId)
          return i > -1 ? this.product.chks[0].opts[i] : null
        })

        // console.log(selectedChks)
        // console.log(_.sumBy(selectedChks, 'value'))

        return this.selectedPrc.value + _.sumBy(selectedChks, 'value') 
      },
    }
  }

</script>

<style lang="stylus">

</style>