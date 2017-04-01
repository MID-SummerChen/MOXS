<template>
  <div class="page" id="home">
    <header-cpt></header-cpt>
    <main>
      <side-bar></side-bar>
      <v-content>
        <v-container fluid>
          <div class="slogan-wrap">
            <h3 class="slogan">最好吃的漢堡就在這裡</h3>
            <router-link to="/">立即訂位點餐</router-link>
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
  name: 'Home',
  components: {
    HeaderCpt: Header,
    SideBar,
  },
  data () {
    return {

    }
  },
  mounted() {
  }
}
</script>
