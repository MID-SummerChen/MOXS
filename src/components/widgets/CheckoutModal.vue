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
              <el-select class="main" style="width: 100%; height: 50px" v-model="currentTab">
                <el-option v-for="tab in tabs" :label="tab.label" :value="tab.value"></el-option>
              </el-select>
              <p class="tabMsg">{{tabs.find(t => t.value ===currentTab).msg}}</p>
            </div>
          </el-col>
          <el-col :sm="24">
            <div class="form-group">
              <label>分店</label>
              <input type="text" disabled>
            </div>
          </el-col>
          <template>
            <el-col :sm="6">
              <div class="form-group">
                <label>人數</label>
                <input type="text" :disabled="currentTab !== 1">
              </div>
            </el-col>
            <el-col :sm="9">
              <div class="form-group">
                <label>日期</label>
                <!--<input type="text" v-model="form.date" :disabled="currentTab !== 1">-->
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"  :disabled="currentTab !== 1"></el-date-picker>
              </div>
            </el-col>
            <el-col :sm="9">
              <div class="form-group">
                <label>時間</label>
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time" style="width: 100%;" format="HH:mm"></el-time-picker>
              </div>
            </el-col>
          </template>
          
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
          <template v-if="currentTab === 3">
            <el-col :sm="6">
              <div class="form-group">
                <label>縣市</label>
                <el-select v-model="form.city"
                            @change="onCityOptsChanged"
                            style="width: 100%">
                    <el-option v-for="o in cityOpts"
                                :label="o.geoName"
                                :value="o.geoName"
                                >
                    </el-option>
                </el-select>
                
              </div>
            </el-col>
            <el-col :sm="6">
              <div class="form-group">
                <label>地區</label>
                <el-select v-model="form.area"
                            style="width: 100%">
                    <el-option v-for="o in areaOpts"
                                :label="o.geoName"
                                :value="o.geoName">
                    </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :sm="12">
              <div class="form-group">
                <label>地址</label>
                <input type="text" v-model="form.addr">
              </div>
            </el-col>
          </template>
          <el-col :sm="24">
            <div class="sub-radio-check">
              是否使用線上付款？
              <el-radio class="radio" v-model="isPayNow" :label="1">是</el-radio>
              <el-radio class="radio" v-model="isPayNow" :label="2">否</el-radio>
            </div>
          </el-col>

        </el-row>

        
        <div class="submit-button" @click="onCartSubmit">
          確 認
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
  import commonMixin from '@/utils/commonMixin'
  export default {
    name: 'CheckoutModal',
    mixins: [commonMixin],
    data() {
      return {
        currentTab: 1,
        isPayNow: 1,
        tabs: [
          {label: "內用", value: 1, msg: "內用的說明"},
          {label: "外帶", value: 2, msg: "外帶的說明"},
          {label: "外送", value: 3, msg: "外送的說明"},
        ],
        form: {
          date: moment(),
          time: moment(),
          city: "",
          area: "",
          addr: "",
        },
        cityOpts: [],
        areaOpts: [],
      }
    },
    computed: {
      ...mapGetters([
      ])
    },
    mounted() {
      this._getGeo()
    },
    methods: {
      ...mapMutations([
        'controlModal'
      ]),
      ...mapActions([
        'getGeo'
      ]),
      async _getGeo(superCode) {
          console.log(superCode)
          var data ={
              superCode
          }
          var res = await this.getGeo(data)
          if(res.code === 10) {
              superCode
              ? this.areaOpts = res.data
              : this.cityOpts = res.data
          }
      },
      onCityOptsChanged() {
          this.form.area = ""
          this._getGeo(this.cityOpts.find(o => o.geoName === this.form.city).code)
      },
      onCartSubmit() {
        this.controlModal({target: 'checkout', boo: false})
        this.controlModal({target: 'phoneVerify', boo: true})
      }

    }
  }

</script>

<style lang="stylus">

</style>