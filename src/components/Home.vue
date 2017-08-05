<template>
  <v-content :style="{'background-image': 'url('+ bgImgSrc +')'}">
    <v-container fluid>
      <div class="slogan-wrap">
        <h3 class="slogan">{{pageMsgs.title}}</h3>
        <router-link to="/">立即訂位點餐</router-link>
      </div>
    </v-container>
  </v-content>

</template>

<script>
  import Header from '@/components/layout/Header.vue'
  import SideBar from '@/components/layout/SideBar.vue'
  import QRCodeModal from '@/components/widgets/QRCodeModal.vue'
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
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
  computed: {
    ...mapState({
      productModal: state => state.modal.product,
      checkoutModal: state => state.modal.checkout,
      qrcodeModal: state => state.modal.qrcode,
      loginModal: state => state.modal.login,
      orderRecord: state => state.modal.orderRecord,
      phoneVerify: state => state.modal.phoneVerify,
      memberPw: state => state.modal.memberPw,
      newsDetail: state => state.modal.newsDetail,
      storeMap: state => state.modal.storeMap,
      cart: state => state.modal.cart,
      noScroll: state => state.modal.noScroll,
      alertBox: state => state.alertBox.display,
      isLogin: state => state.isLogin,
      menu: state => state.menu,
      resources: state => state.resources,
    }),
    ...mapGetters([
      'account',
      'pageMsgs',
    ]),
    bgImgSrc() {
      return this.resources.bgPrimaryWImg ? `${this.resHttpPath}/${this.resources.bgPrimaryWImg}` : ''
    }
  },
  mounted() {
  }
}
</script>
