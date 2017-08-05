<template>
    <v-content>
        <v-container fluid>
            <div class="main-title">
                <ul>
                    <li @click="$router.push({name: 'Member'})">會員中心</li>
                    <li @click="$router.push({name: 'MemberRecord'})">預約記錄</li>
                    <li>{{ordData.ordSn}}</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="paper">
                    <div class="top-title">
                        <h4><span>{{ordData.stoName}}</span></h4>
                    </div>
                    <el-row :gutter="20" class="record-content">
                        <!-- <el-col :xs="12" :sm="8">
                            <label>預約號碼</label>
                            <div v-if="ordData.ordCode" class="number-box">{{ordData.ordCode.slice(-4)}}</div>
                        </el-col> -->
                        <el-col :xs="12" :sm="8">
                            <label>預約狀態</label>
                            <div class="number-box status">{{toChkStatus(ordData.ordStatus)}}</div>
                        </el-col>
                        <el-col :sm="24">
                            <p>紀錄編號：{{ordData.ordSn}}</p>
                            <p>預約分店：{{ordData.stoSn}}</p>
                            <p>預約人：{{ordData.userName}} {{toGender(ordData.gender)}} {{ordData.userCell}}</p>
                            <p v-if="ordData.userAddr">地址：{{ordData.userCity + ordData.userArea + ordData.userAddr}}</p>
                            <p>付款方式：{{toPayType(ordData.payType)}}</p>
                            <p>建檔時間：{{ordData.createAt}}</p>
                        </el-col>

                    </el-row>
                    <h5>預約餐點</h5>
                    <div class="items">
                        <div class="item" v-for="item in ordItems">
                            <div class="title">
                                <p class="name">{{item.itemName}}</p>
                                <!--<p class="tags">{{item.subtitle}}</p>-->
                                <p class="tags">{{item.otmSubtitle}} {{item.otmDesc}}</p>
                            </div>
                            <div class="count">x{{item.otmAmount}}</div>
                            <div class="dollar">${{item.otmTotalPrice}}</div>
                        </div>
                    </div>
                    <div class="total">
                        合計： <b>${{ordData.ordTotalPrice}}</b>
                    </div>
                    <div class="btn-wrap">
                        <template v-if="ordData.payType === 'ONLINE'">
                            <a v-if="ordData.ordStatus === 'WAIT_PAY'" href=""  class="text-blue" @click.prevent="goToPay">立即付款</a> 
                            <a v-else-if="chkInfo.chkStatus !== 'PENDING'" href="" @click.prevent="CONTROL_MODAL({target: 'orderRecord', boo: true})" class="text-blue">交易紀錄</a>
                        </template>
                        <template v-else>
                            <a v-if="ordData.ordStatus === 'WAIT_VERIFY'" href=""  class="text-blue" @click.prevent="CONTROL_MODAL({target: 'phoneVerify', boo: true})">立即驗證</a>
                        </template>
                        
                        
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
    name: 'OrdRecordDetail',
    mixins: [commonMixin],
    components: {
        HeaderCpt: Header,
        SideBar,
    },
    data() {
        return {
            ordData: {},
            ordItems: []
        }
    },
    async mounted() {
        await this._getOrd()
        if(this.ordData.payType === 'ONLINE') {
            this._getOrdChk()
        }
        
        this._getAllOrdItems()
    },
    computed: {
        ...mapGetters([
            'chkInfo'
        ])
    },
    methods: {
        ...mapMutations([
            'GOT_CHECKOUT_ORDER',
            'GOT_CHECKOUT_INFO',
        ]),
        ...mapActions([
            'getOrdChk',
            'getOrd',
            'getAllOrdItems',
        ]),
        async _getOrd() {
            var res = await this.getOrd(this.$route.params.ord_sn)
            if(res.code === 10) {
                this.ordData = res.data
                this.GOT_CHECKOUT_ORDER(res.data)
            }
            return
        },
        async _getAllOrdItems() {
            var res = await this.getAllOrdItems(this.$route.params.ord_sn)
            console.log(res)
            if(res.code === 10) {
                this.ordItems = res.data.items
            }
        },
        async _getOrdChk() {
            var res = await this.getOrdChk(this.$route.params.ord_sn)
            if(res.code === 10) {
                var chkInfo = _.assign({} ,res.data, {
                    totalPrice: _.sumBy(res.data.chkDetail, "total_price")
                })
                this.GOT_CHECKOUT_INFO(chkInfo)
            }
        },
        goToPay() {
            this.$router.push({name: 'Checkout', query: {
                chk: this.chkInfo.chkSn,
                ord: this.ordData.ordSn,
            }})
        }

    }
}

</script>


<style lang="stylus">

</style>