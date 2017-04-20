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
              <div class="img-wrap"><img src="/static/imgs/food03.jpg" alt=""></div>
              <div class="text-info">
                  <p>ryan.mtntech@gmail.com</p>
                  <p>林清揚陽先生</p>
              </div>
              <div>
                <button class="btn-t1" @click="$router.push({name: 'MemberEdit'})">編輯帳戶</button>
                <button class="btn-t1"  @click="controlModal({target: 'memberPw', boo: true})">修改密碼</button>
              </div>
          </div>
          <div class="record">
              <div class="record-header">
                  最新預約記錄
              </div>
              <div class="item" v-for="n in 4">
                  <p>
                      <span @click="controlModal({target: 'orderRecord', boo: true})">內用點餐  2017/3/22(三) 18:30 </span>
                      <router-link target="_new" :to="{name: 'MemberRecordDetail', params: {sn: n}}" ><i class="fa fa-file-text-o"></i></router-link>
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