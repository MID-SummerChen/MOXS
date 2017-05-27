<template>
  <div id="checkout-modal" class="my-modal-wrap" @click.self="controlModal({target: 'checkout', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="controlModal({target: 'checkout', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      
      <div class="modal-box-content">
        <el-row :gutter="20">
          <el-col :sm="24">
            <div class="form-group">
              <el-select style="width: 100%; height: 50px" v-model="currentTab">
                <el-option v-for="tab in tabs" :label="tab.label" :value="tab"></el-option>
              </el-select>
              <p class="tabMsg">{{currentTab.msg}}</p>
            </div>
          </el-col>
          <el-col :sm="24">
            <div class="form-group">
              <label>分店</label>
              <input type="text" disabled>
            </div>
          </el-col>
          <template v-if="currentTab.value === 1">
            <el-col :sm="6">
              <div class="form-group">
                <label>人數</label>
                <input type="text">
              </div>
            </el-col>
            <el-col :sm="9">
              <div class="form-group">
                <label>日期</label>
                <input type="text">
              </div>
            </el-col>
            <el-col :sm="9">
              <div class="form-group">
                <label>時間</label>
                <input type="text">
              </div>
            </el-col>
          </template>
          <el-col v-else :sm="24">
            <div class="form-group">
              <label>時間</label>
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
          <el-col v-if="currentTab.value === 3" :sm="24">
            <div class="form-group">
              <label>地址</label>
              <input type="text">
            </div>
          </el-col>

        </el-row>
        <div class="submit-button" @click="onCartSubmit">
          確 認
        </div>
        <div class="sub-radio-check">
          是否使用線上付款？
          <el-radio class="radio" v-model="isPayNow" :label="1">是</el-radio>
          <el-radio class="radio" v-model="isPayNow" :label="2">否</el-radio>
        </div>
        <div class="close-button" @click="controlModal({target: 'checkout', boo: false})">
          關 閉
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
        currentTab: {},
        isPayNow: 1,
        tabs: [
          {label: "內用", value: 1, msg: "內用的說明"},
          {label: "外帶", value: 2, msg: "外帶的說明"},
          {label: "外送", value: 3, msg: "外送的說明"},
        ]
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
      onCartSubmit() {
        this.controlModal({target: 'checkout', boo: false})
        this.controlModal({target: 'phoneVerify', boo: true})
      }

    }
  }

</script>

<style lang="stylus">

</style>