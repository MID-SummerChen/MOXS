<template>
    <v-content>
        <v-container fluid>
            <div class="main-title">
                <ul>
                    <li @click="$router.push({name: 'Member'})">會員中心</li>
                    <li>編輯帳戶</li>
                </ul>
            </div>
            <div class="main-content">
                <div class="paper">
                    <div class="left">
                        <div v-if="memPicSrc" class="img-wrap" :style="'background-image: url(' + memPicSrc  +')'"></div>
                        <div v-else class="img-wrap"
                             style="background-image: url('/static/imgs/food01.jpg')"></div>
                        <p>{{form.email}}</p>
                        <p v-if="account.mb">{{account.mb.lastName}} {{account.mb.firstName}} {{toGender(account.mb.gender)}}</p>
                        <div v-if="!editMode" class="btns">
                            <button class="my-btn"
                                    @click="editMode = true">編輯MOXS帳戶</button>
                            <button class="my-btn"
                                    @click="triggerFileSelector">更新相片</button>
                            <button class="my-btn"
                                    @click="controlModal({target: 'memberPw', boo: true})">變更密碼</button>
                        </div>
                        <input ref="fileSelector"
                               v-show="false"
                               type="file"
                               @change="onUpload">
                    </div>
                    <div class="right">
                        <h5>帳戶資訊</h5>
                        <form>
                            <div v-if="editMode" class="form-group">
                                <label>姓</label>
                                <div class="form-content">
                                    <div class="form-inline-content">
                                        <input type="text"
                                            v-model="form.lastName">
                                    </div>
                                    <label>名</label>
                                    <div class="form-inline-content">
                                        <input type="text"
                                            v-model="form.firstName">
                                    </div>
                                    <label>稱謂</label>
                                    <div class="form-inline-content">
                                        <el-select v-model="form.gender">
                                            <el-option v-for="o in genderOpts"
                                                    :label="o.label"
                                                    :value="o.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
    
                            </div>
                            <div class="form-group">
                                <label>生日</label>
                                <div v-if="editMode" class="form-content">
                                    <input type="text"
                                           v-model="form.birth">
                                </div>
                                <div v-else class="form-content-static">{{form.birth}}</div>
    
                            </div>
                            <div class="form-group">
                                <label>手機</label>
                                <div v-if="editMode" class="form-content">
                                    <input type="text"
                                           v-model="form.cell">
                                </div>
                                <div v-else class="form-content-static">{{form.cell}}</div>
    
                            </div>
                            <div class="form-group">
                                <label>住址</label>
                                <div v-if="editMode" class="form-content">
                                    <div>
                                        <el-select v-model="form.city"
                                                   style="width: 100px">
                                            <el-option v-for="o in cityOpts"
                                                       :label="o.value"
                                                       :value="o.value">
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="form.area"
                                                   style="width: 100px">
                                            <el-option v-for="o in areaOpts"
                                                       :label="o.value"
                                                       :value="o.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="margin-top: 20px">
                                        <input type="text"
                                               v-model="form.addr">
                                    </div>
                                </div>
                                <div v-else class="form-content-static">{{form.city}}{{form.area}}{{form.addr}}</div>
    
                            </div>
                        </form>
                        <div v-if="editMode" class="btn-wrap">
                            <a href="" @click.prevent="onCancel">取消</a>
                            <a href=""
                            class="text-blue" @click.prevent="onSubmit">儲存</a>
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
    name: 'MemberEdit',
    mixins: [commonMixin],
    components: {
        HeaderCpt: Header,
        SideBar,
    },
    data() {
        return {
            limitedPage: true,
            memPicSrc: "",
            editMode: false,
            form: {
                lastName: "",
                firstName: "",
                gender: "FEMALE",
                cell: "",
                city: "",
                area: "",
                birth: "",
                addr: "",
                email: "",
                ac: {
                    resId: ""
                }
            },
            genderOpts: [
                { label: "女士", value: "FEMALE" },
                { label: "先生", value: "MALE" },
            ],
            cityOpts: [
                { value: "台中" },
            ],
            areaOpts: [
                { value: "南區" },
                { value: "北區" },
                { value: "東區" },
                { value: "西區" },
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
        toGender(val) {
          var i = this.genderOpts.findIndex(opt => opt.value === val)
          return i > -1 ? this.genderOpts[i].label : ""
        },
        setData() {
            if (this.account.mb) {
                this.form.email = this.account.mb.email
                this.form.lastName = this.account.mb.lastName || ""
                this.form.firstName = this.account.mb.firstName || ""
                this.form.city = this.account.mb.city || ""
                this.form.area = this.account.mb.area || ""
                this.form.addr = this.account.mb.addr || ""
                this.form.cell = this.account.mb.cell || ""
                this.form.birth = this.account.mb.birth || ""
                this.form.ac.resId = this.account.resId || ""
                this.memPicSrc = this.account.resUrl ? `http://${this.apiHost}/${this.apiModule.sys}${this.account.resUrl}` : ""
            } else {
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
            if (res.code === 10) {
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
            if (res.code === 10) {
                this.checkLoginStatus()
                this.$message({
                    message: '更新成功',
                    type: 'success'
                });
                this.editMode = false
            }
        },
        onCancel() {
            this.setData()
            this.editMode = false
        }
    }
}

</script>


<style lang="stylus">

</style>