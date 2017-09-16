<template>
    <v-content>
        <v-container fluid>
            <div class="main-title">
                <ul>
                    <li>動態消息</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="items">
                    <div class="item" v-for="n in newsList" @click="$router.push({name: 'News', query: {sn: n.newsSn}})">
                        <div v-if="n.newsImageUrl" class="item-img" :style="{'background-image': 'url(' + toImgSrc(n.newsImageUrl) + ')'}"></div>
                        <div class="item-content">
                            <div class="item-content-body">
                                <h5>{{n.newsTitle}}</h5>
                                <!-- <p>{{n.newsSubtitle}}</p> -->
                                <div class="text">{{n.newsContent}}</div>
                            </div>
                            <div class="item-content-footer">
                                <a href="">閱讀更多</a>
                            </div>

                        </div>
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
            newsList: [],
            page: 1,
            totalPages: 1,
            isLoading: false,
        }
    },
    mounted() {
        this._getNewsList()
        if (this.$route.query.sn) {
            this.CONTROL_MODAL({ target: 'newsDetail', boo: true })
        }
    },
    watch: {
        $route() {
            if (this.$route.query.sn) {
                this.CONTROL_MODAL({ target: 'newsDetail', boo: true })
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
            var data = {
                maxRecords: 7,
                page: this.page,
                orderBy: "updateAt:desc"
            }
            this.isLoading = true
            var res = await this.getNewsList()
            if (res.code === 10) {
                this.totalPages = res.data.totalPages
                this.newsList = res.data.items
            }
            return
        },
        async onLoadMore() {
            this.page = this.page + 1
            await this._getNewsList()

        }
    }
}

</script>


<style lang="stylus">

</style>