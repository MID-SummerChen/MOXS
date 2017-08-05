<template>
  <div class="paper">
    <div class="paper-content">
        <div class="date-items" v-for="(ords, month) in ordListByMonth">
            <div class="date">{{month}}</div>
            <div class="items">
                <div class="item animated fadeInUp" v-for="ord in ords" @click="$router.push({name: 'OrdRecordDetail', params: {ord_sn: ord.ordSn}})">
                    <p>{{ord.stoName}} ${{ord.ordTotalPrice}}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-if="totalPages > page" class="paper-footer" @click="onLoadMore">
        <span v-if="isLoading">載入中...</span>
        <span v-else>載入更多</span>
    </div>

  </div>
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
            ordList: [],
            page: 1,
            totalPages: 1,
            isLoading: false,
        }
    },
    computed: {
        ordListByMonth() {
            return _.groupBy(this.ordList, v => moment(v.date).format('YYYY年MM月'))
        }
    },
    mounted() {
        this._getAllOrd()
    },
    methods: {
        ...mapActions([
            'getAllOrd'
        ]),
        async _getAllOrd() {
            var data = {
                maxRecords: 7,
                orderBy: "createAt:desc",
                page: this.page,
            }
            this.isLoading = true
            var res = await this.getAllOrd(data)
            if(res.code === 10) {
                this.totalPages = res.data.totalPages
                var i = 0
                fadeLoop.call(this)
                function fadeLoop() {
                    setTimeout(() => {
                        this.ordList = this.ordList.concat(res.data.items[i])
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
            await this._getAllOrd()
            
        }
    }
}

</script>


<style lang="stylus">
</style>