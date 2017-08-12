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
                  <p class="username">{{account.mb.name}}</p>
              </div>
              <div>
                <button class="btn-t2" @click="$router.push({name: 'MemberEdit'})">編輯MOXS帳戶</button>
              </div>
          </div>
          <resv-list v-if="checkoutType === 'resv'"></resv-list>
          <ord-list v-if="checkoutType === 'ord'"></ord-list>
          
         
        </div>
      </div>
  
    </v-container>
  </v-content>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import SideBar from '@/components/layout/SideBar.vue'
import ResvList from '@/components/ResvList.vue'
import OrdList from '@/components/OrdList.vue'
import eventHub from '@/utils/eventHub'
import commonMixin from '@/utils/commonMixin'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Products',
  mixins: [commonMixin],
  components: {
    HeaderCpt: Header,
    SideBar,
    ResvList,
    OrdList,
  },
  data() {
    return {
      memPicSrc: "",
    }
  },
  mounted() {
    this.limitedPageCheck()
    this.memPicSrc = this.account.resUrl ? `${this.resHttpPath}${this.account.resUrl}` : ""
  },
  computed: {
    ...mapGetters([
      'account',
    ])
  },
  methods: {
    ...mapActions([
      'getAllResv',
      'getAllOrd',
    ]),
  }
}
</script>


<style lang="stylus">
</style>