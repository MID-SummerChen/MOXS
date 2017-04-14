<template>

  <v-content>
    
    <v-container fluid>
      <div class="main-title">
        <ul>
          <li v-for="b in bread">
            <router-link :to="b.link">{{b.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="category-btn-group">
        <el-button v-for="n in 8">漢堡</el-button>
      </div>

      <div class="items">
        <el-card v-for="n in 14" :body-style="{ padding: '0px' }">
              <div class="img-wrap">
              </div>
              <div class="card-content">
                <div>
                  <p class="title">藍帶豬排堡</p>
                  <p class="dollar">$180</p>
                </div>
                <div class="icon-plus"  @click="controlModal({target: 'product', boo: true})"></div>
              </div>
            </el-card>
          </el-col>
      </div>

    </v-container>
  </v-content>

</template>

<script>
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'Products',
    components: {
    },
    data() {
      return {
        isShowCart: false,
        bread: [
          {name: "主餐", link: "/"},
          {name: "美式", link: "/"},
          {name: "漢堡", link: "/"},
        ]
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters([
      ])
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