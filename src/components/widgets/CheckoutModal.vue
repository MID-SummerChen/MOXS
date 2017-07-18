<template>
  <div id="checkout-modal" class="my-modal-wrap" @click.self="CONTROL_MODAL({target: 'checkout', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="CONTROL_MODAL({target: 'checkout', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      
      <div class="modal-box-content">
        <el-row :gutter="20">
          <el-col :sm="24">
            <div class="form-group">
              <label>分店</label>
              <el-select class="main" style="width: 100%; height: 50px" v-model="form.store" @change="onStoreChanged">
                <el-option label="請選擇分店" value=""></el-option>
                <el-option v-for="s in storeList" :label="s.name" :value="s.sn"></el-option>
              </el-select>
            </div>
            
          </el-col>
          <el-col :sm="24">
            <div class="form-group">
              <el-select style="width: 100%" v-model="form.resvTypeId" @change="onResvTypeChanged">
                <el-option label="用餐方式" value=""></el-option>
                <el-option v-for="r in resvTypeList" :label="r.name" :value="r.id"></el-option>
              </el-select>
              <!--<p class="tabMsg">{{resvTypeList.find(t => t.value ===form.resvTypeId).msg}}</p>-->
            </div>
          </el-col>
          <template>
            <el-col :sm="12">
              <div class="form-group">
                <label>日期</label>
                <!--<input type="text" v-model="form.date" :disabled="form.resvTypeId !== 'STAYIN'">-->
                <el-select v-model="form.date" style="width: 100%;" @change="onDateChanged">
                  <!--<el-option label="請選擇日期" value=""></el-option>-->
                  <el-option v-for="d in dateList" :value="d"></el-option>
                </el-select>
                <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"  :disabled="getResvCode(form.resvTypeId) !== 'STAYIN'"></el-date-picker>-->
              </div>
            </el-col>
            <el-col :sm="12">
              <div class="form-group">
                <label>時間</label>
                <el-select v-model="form.time" style="width: 100%;" >
                  <!--<el-option label="請選擇時間" value=""></el-option>-->
                  <el-option v-for="t in timeList" :value="t"></el-option>
                </el-select>
                <!--<el-time-select type="fixed-time" placeholder="选择时间" v-model="form.time" style="width: 100%;" :picker-options="timeOpts" format="HH:mm"></el-time-select>-->
              </div>
            </el-col>
            <el-col :sm="12">
              <div class="form-group">
                <label>人數</label>
                <el-input-number style="width: 100%" v-model="form.adultNum" :min="0" :disabled="getResvCode(form.resvTypeId) !== 'STAYIN'"></el-input-number>
              </div>
            </el-col>
            <!--<el-col :sm="12">
              <div class="form-group">
                <label>兒童數</label>
                <el-input-number style="width: 100%" v-model="form.kidNum" :min="0" :disabled="getResvCode(form.resvTypeId) !== 'STAYIN'"></el-input-number>
              </div>
            </el-col>-->
          </template>
          
          <el-col :sm="24">
            <hr class="divider">
          </el-col>
          
          <el-col :sm="16">
            <div class="form-group">
              <label>姓名</label>
              <input type="text" v-model="form.name">
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="form-group">
              <label>稱謂</label>
              <el-select style="width: 100%" v-model="form.gender">
                <el-option label="先生" value="MALE"></el-option>
                <el-option label="小姐" value="FEMALE"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :sm="24">
            <div class="form-group">
              <label>手機</label>
              <input type="text" v-model="form.mobile">
            </div>
          </el-col>
          <template v-if="getResvCode(form.resvTypeId) === 'DELIVER'">
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
              <el-radio-group v-model="form.payType">
                <el-radio class="radio" label="ONLINE">是</el-radio>
                <el-radio class="radio" label="ONSITE">否</el-radio>
              </el-radio-group>
              
            </div>
          </el-col>

        </el-row>

        
        <div class="submit-button" @click="onSaveResvInfo">
          確 認
        </div>
        
        <div class="close-button" @click="CONTROL_MODAL({target: 'checkout', boo: false})">
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
        dateList: [],
        timeList: [],
        resvTypeList: [],
        form: {
          resvTypeId: "",
          payType: "ONLINE",
          date: "",
          time: "",
          city: "",
          area: "",
          addr: "",
          store: "",
          name: "",
          gender: "MALE",
          mobile: "",
          adultNum: 2,
          kidNum: 0,
        },
        cityOpts: [],
        areaOpts: [],
        timeOpts: {
          start: '10:30', 
          step: '00:15',
          end: '20:30'
        }
      }
    },
    computed: {
      ...mapGetters([
        'account',
        'menu',
        'orderItems',
        'storeList',
        'currentResv',
      ])
    },
    mounted() {
      this._getGeo()
      this.setInitForm()
      this.setForm()
    },
    methods: {
      ...mapMutations([
        'CONTROL_MODAL',
        'SAVE_CURRENT_RESV',
      ]),
      ...mapActions([
        'getGeo',
        'getResvOpt',
        'addResv',
        'getAllowResvDate',
        'getAllowResvTime',
        'sendResvVerify',
        'verifyResv',
        'resvCheckout',
      ]),
      setInitForm() {
        var mb = this.account.mb
        var f = this.form
        if(mb) {
          f.name = mb.name
          f.city = mb.city
          f.area = mb.area
          f.addr = mb.addr
          f.mobile = mb.cell
          f.gender = mb.gender
        }
      },
      async setForm() {
        var f = this.form
        var c = this.currentResv.form
        if(this.currentResv.form) {
          f.name = c.name
          f.city = c.city
          f.area = c.area
          f.addr = c.addr
          f.mobile = c.mobile
          f.gender = c.gender

          f.payType = c.payType
          f.adultNum = c.adultNum
          f.kidNum = c.kidNum

          f.store = c.store
          // await this._getResvOpt()
          // f.resvTypeId = c.resvTypeId
          // await this._getAllowResvDate()
          // f.date = c.date
          // await this._getAllowResvTime()
          // f.time = c.time
        }
      },
      onStoreChanged() {
        if(this.form.store) {
          this._getResvOpt()
          
        }
      },
      onResvTypeChanged() {
        if(this.form.resvTypeId) {
          this.form.date = ""
          this.form.time = ""
          this._getAllowResvDate()
        }
      },
      onDateChanged() {
        if(this.form.date) {
          this._getAllowResvTime()
          
        }
      },
      async _getResvOpt() {
        var res = await this.getResvOpt(this.form.store)
        if(res.code === 10) {
          this.resvTypeList = res.data.items
          if(this.currentResv.form && this.currentResv.form.resvTypeId) {
            this.form.resvTypeId = this.currentResv.form.resvTypeId
          }else if(this.resvTypeList[0]) {
            this.form.resvTypeId = this.resvTypeList[0].id
          }
           
        }
        return
      },
      async _getAllowResvTime() {
        var data = {
          optId: this.form.resvTypeId,
          stoSn: this.form.store,
          date: this.form.date,
          peopleNumber: this.form.adultNum + this.form.kidNum,
        }
        var res = await this.getAllowResvTime(data)
        if(res.code === 10) {
          this.timeList = res.data
          if(this.currentResv.form && this.currentResv.form.time && _.indexOf(this.timeList, this.currentResv.form.time) > -1) {
            this.form.time = this.currentResv.form.time
          }else if(this.dateList[0]) {
            this.form.time = this.timeList[0]
          }
          
        }
        return
      },
      async _getAllowResvDate() {
        var data = {
          optId: this.form.resvTypeId,
          stoSn: this.form.store
        }
        var res = await this.getAllowResvDate(data)
        if(res.code === 10) {
          this.dateList = res.data
          if(this.currentResv.form && this.currentResv.form.date && _.indexOf(this.dateList, this.currentResv.form.date) > -1) {
            this.form.date = this.currentResv.form.date
          }else if(this.dateList[0]){
            this.form.date = this.dateList[0]
          }
          
        }
        return
      },
      onSaveResvInfo() {
        var f = this.form
        var d = {
          adultNum: f.adultNum,
          kidNum: f.kidNum,
          gender: f.gender,
          mobile: f.mobile,
          payType: f.payType,
          address: f.city + f.area + f.addr,
          name: f.name,
          date: f.date,
          time: f.time,
        }
        var i = _.findIndex(this.storeList, {sn: f.store})
        if(i > -1) d.storeName = this.storeList[i].name
        var i = _.findIndex(this.resvTypeList, {id: f.resvTypeId})
        if(i > -1) d.resvType = this.resvTypeList[i].name

        this.SAVE_CURRENT_RESV({form: f, display: d})
        this.CONTROL_MODAL({target: 'checkout', boo: false})
      },
      getResvCode(id) {
        // resvTypeList.find(t => t.id === form.resvTypeId).sysResvOptId
        var i = _.findIndex(this.resvTypeList, {id: this.form.resvTypeId})
        return i > -1 ? this.resvTypeList[i].sysResvOptId : ""
      },
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
      // onCartSubmit() {
        
      // }

    }
  }

</script>

<style lang="stylus">

</style>