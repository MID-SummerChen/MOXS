<template>
  <div class="page" id="products">
    <header-cpt></header-cpt>
    <main>
      <side-bar></side-bar>
      <v-content>
        <v-container fluid>
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">主餐</el-breadcrumb-item>
            <el-breadcrumb-item>西式</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="margin-top: 20px"></div>

          <div>
            <el-button v-for="n in 8">漢堡</el-button>
          </div>

          <div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="8" :md="6" v-for="(o, index) in 10" style="padding: 10px">
                <el-card :body-style="{ padding: '0px' }">
                  <img src="/static/imgs/food03.jpg" class="image">
                  <div class="card-content">
                    <div>
                      <p class="tag">微辣</p>
                      <p class="title">藍帶豬排堡</p>
                      <p class="dollar">$180</p>
                    </div>
                    <div class="icon-plus"></div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

        </v-container>
      </v-content>

    </main>
  </div>

</template>

<script>
  import Header from '@/components/layout/Header.vue'
  import SideBar from '@/components/layout/SideBar.vue'
  import QRCodeModal from '@/components/widgets/QRCodeModal.vue'
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    name: 'Products',
    components: {
      HeaderCpt: Header,
      SideBar,
      QrcodeModal: QRCodeModal
    },
    data () {
      return {
      }
    },
    mounted() {
    }
  }
</script>


<style lang="stylus">

</style>
