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
                        <div class="date-items" v-for="d in 2">
                            <div class="date">2017年3月</div>
                            <div class="items">
                                <div class="item" v-for="n in 4" @click="$router.push({name: 'MemberRecordDetail', params: {sn: n}})">
                                    <p>
                                        內用點餐  2017/3/22(三) 18:30 
                                        <i class="fa fa-file-text-o"></i>
                                    </p>
                                    <p>台中復興店 4人 $2400</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="paper-footer">
                        載入更多
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
    name: 'Products',
    components: {
        HeaderCpt: Header,
        SideBar,
    },
    data() {
        return {
        }
    },
    mounted() {
    }
}

</script>


<style lang="stylus">

</style>