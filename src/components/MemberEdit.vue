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
                            <div class="img-wrap" :style="'background-image: url(' + memPicSrc  +')'"></div>
                            <button class="btn-t2" @click="triggerFileSelector">更新相片</button>
                            <input ref="fileSelector" v-show="false" type="file" @change="onUpload">
                        </el-col>
                        <el-col :sm="18"
                                class="right">
                            <div class="top-info">
                                <div class="form-group">
                                    <!--{{account}}-->
                                    <label>E-MAIL帳號</label>
                                    <p>{{form.email}}</p>
                                </div>
                                <div class="form-group-inline">
                                    <span>
                                        <label>姓</label>
                                        <input type="text" v-model="form.lastName">
                                    </span>
                                    <span>
                                        <label>名</label>
                                        <input type="text" v-model="form.firstName">
                                    </span>
                                    <span>
                                        <label>稱謂</label>
                                        <el-select v-model="form.gender">
                                            <el-option
                                            v-for="o in genderOpts"
                                            :label="o.label"
                                            :value="o.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </div>
                            </div>
    
                            <h5>聯絡資訊</h5>
                            <form>
                                <div class="form-group">
                                    <label>手機</label>
                                    <input type="text" v-model="form.cell">
                                </div>
                                <div class="form-group">
                                    <label>住址</label>
                                    <el-row :gutter="20">
                                        <el-col :sm="8">
                                            <el-select v-model="form.city">
                                                <el-option
                                                v-for="o in cityOpts"
                                                :label="o.value"
                                                :value="o.value">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :sm="8">
                                            <el-select v-model="form.area">
                                                <el-option
                                                v-for="o in areaOpts"
                                                :label="o.value"
                                                :value="o.value">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :sm="24">
                                            <div style="margin-top: 10px"></div>
                                            <input type="text" v-model="form.addr">
                                        </el-col>
    
                                    </el-row>
                                </div>
                            </form>
                        </el-col>
    
                    </el-row>
    
                    <div class="btn-wrap">
                        <a href="">取消</a>
                        <a href=""
                           class="text-blue" @click.prevent="onSubmit">儲存</a>
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
            limitedPage: true,
            memPicSrc: "",
            form: {
                lastName: "",
                firstName: "",
                gender: "FEMALE",
                cell: "",
                city: "",
                area: "",
                addr: "",
                email: "",
                ac: {
                    resId: ""
                }
            },
            genderOpts: [
                {label: "女士", value: "FEMALE"},
                {label: "先生", value: "MALE"},
            ],
            cityOpts: [
                {value: "台中"},
            ],
            areaOpts: [
                {value: "南區"},
                {value: "北區"},
                {value: "東區"},
                {value: "西區"},
            ]
        }
    },
    mounted() {
        this.limitedPageCheck()
        this.setData()
    },
    computed: {
        ...mapGetters([
            'account',
            'apiHost',
            'apiModule',
        ])
    },
    methods: {
        ...mapActions([
            'updateMember',
            'memImgUpload',
            'checkLoginStatus',
        ]),
        setData() {
            if(this.account.mb) {
                this.form.email = this.account.mb.email
                this.form.lastName = this.account.mb.lastName || ""
                this.form.firstName = this.account.mb.firstName || ""
                this.form.city = this.account.mb.city || ""
                this.form.area = this.account.mb.area || ""
                this.form.addr = this.account.mb.addr || ""
                this.form.cell = this.account.mb.cell || ""
                this.form.ac.resId = this.account.resId || ""
                this.memPicSrc = `http://${this.apiHost}/${this.apiModule.sys}${this.account.resUrl}` || ""
            }else {
                setTimeout(this.setData, 500)
            }
        },
        triggerFileSelector() {
            console.dir(this.$refs)
            $(this.$refs.fileSelector).trigger("click")
        },
        async onUpload(e) {
            console.dir(e.target.files[0])
            var data = new FormData()
            data.append('file', e.target.files[0])
            var res = await this.memImgUpload(data)
            if(res.code === 10) {
                this.$message({
                    message: '圖片上傳成功',
                    type: 'success'
                });
                this.memPicSrc = `http://${this.apiHost}/${this.apiModule.sys}${res.data.url}`
                this.form.ac.resId = res.data.id
                
            }

        },
        async onSubmit() {
            var data = {
                type: "DEFAULT",
                regType: "DEFAULT",
                devType: "WEB",
                ...this.form,
            }
            var res = await this.updateMember(data)
            if(res.code === 10) {
                this.$message({
                    message: '更新成功',
                    type: 'success'
                });
            }
        }
    }
}

</script>


<style lang="stylus">

</style>