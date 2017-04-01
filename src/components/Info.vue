<template>
    <v-content>
        <v-container fluid>
            <el-row :gutter="20">
                <el-col :sm="12">
                    <h5 class="pageTitle">商店資訊</h5>
                    <div class="paper store-info">
                        <img src="/static/imgs/food03.jpg" alt="">
                        <div class="content">
                            <p>
                                燒肉不錯吃,附帶的年糕跟煎餅馬鈴薯燒也都很好吃,奶油啤酒好喝!值得再去的店,服務的店員也都很有耐心跟態度很好 ,燒肉不錯吃,附帶的年糕跟煎餅馬鈴薯燒也都很好吃,奶油啤酒好喝!值得再去的店,服務的店員也都很有耐心跟態度很好
                            </p>
                            <p>燒肉不錯吃,附帶的年糕跟煎餅馬鈴薯燒也都很好吃,奶油啤酒好喝!值得再去的店,服務的店員也都很有耐心跟態度很好 ,燒肉不錯吃,附帶的年糕跟煎餅馬鈴薯燒也都很好吃,奶油啤酒好喝!值得再去的店,服務的店員也都很有耐心跟態度很好
                            </p>

                        </div>
                        <button class="block-btn">
                                        查看各分店資訊
                                </button>
                    </div>
                </el-col>
                <el-col :sm="12">
                    <h5 class="pageTitle">店舖位置</h5>
                    <!--<div class="paper location">
                                <p class="name">一中店</p>
                                <p>台中市北區繼光街133巷33號</p>
                                <p>電話： 04-2233-4454</p>
                                <p>營業時間： 週一～週五 11:00 ~ 23:00</p>
                                <div class="map">

                                </div>

                            </div>-->
                    <div class="paper location">
                        <div class="items">
                            <div class="item" v-for="n in 6">
                                <div class="content">
                                    <p class="name">一中店</p>
                                    <p>台中市北區繼光街133巷33號</p>
                                    <p>04-2233-4454</p>
                                    <p>週一～週五 11:00 ~ 23:00</p>
                                </div>
                                <div class="icon icon-location"></div>
                            </div>
                        </div>
                    </div>
                </el-col>

            </el-row>

        </v-container>
    </v-content>

</template>

<script>
    import Header from '@/components/layout/Header.vue'
    import SideBar from '@/components/layout/SideBar.vue'
    import QRCodeModal from '@/components/widgets/QRCodeModal.vue'
    import eventHub from '@/utils/eventHub'
    import commonMixin from '@/utils/commonMixin'
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    export default {
        name: 'Products',
        components: {
            HeaderCpt: Header,
            SideBar,
            QrcodeModal: QRCodeModal
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