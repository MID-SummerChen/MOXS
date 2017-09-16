<template>
  <div id="checkout-modal" class="my-modal-wrap" @click.self="CONTROL_MODAL({target: 'resvCheckout', boo: false})">
    <div class="modal-box">
      <div class="close-btn" @click="CONTROL_MODAL({target: 'resvCheckout', boo: false})">
        <v-icon>clear</v-icon>
      </div>
      
      <div class="modal-box-content">
        <el-row :gutter="20">
          <el-col :sm="24">
            <mu-select-field v-model="form.store" :labelFocusClass="['label-foucs']" label="分店" style="width: 100%">
              <mu-menu-item v-for="(s, i) in storeList" :key="s.sn" :value="s.sn" :title="s.name" />
            </mu-select-field>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="12">
            <mu-select-field v-model="form.resvTypeId" :labelFocusClass="['label-foucs']" label="預約類型" style="width: 100%">
              <mu-menu-item v-for="(r, i) in resvTypeList" :key="r.id" :value="r.id" :title="r.name" />
            </mu-select-field>
          </el-col>
          <el-col :sm="12">
            <mu-select-field v-if="getResvCode(form.resvTypeId) === 'STAYIN'" v-model="form.adultNum" :labelFocusClass="['label-foucs']" label="人數" :disabled="getResvCode(form.resvTypeId) !== 'STAYIN'" style="width: 100%">
              <mu-menu-item v-for="n in 20" :value="n" :title="n+''" />
            </mu-select-field>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="12">
            <mu-select-field v-model="form.date" :labelFocusClass="['label-foucs']" label="日期" style="width: 100%">
              <mu-menu-item v-for="(d, i) in dateList" :key="d" :value="d" :title="d" />
            </mu-select-field>
          </el-col>
          <el-col :sm="12">
            <mu-select-field v-model="form.time" :labelFocusClass="['label-foucs']" label="時間" style="width: 100%">
              <mu-menu-item v-for="(t, i) in timeList" :key="t" :value="t" :title="t" />
            </mu-select-field>
          </el-col>
          <el-col :sm="12">
            <div class="form-group">
              <mu-text-field v-model="form.name" label="姓名" hintText="" style="width: 100%"/><br/>
            </div>
          </el-col>
          <el-col :sm="12">
            <mu-select-field v-model="form.gender" :labelFocusClass="['label-foucs']" label="稱謂" style="width: 100%">
              <mu-menu-item v-for="(g, i) in genderOpts" :key="g.value" :value="g.value" :title="g.label" />
            </mu-select-field>
          </el-col>
          <el-col :sm="24">
            <mu-text-field v-model="form.mobile" label="手機" hintText="" style="width: 100%"/><br/>
          </el-col>
          <template v-if="getResvCode(form.resvTypeId) === 'DELIVER'">
            <el-col :sm="12">
              <mu-select-field v-model="form.city" :labelFocusClass="['label-foucs']" label="城市" style="width: 100%" placeholder="請選擇城市">
                <mu-menu-item v-for="(city, i) in cityList" :value="city.geoName" :title="city.geoName" />
              </mu-select-field>
            </el-col>
            <el-col :sm="12">
              <mu-select-field v-model="form.area" :labelFocusClass="['label-foucs']" label="地區" style="width: 100%" placeholder="請選擇地區">
                <mu-menu-item v-for="(area, i) in areaList" :value="area.geoName" :title="area.geoName" />
              </mu-select-field>
            </el-col>
            <el-col :sm="24">
              <mu-text-field v-model="form.addr" label="地址" hintText="" style="width: 100%"/><br/>
            </el-col>
          </template>
          <el-col :sm="24">
            <mu-text-field v-model="form.note" label="備註" multiLine :rows="2" :rowsMax="6" style="width: 100%"/><br/>
          </el-col>
          <el-col :sm="24">
            <div class="sub-radio-check" v-if="paySets.length > 0">
              是否使用線上付款？
              <el-radio-group v-model="form.payType">
                <el-radio class="radio" label="ONLINE">是</el-radio>
                <el-radio class="radio" label="ONSITE">否</el-radio>
              </el-radio-group>
              
            </div>
          </el-col>

        </el-row>
      
        
      </div>

      <div class="modal-box-footer">
        <button @click="CONTROL_MODAL({target: 'resvCheckout', boo: false})">關閉</button>
        <button class="blue-text" @click="onSaveResvInfo">確認</button>
      </div>
      
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
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
          payType: "ONSITE",
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
          note: ""

        },
        cityList: [],
        areaList: [],
        timeOpts: {
          start: '10:30', 
          step: '00:15',
          end: '20:30'
        }
      }
    },
    computed: {
      ...mapState([
        'paySets'
      ]),
      ...mapGetters([
        'account',
        'menu',
        'orderItems',
        'storeList',
        'currentResv',
      ])
    },
    async mounted() {
      await this._getGeo()
      this.setInitForm()
      this.setForm()
    },
    watch: {
      'form.store': 'onStoreChanged',
      'form.resvTypeId': 'onResvTypeChanged',
      'form.date': 'onDateChanged',
      'form.city': 'onCityChanged',
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
          // f.area = mb.area
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
          // f.area = c.area
          f.addr = c.addr
          f.mobile = c.mobile
          f.gender = c.gender
          f.note = c.note

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
      onStoreChanged(store) {
        if(store) {
          this._getResvOpt()
        }
      },
      onResvTypeChanged(resvTypeId) {
        if(resvTypeId) {
          this.form.date = ""
          this.form.time = ""
          this._getAllowResvDate()
        }
      },
      onDateChanged(date) {
        if(date) {
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
            this.form.resvTypeId = ""
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
          note: f.note,
        }
        var i = _.findIndex(this.storeList, {sn: f.store})
        if(i > -1) d.storeName = this.storeList[i].name
        var i = _.findIndex(this.resvTypeList, {id: f.resvTypeId})
        if(i > -1) {
          d.resvType = this.resvTypeList[i].name
          d.resvTypeCode = this.resvTypeList[i].sysResvOptId
        }

        this.SAVE_CURRENT_RESV({form: f, display: d})
        this.CONTROL_MODAL({target: 'resvCheckout', boo: false})
      },
      getResvCode(id) {
        // resvTypeList.find(t => t.id === form.resvTypeId).sysResvOptId
        var i = _.findIndex(this.resvTypeList, {id: this.form.resvTypeId})
        return i > -1 ? this.resvTypeList[i].sysResvOptId : ""
      },
      onCityChanged() {
        if(this.form.city) {
          this.form.area = ""
          var i = _.findIndex(this.cityList, {geoName: this.form.city})
          if(i > -1) this._getGeo(this.cityList[i].code)
        }
          
      },
      async _getGeo(superCode) {
          console.log(superCode)
          var data ={
              superCode
          }
          var res = await this.getGeo(data)
          if(res.code === 10) {
            if(superCode) {
              this.areaList = res.data
              if(this.currentResv.form) {
                this.form.area = this.currentResv.form.area
              }else {
                var i = _.findIndex(this.areaList, {geoName: this.account.mb.area})
                if(i > -1) this.form.area = this.account.mb.area
              }
              
            }else {
              this.cityList = res.data
              if(this.currentResv.form) {
                this.form.city = this.currentResv.form.city
              }
              
            }
          }
          return
      },
      onCityOptsChanged() {
          this.form.area = ""
          this._getGeo(this.cityList.find(o => o.geoName === this.form.city).code)
      },
      // onCartSubmit() {
        
      // }

    }
  }

</script>

<style lang="stylus">

</style>