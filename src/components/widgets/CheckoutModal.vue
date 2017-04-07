<template>
  <div id="checkout-modal" class="my-modal-wrap" @click.self="controlModal({target: 'checkout', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="controlModal({target: 'checkout', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      
      <div class="modal-box-content">
        <div class="tabs">
          <div class="tab active">預約座位</div>
          <div class="tab">內用點餐</div>
          <div class="tab">外帶點餐</div>
          <div class="tab">外送點餐</div>
        </div>
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