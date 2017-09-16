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
                        <div class="inside-wrap">
                            <div v-if="memPicSrc" class="img-wrap" :style="'background-image: url(' + memPicSrc  +')'">
                                <transition name="fade">
                                    <div v-if="picLoading" class="cover"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
                                </transition>
                            </div>
                            <div v-else class="img-wrap" 
                                style="background-image: url('/static/imgs/food01.jpg')"></div> <!-- 預設圖 -->
                            <p>{{form.email}}</p>
                            <p v-if="account.mb">{{account.mb.name}} {{toGender(account.mb.gender)}}</p>
                            <div v-if="!editMode" class="btns">
                                <button class="my-btn"
                                        @click="editMode = true">編輯帳戶</button>
                                <button class="my-btn"
                                        @click="triggerFileSelector">更新相片</button>
                                <button class="my-btn"
                                        @click="CONTROL_MODAL({target: 'memberPw', boo: true})">變更密碼</button>
                            </div>
                            <input ref="fileSelector"
                                v-show="false"
                                type="file"
                                @change="onUpload">
                        </div>
                    </div>
                    <div ref="scrollBox" class="right">
                        <h5>帳戶資訊</h5>
                        <form>
                            <div v-if="editMode" class="form-group">
                                <label>姓名</label>
                                <div class="form-content">
                                    <div class="form-inline-content">
                                        <input type="text"
                                            v-model="form.name">
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
                                    <el-date-picker v-model="form.birth" type="date" @change="function(val) {form.birth = val}"></el-date-picker>
                                </div>
                                <div v-else class="form-content-static">{{form.birth | fullDate}}</div>
    
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
                                                    @change="onCityOptsChanged"
                                                   style="width: 100px">
                                            <el-option v-for="o in cityList"
                                                       :label="o.geoName"
                                                       :value="o.geoName"
                                                       >
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="form.area"
                                                   style="width: 100px">
                                            <el-option v-for="o in areaList"
                                                       :label="o.geoName"
                                                       :value="o.geoName">
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
            picLoading: false,
            form: {
                name: "",
                gender: "FEMALE",
                cell: "",
                city: "",
                area: "",
                birth: "",
                addr: "",
                email: "",
            },
            cityList: [],
            areaList: [],
        }
    },
    async mounted() {
        await this._getGeo()
        Ps.initialize(this.$refs.scrollBox);
        this.limitedPageCheck()
        this.setData()
        
    },
    computed: {
        ...mapGetters([
            'account',
        ])
    },
    methods: {
        ...mapActions([
            'updateMember',
            'memImgUpload',
            'checkLoginStatus',
            'getGeo',
        ]),
        async _getGeo(superCode) {
            console.log(superCode)
            var data ={
                superCode
            }
            var res = await this.getGeo(data)
            if(res.code === 10) {
                superCode
                ? this.areaList = res.data
                : this.cityList = res.data
            }
            return
        },
        onCityOptsChanged() {
            this.form.area = ""
            this._getGeo(this.cityList.find(o => o.geoName === this.form.city).code)
        },
        async setData() {
            var acc = this.account
            if (acc.mb) {
                var i = _.findIndex(this.cityList, {geoName: acc.mb.city})
                if(i > -1) {
                    await this._getGeo(this.cityList[i].code)
                }
                this.form = _.assign({}, this.form, {
                    email: acc.id,
                    name: acc.mb.name,
                    city: acc.mb.city,
                    area: acc.mb.area,
                    addr: acc.mb.addr,
                    cell: acc.mb.cell,
                    birth: acc.mb.birth,
                })
                this.memPicSrc = acc.resUrl ? `${this.resHttpPath}${acc.resUrl}` : ""
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
            this.picLoading = true
            var res = await this.memImgUpload(data)
            if (res.code === 10) {
                this.$message({
                    message: '圖片上傳成功',
                    type: 'success'
                });
                this.picLoading = false

                var res = await this.updateMember({ac: {resId: res.data.id}})
                if (res.code === 10) {
                    await this.checkLoginStatus()
                    this.memPicSrc = `${this.resHttpPath}${this.account.resUrl}`
                    this.$message({
                        message: '更新成功',
                        type: 'success'
                    });
                    this.editMode = false
                }

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