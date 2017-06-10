<template>
  <v-content>
    <v-container fluid>
      <div class="main-title">
        <ul>
          <li>會員中心</li>
        </ul>
      </div>
      <div class="main-content">
        <div class="paper">
          <div class="top-info">
              <div class="img-wrap" :style="{'background-image': 'url(' +memPicSrc +')'}"></div>
              <div v-if="account.mb" class="text-info">
                  <p class="email">{{account.id}}</p>
                  <p class="username">{{account.mb.lastName}}{{account.mb.firstName}}</p>
              </div>
              <div>
                <button class="btn-t1" @click="$router.push({name: 'MemberEdit'})">編輯帳戶</button>
              </div>
          </div>
          <div class="record">
              <div class="record-header">
                  最新預約記錄
              </div>
              <div class="item" v-for="n in 4" @click="$router.push({name: 'MemberRecordDetail', params: {sn: n}})">
                  <p>
                      <span>內用點餐  2017/3/22(三) 18:30 </span>
                  </p>
                  <p>台中復興店 4人 $2400</p>
              </div>
              <div class="record-footer">
                  <button class="btn-t1" @click="$router.push({name: 'MemberRecord'})">查看全部預約記錄</button>
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
      memPicSrc: ""
    }
  },
  mounted() {
    this.limitedPageCheck()
    this.memPicSrc = this.account.resUrl ? `http://${this.apiHost}/${this.apiModule.sys}${this.account.resUrl}` : ""
  },
  computed: {
    ...mapGetters([
      'account',
      'apiHost',
      'apiModule',
    ])
  },
  methods: {
  
  }
}
</script>


<style lang="stylus">
</style>