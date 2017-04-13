<template>
    <v-content>
        <v-container fluid>
            <div class="main-title">
                <ul>
                    <li>會員中心</li>
                    <li>編輯帳戶</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="paper">
                    <div class="paper-top-bar">
                        <div class="icon icon-store-title"></div>
                    </div>
                    <el-row :gutter="40" class="paper-content">
                        <el-col :sm="6" class="left">
                            <div class="img-wrap"><img src="/static/imgs/food03.jpg"
                                     alt=""></div>
                            <button class="btn-t2">更新相片</button>
                        </el-col>
                        <el-col :sm="18"
                                class="right">
                            <div class="top-info">
                                <div class="form-group">
                                    <label>E-MAIL帳號</label>
                                    <p>ryan.mtntech@gmail.com</p>
                                </div>
                                <div class="form-group-inline">
                                    <span>
                                        <label>姓</label>
                                        <input type="text">
                                    </span>
                                    <span>
                                        <label>名</label>
                                        <input type="text">
                                    </span>
                                    <span>
                                        <label>稱謂</label>
                                        <div class="selector">先生</div>
                                    </span>
                                </div>
                            </div>
    
                            <h5>聯絡資訊</h5>
                            <form>
                                <div class="form-group">
                                    <label>手機</label>
                                    <input type="text">
                                </div>
                                <div class="form-group">
                                    <label>住址</label>
                                    <el-row :gutter="20">
                                        <el-col :sm="8">
                                            <div class="selector">台中市</div>
                                        </el-col>
                                        <el-col :sm="8">
                                            <div class="selector">西屯區</div>
                                        </el-col>
                                        <el-col :sm="24">
                                            <input type="text">
                                        </el-col>
    
                                    </el-row>
                                </div>
                            </form>
                        </el-col>
    
                    </el-row>
    
                    <div class="btn-wrap">
                        <a href="">取消</a>
                        <a href=""
                           class="text-blue">儲存</a>
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