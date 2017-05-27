<template>
    <v-content>
        <v-container fluid>
            <div class="main-title">
                <ul>
                    <li>商店介紹</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="title-img">
                    <img src="/static/imgs/bg.jpg" alt="">
                </div>
                <div class="page-content">
                    <h4>標題在這裡</h4> 壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容，壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容 ，壹些內容壹些內容壹些內容壹些內容，壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容，壹些內容壹些內容壹些內容壹些內容 壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容，壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容。
                    <div style="margin-top: 20px"></div>
                    <el-row :gutter="30">
                        <el-col :sm="8"
                                v-for="store in storeList">
                            <div class="box">
                                <div class="icon-location"></div>
                                <h5>{{store.name}}</h5>
                                <p class="small">台中市北區繼光街199號2F</p>
                                <p class="small">04-12345678</p>
                                <p class="small">08:00 ~ 21:00</p>
                                <p class="content">
                                    壹些內容壹些內容壹些內容壹些內容壹些內容壹些內容，壹些內容壹些內容壹些內容壹些內容
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
    
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
            storeList: []
        }
    },
    mounted() {
        this._getStoreList()
    },
    methods: {
        ...mapActions([
            'getStoreList'
        ]),
        async _getStoreList() {
            var res = await this.getStoreList()
            if(res.code === 10) {
                this.storeList = res.data.items
            }
        }
    }
}

</script>


<style lang="stylus">

</style>