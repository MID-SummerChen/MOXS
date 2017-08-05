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
                            <div class="item" v-for="n in newsList" @click="$router.push({name: 'News', query: {sn: n.newsSn}})">
                                <div v-if="n.newsImageUrl" class="item-img" :style="{'background-image': 'url(' + toImgSrc(n.newsImageUrl) + ')'}"></div>
                                <div class="item-content">
                                    <p>{{n.newsSubtitle}}</p>
                                    <h5>{{n.newsTitle}}</h5>
                                    <div class="text">{{n.newsContent}}</div>

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
    mixins: [commonMixin],
    components: {
        HeaderCpt: Header,
        SideBar,
    },
    data() {
        return {
            newsList: []
        }
    },
    mounted() {
        this._getNewsList()
        if(this.$route.query.sn) {
            this.CONTROL_MODAL({target: 'newsDetail', boo: true})
        }
    },
    watch: {
        $route() {
            if(this.$route.query.sn) {
                this.CONTROL_MODAL({target: 'newsDetail', boo: true})
            }
        }
    },
    methods: {
        ...mapMutations([
            'CONTROL_MODAL',
        ]),
        ...mapActions([
            'getNewsList'
        ]),
        async _getNewsList() {
            var res = await this.getNewsList()
            if(res.code === 10) {
                this.newsList = res.data.items
            }
        }
    }
}

</script>


<style lang="stylus">

</style>