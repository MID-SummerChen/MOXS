<template>
    <v-content>
        <v-container fluid>
            <div class="main-title">
                <ul>
                    <li>動態消息</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="paper">
                    <div class="paper-content">
                        <div class="items">
                            <div class="item" v-for="n in 4" @click="controlModal({target: 'newsDetail', boo: true})">
                                <div class="item-img" :style="{'background-image': 'url(/static/imgs/food03.jpg)'}"></div>
                                <div class="item-content">
                                    <p>消息類別消息類別標題</p>
                                    <h5>新品上市 嚐鮮折扣</h5>
                                    <div class="text">
                                        項目內容項目內容項目內容，項目內容項目內容項目內容項目內容項目內容項目內容項目內容，項目內容項目內容，
                                        項目內容項目內容項目內容項目內容項目內容項目內容...
                                    </div>

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
    },
    methods: {
      ...mapMutations([
        'controlModal'
      ])
    }
}

</script>


<style lang="stylus">

</style>