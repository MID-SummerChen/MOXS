<template>
  <v-content>
    <v-container fluid>
      <div class="main-title">
        <ul>
          <li>交易結果</li>
        </ul>
      </div>
      <div class="main-content">
        <div class="paper">
          <div class="status is-success">
            <i class="fa fa-check-circle"></i>
            預約成功
          </div>
          <div class="content-wrap">
            預約號碼
            <div class="number-box">
              123456
            </div>
            <el-row :gutter="40">
              <el-col :sm="12">
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
              </el-col>
              <el-col :sm="12">
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
                <p>紀錄編號：RES1238523523502134</p>
                <p>預約分店：台中復興店</p>
              </el-col>
            </el-row>
          </div>
         
          <div class="btn-wrap">
            <a href="" class="text-blue">查訊預約記錄</a>
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