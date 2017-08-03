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
                <all-resv-list v-if="checkoutType === 'resv'"></all-resv-list>
                <all-ord-list v-if="checkoutType === 'ord'"></all-ord-list>
            </div>
    
        </v-container>
    </v-content>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import SideBar from '@/components/layout/SideBar.vue'
import AllResvList from '@/components/AllResvList.vue'
import AllOrdList from '@/components/AllOrdList.vue'
import eventHub from '@/utils/eventHub'
import commonMixin from '@/utils/commonMixin'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'MemberRecord',
    mixins: [commonMixin],
    components: {
        HeaderCpt: Header,
        SideBar,
        AllResvList,
        AllOrdList,
    },
    data() {
        return {
        }
    },
}

</script>


<style lang="stylus">

</style>