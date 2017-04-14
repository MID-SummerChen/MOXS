<template>
  <div id="checkout-modal" class="my-modal-wrap" @click.self="controlModal({target: 'checkout', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="controlModal({target: 'checkout', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      
      <div class="modal-box-content">
        <div class="btn-wrap">
          <div class="my-btn t2" :class="{active: currentTab === 1}" @click="currentTab = 1">預約座位</div>
          <div class="my-btn t2" :class="{active: currentTab === 2}" @click="currentTab = 2">內用點餐</div>
          <div class="my-btn t2" :class="{active: currentTab === 3}" @click="currentTab = 3">外帶點餐</div>
          <div class="my-btn t2" :class="{active: currentTab === 4}" @click="currentTab = 4">外送點餐</div>
        </div>
        <el-button>123</el-button>
        <el-row :gutter="20">
          <el-col :sm="24">
            <div class="form-group">
              <label>分店</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="form-group">
              <label>日期</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="form-group">
              <label>時間</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :sm="24">
            <div class="form-group">
              <label>人數</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :sm="24">
            <hr class="divider">
          </el-col>
          
          <el-col :sm="6">
            <div class="form-group">
              <label>姓</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="form-group">
              <label>名字</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :sm="6">
            <div class="form-group">
              <label>稱謂</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :sm="24">
            <div class="form-group">
              <label>手機</label>
              <input type="text">
            </div>
          </el-col>

        </el-row>
        <div class="submit-button">
          加入購物車
        </div>
        <div>
          <label>
            <input type="radio">
          </label>
        </div>
        
        
      </div>
      
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'CheckoutModal',
    data() {
      return {
        currentTab: 1
      }
    },
    computed: {
      ...mapGetters([
      ])
    },
    methods: {
      ...mapMutations([
        'controlModal'
      ]),

    }
  }

</script>

<style lang="stylus">

</style>