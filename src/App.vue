<template>
  <div id="app">
    <transition name="slide">
      <cart v-if="cart"></cart>
    </transition>
    <transition name="fade">
      <phone-verify-modal v-if="phoneVerify"></phone-verify-modal>
      <resv-success-modal v-if="resvSuccess"></resv-success-modal>
    </transition>
    <transition name="fade">
      <login-modal v-if="loginModal"></login-modal>
      <qrcode-modal v-if="qrcodeModal"></qrcode-modal>
      <resv-checkout-modal v-if="resvCheckoutModal"></resv-checkout-modal>
      <ord-checkout-modal v-if="ordCheckoutModal"></ord-checkout-modal>
      <product-modal v-if="productModal"></product-modal>
      <product-intro-modal v-if="productIntro"></product-intro-modal>
      <product-order-modal v-if="productOrder"></product-order-modal>
      <order-record-modal v-if="orderRecord"></order-record-modal>
      <member-pw-modal v-if="memberPw"></member-pw-modal>
      <news-detail-modal v-if="newsDetail"></news-detail-modal>
      <store-map-modal v-if="storeMap"></store-map-modal>
    </transition>

    <transition name="fade">
      <alert-box v-if="alertBox"></alert-box>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/layout/Header.vue'
  import SideBar from '@/components/layout/SideBar.vue'
  import QRCodeModal from '@/components/widgets/QRCodeModal.vue'
  import ResvCheckoutModal from '@/components/widgets/ResvCheckoutModal.vue'
  import OrdCheckoutModal from '@/components/widgets/OrdCheckoutModal.vue'
  import ProductModal from '@/components/widgets/ProductModal.vue'
  import ProductIntroModal from '@/components/widgets/ProductIntroModal.vue'
  import ProductOrderModal from '@/components/widgets/ProductOrderModal.vue'
  import LoginModal from '@/components/widgets/LoginModal.vue'
  import OrderRecordModal from '@/components/widgets/OrderRecordModal.vue'
  import ResvSuccessModal from '@/components/widgets/ResvSuccessModal.vue'
  import PhoneVerifyModal from '@/components/widgets/PhoneVerifyModal.vue'
  import MemberPwModal from '@/components/widgets/MemberPwModal.vue'
  import NewsDetailModal from '@/components/widgets/NewsDetailModal.vue'
  import StoreMapModal from '@/components/widgets/StoreMapModal.vue'
  import AlertBox from '@/components/widgets/AlertBox.vue'
  import Cart from '@/components/widgets/Cart.vue'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'app',
    components: {
      HeaderCpt: Header,
      SideBar,
      QrcodeModal: QRCodeModal,
      ResvCheckoutModal,
      OrdCheckoutModal,
      ProductModal,
      ProductIntroModal,
      ProductOrderModal,
      LoginModal,
      OrderRecordModal,
      StoreMapModal,
      NewsDetailModal,
      MemberPwModal,
      PhoneVerifyModal,
      ResvSuccessModal,
      AlertBox,
      Cart,
    },
    computed: {
      ...mapState({
        productModal: state => state.modal.product,
        productIntro: state => state.modal.productIntro,
        productOrder: state => state.modal.productOrder,
        resvCheckoutModal: state => state.modal.resvCheckout,
        ordCheckoutModal: state => state.modal.ordCheckout,
        qrcodeModal: state => state.modal.qrcode,
        loginModal: state => state.modal.login,
        orderRecord: state => state.modal.orderRecord,
        resvSuccess: state => state.modal.resvSuccess,
        phoneVerify: state => state.modal.phoneVerify,
        memberPw: state => state.modal.memberPw,
        newsDetail: state => state.modal.newsDetail,
        storeMap: state => state.modal.storeMap,
        cart: state => state.modal.cart,
        alertBox: state => state.alertBox.display,
        isLogin: state => state.isLogin,
        modules: state => state.modules,
        menu: state => state.menu,
        resources: state => state.resources,
      }),
      ...mapGetters([
        'account',
        'resHttpPath',
      ])
    },
    methods: {
    }
  }

</script>

<style lang="stylus">
</style>