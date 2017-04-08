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
              <button class="btn-t1">編輯帳戶</button>
              <button class="btn-t1">修改密碼</button>
          </div>
          <div class="record">
              <div class="record-header">
                  最新預約記錄
              </div>
              <div class="item" v-for="n in 4">
                  <p>內用點餐 2017/02/18(三) 18:00</p>
                  <p>台中復興店 4人 $2400</p>
              </div>
              <div class="record-footer">
                  <button class="btn-t1">查看全部預約記錄</button>
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
  }
}

</script>


<style lang="stylus">

</style>