<template>
    <v-content>
        <v-container fluid>
            <div class="main-title">
                <ul>
                    <li @click="$router.push({name: 'Member'})">會員中心</li>
                    <li>預約記錄</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="paper">
                    <div class="paper-content">
                        <div class="date-items" v-for="(resvs, month) in resvListByMonth">
                            <div class="date">{{month}}</div>
                            <div class="items">
                                <div class="item animated fadeInUp" v-for="resv in resvs" @click="$router.push({name: 'MemberRecordDetail', params: {resv_sn: resv.sn}})">
                                    <p>
                                        <span>{{resv.stoResvOptName}}  {{resv.date}} {{resv.startAt}} </span>
                                    </p>
                                    <p>{{resv.stoName}} {{resv.adultNum + resv.kidNum}}人 ${{resv.totalPrice}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="totalPages > page" class="paper-footer" @click="onLoadMore">
                        <span v-if="isLoading">載入中...</span>
                        <span v-else>載入更多</span>
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
    name: 'MemberRecord',
    mixins: [commonMixin],
    components: {
        HeaderCpt: Header,
        SideBar,
    },
    data() {
        return {
            resvList: [],
            page: 1,
            totalPages: 1,
            isLoading: false,
        }
    },
    computed: {
        resvListByMonth() {
            return _.groupBy(this.resvList, v => moment(v.date).format('YYYY年MM月'))
        }
    },
    mounted() {
        this._getAllResv()
    },
    methods: {
        ...mapActions([
            'getAllResv'
        ]),
        async _getAllResv() {
            var data = {
                maxRecords: 7,
                page: this.page,
                orderBy: "date:desc"
            }
            this.isLoading = true
            var res = await this.getAllResv(data)
            if(res.code === 10) {
                this.totalPages = res.data.totalPages
                var i = 0
                fadeLoop.call(this)
                function fadeLoop() {
                    setTimeout(() => {
                        console.log(res.data.items[i])
                        this.resvList = this.resvList.concat(res.data.items[i])
                        i++ 
                        if(i < res.data.pageRecords) {
                            fadeLoop.call(this)
                        }else {
                            this.isLoading = false
                        }
                    }, 100)
                }
            }
            return
        },
        async onLoadMore() {
            this.page = this.page+1
            await this._getAllResv()
            
        }
    }
}

</script>


<style lang="stylus">

</style>