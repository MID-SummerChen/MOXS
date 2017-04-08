<template>
    <v-content>
        <v-container fluid>
            <div class="main-title">
                <ul>
                    <li>會員中心</li>
                    <li>預約記錄</li>
                    <li>RES91239124912</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="paper">
                    <div class="top-title">
                        <div class="text-info">
                            <h4>內用點餐</h4>
                            <p>2017/03/22(三) 18:30 (4人) </p>
                        </div>
                        <div class="store">台中復興店</div>
                    </div>
                    <el-row :gutter="40" class="record-content">
                        <el-col :sm="8">
                            <label>預約號碼</label>
                            <div class="number-box">123456</div>
                        </el-col>
                        <el-col :sm="8">
                            <label>預約狀態</label>
                            <div class="number-box status">等待中</div>
                        </el-col>
                        <el-col :sm="24">
                            <p>紀錄編號：RES1238523523502134</p>
                            <p>預約分店：台中復興店</p>
                            <p>紀錄編號：RES1238523523502134</p>
                            <p>預約分店：台中復興店</p>
                            <p>紀錄編號：RES1238523523502134</p>
                        </el-col>

                    </el-row>
                    <h5>預約餐點</h5>
                    <div class="items">
                        <div class="item"
                            v-for="n in 6">
                        <div class="title">
                            <p class="name">產品名稱在這</p>
                            <p class="tags"><span>加辣</span><span>加起司</span></p>
                        </div>
                        <div class="count">x3</div>
                        <div class="dollar">$170</div>
                        </div>
                    </div>
                    <div class="total">
                        合計： <b>$340</b>
                    </div>
                    <div class="btn-wrap">
                        <a href="" class="text-rose">取消預約</a>
                        <a href="" class="text-blue">交易紀錄</a>
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