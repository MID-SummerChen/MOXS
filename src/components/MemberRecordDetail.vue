<template>
    <v-content>
        <v-container fluid>
            <div class="main-title">
                <ul>
                    <li @click="$router.push({name: 'Member'})">會員中心</li>
                    <li @click="$router.push({name: 'MemberRecord'})">預約記錄</li>
                    <li>{{resvData.sn}}</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="paper">
                    <div class="top-title">
                        <h4>{{resvData.stoResvOptName}} <span>{{resvData.stoName}}</span></h4>
                        <p>{{resvData.date}} {{resvData.startAt}} ({{resvData.adultNum + resvData.kidNum}}人) </p>
                    </div>
                    <el-row :gutter="20" class="record-content">
                        <el-col :xs="12" :sm="8">
                            <label>預約號碼</label>
                            <div v-if="resvData.resvCode" class="number-box">{{resvData.resvCode.slice(-4)}}</div>
                        </el-col>
                        <el-col :xs="12" :sm="8">
                            <label>預約狀態</label>
                            <div class="number-box status">{{toChkStatus(resvData.status)}}</div>
                        </el-col>
                        <el-col :sm="24">
                            <p>購買人：{{resvData.name}} {{toGender(resvData.gender)}} {{resvData.cell}}</p>
                            <p v-if="resvData.addr">地址：{{resvData.city + resvData.area + resvData.addr}}</p>
                            <p>帳單金額：${{resvData.totalPrice}}</p>
                            <p>付款方式：{{toPayType(resvData.payType)}}[{{toChkStatus(resvData.status)}}]</p>
                            <p>建檔時間：{{resvData.createAt}}</p>
                        </el-col>

                    </el-row>
                    <h5>預約餐點</h5>
                    <div class="items">
                        <div class="item" v-for="item in resvItems">
                            <div class="title">
                                <p class="name">{{item.name}}</p>
                                <!--<p class="tags">{{item.subtitle}}</p>-->
                                <p class="tags">{{item.rtmSubtitle}} {{item.rtmDesc}}</p>
                            </div>
                            <div class="count">x{{item.amount}}</div>
                            <div class="dollar">${{item.totalPrice}}</div>
                        </div>
                    </div>
                    <div class="total">
                        合計： <b>${{resvData.totalPrice}}</b>
                    </div>
                    <div class="btn-wrap">
                        <a href="" class="text-rose">取消預約</a>
                        <a v-if="resvData.status === 'WAIT_VERIFY'" href=""  class="text-blue" @click.prevent="CONTROL_MODAL({target: 'phoneVerify', boo: true})">立即驗證</a>
                        <a v-else href="" @click.prevent="CONTROL_MODAL({target: 'orderRecord', boo: true})" class="text-blue">交易紀錄</a>
                    </div>
                </div>
            </div>
    
        </v-container>
    </v-content>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import SideBar from '@/components/layout/SideBar.vue'
import eventHub from '@/utils/eventHub'
import commonMixin from '@/utils/commonMixin'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'memberRecordDetail',
    mixins: [commonMixin],
    components: {
        HeaderCpt: Header,
        SideBar,
    },
    data() {
        return {
            resvData: {},
            resvItems: []
        }
    },
    mounted() {
        this._getResv()
        this._getAllResvItems()
    },
    methods: {
        ...mapMutations([
            'GOT_CHECKOUT_ORDER'
        ]),
        ...mapActions([
            'getResv',
            'getAllResvItems',
        ]),
        async _getResv() {
            var res = await this.getResv(this.$route.params.resv_sn)
            if(res.code === 10) {
                this.resvData = res.data
                this.GOT_CHECKOUT_ORDER(res.data)
            }
        },
        async _getAllResvItems() {
            var res = await this.getAllResvItems(this.$route.params.resv_sn)
            console.log(res)
            if(res.code === 10) {
                this.resvItems = res.data.items
            }
        },

    }
}

</script>


<style lang="stylus">

</style>