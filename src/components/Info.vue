<template>
    <v-content>
        <v-container fluid>
            <div class="main-title">
                <ul>
                    <li>商店介紹</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="title-img" :style="{'background-image': 'url('+ bgImgSrc +')'}"></div>
                <div class="page-content">
                    <h4>{{serviceInfo.name}}</h4>
                    <p class="desc">{{serviceInfo.desc}} </p>
                    <div style="margin-top: 20px"></div>
                    <el-row :gutter="30">
                        <el-col :sm="8"
                                v-for="store in storeList">
                            <div class="box" @click="showStoreMap(store)">
                                <div class="icon-location"></div>
                                <h5>{{store.name}}</h5>
                                <p class="small">{{store.city}}{{store.area}}{{store.addr}}</p>
                                <p class="small">{{store.tel}}</p>
                                <!--<p class="small">08:00 ~ 21:00</p>-->
                                <p class="content">
                                    {{store.info}}
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'Products',
    components: {
        HeaderCpt: Header,
        SideBar,
        QrcodeModal: QRCodeModal
    },
    data() {
        return {
            storeList: [],
            serviceInfo: {}
        }
    },
    mounted() {
        this._getService()
        this._getStoreList()
    },
    computed: {
        ...mapState({
            imgs: state => state.imgs,
        }),
        ...mapGetters([
            'account',
            'apiHost',
            'apiModule',
        ]),
        bgImgSrc() {
            return this.imgs.bgPrimaryWImg ? `http://${this.apiHost}/${this.apiModule.sys}/${this.imgs.bgPrimaryWImg}` : ''
        }
    },
    methods: {
        ...mapMutations([
            'controlModal',
            'setAlertMsg',
            'gotMapInfo',
        ]),
        ...mapActions([
            'getStoreList',
            'getStore',
            'getService',
        ]),
        async _getService() {
            var res = await this.getService()
            if(res.code === 10) {
                this.serviceInfo = res.data
            }
        },
        async _getStoreList() {
            var res = await this.getStoreList()
            if(res.code === 10) {
                this.storeList = res.data.items
                // this.$nextTick(() => {
                //     _.each(this.storeList, (sto, i) => {
                //         console.log(this.$refs.map[i])
                //         var _opt = {
                //             center: { lat: -34.397, lng: 150.644},
                //             zoom: 8
                //         };
                //         var map = new google.maps.Map(
                //             this.$refs.map[i],
                //             _opt);
                //     })
                    
                // })
                
                
            }
        },
        async showStoreMap(store) {
            var res = await this.getStore(store.sn)
            if(res.code === 10) {
                this.gotMapInfo(res.data)
                this.controlModal({target: 'storeMap', boo: true})
            }
            
        }
        
    }
}

</script>


<style lang="stylus">

</style>