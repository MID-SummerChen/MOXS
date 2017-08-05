<template>
  <div id="app" :class="{noScroll: noScroll}">
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
    <v-app top-toolbar left-fixed-sidebar>

      <div class="page" :id="$route.name">
        <header>
          <v-toolbar :fixed="true">
            <v-toolbar-side-icon :ripple="false" class="hidden-md-and-up" @click.native.stop="showSidebar = !showSidebar" />
            <v-toolbar-logo>
              <router-link to="/" class="logo">
                <img v-if="resources.logoDarkWImg" :src="getLogoImg()" alt="">
              </router-link>
              <!--<img v-if="resources.logoDarkWImg" :src="getLogoImg()" alt="">-->
            </v-toolbar-logo>
            <v-spacer />
            <v-btn v-if="modules.RESV" :ripple="false" @click.native="CONTROL_MODAL({target: 'cart', boo: true})">
              <v-icon>today</v-icon>
              <span class="toolbar-icon-title">預約點餐</span>
            </v-btn>
            <v-btn v-if="isLogin" :ripple="false">
              <v-icon>account_circle</v-icon>
              <span class="toolbar-icon-title">{{account.mb ? account.mb.name : '訪客'}}</span>
              <div class="headerSubMenu">
                <router-link :to="{name: 'Member'}">會員中心</router-link>
                <a href="" @click.prevent="_onLogout">登   出</a>
              </div>
            </v-btn>
            <v-btn v-else :ripple="false" @click.native="CONTROL_MODAL({target: 'login', boo: true})">
              <v-icon>account_circle</v-icon>
              <span class="toolbar-icon-title">會員登入</span>
            </v-btn>
          </v-toolbar>
        </header>
        <main>
          <v-sidebar fixed v-model="showSidebar">
            <router-link to="/" class="logo">
              <img v-if="resources.logoDarkWImg" :src="getLogoImg()" alt="">
            </router-link>
            <v-list>
              <v-list-item v-if="menu.indexOf('ITEM') > -1">
                <v-list-tile ripple>
                  <router-link :to="{name: 'Products'}">{{modules.ITEM.TITLE}}</router-link>
                </v-list-tile>
              </v-list-item>
              <!--<v-list-item v-if="modules.RESV">
                <v-list-tile ripple>
                  <router-link :to="{name: 'Products'}">{{modules.RESV.TITLE}}</router-link>
                </v-list-tile>
              </v-list-item>-->
              <v-list-item v-if="menu.indexOf('ORD') > -1">
                <v-list-tile ripple>
                  <router-link :to="{name: 'Products'}">{{modules.ORD.TITLE}}</router-link>
                </v-list-tile>
              </v-list-item>
              <v-list-item>
                <v-list-tile v-if="menu.indexOf('NEWS') > -1" ripple>
                  <router-link :to="{name: 'News'}">{{modules.NEWS.TITLE}}</router-link>
                </v-list-tile>
              </v-list-item>
              <v-list-item>
                <v-list-tile v-if="menu.indexOf('INFO') > -1" ripple>
                  <router-link :to="{name: 'Info'}">{{modules.INFO.TITLE}}</router-link>
                </v-list-tile>
              </v-list-item>
              <v-list-item>
                <v-list-tile ripple>
                  <a @click="CONTROL_MODAL({target: 'qrcode', boo: true})">APP下載</a>
                </v-list-tile>
              </v-list-item>


            </v-list>
          </v-sidebar>
          <router-view></router-view>
        </main>
      </div>
    </v-app>

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
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
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
    data() {
      return {
        showSidebar: true,
        eventHub,
        // modules: [
        //   {title: "餐點瀏覽", route: {name: 'Products'}},
        //   {title: "訂位點餐", route: {name: 'Products'}},
        //   {title: "動態消息", route: {name: 'News'}},
        //   {title: "商店資訊", route: {name: 'Info'}},
        //   {title: "會員中心", route: {name: 'Member'}},
        //   {title: "APP下載", openModal: "qrcode"},
        //   {divider: true},
        //   {title: "會員登入", openModal: "login"},
        // ]
      }
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
        noScroll: state => state.modal.noScroll,
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
    mounted() {
    },
    methods: {
      ...mapMutations([
        'CONTROL_MODAL',
        'setAlertMsg',
      ]),
      ...mapActions([
        'checkLoginStatus',
        'onLogout',
        'getSiteConfig',
      ]),
      getLogoImg() {
        return `${this.resHttpPath}/${this.resources.logoLightWImg}`
      },
      async _onLogout() {
        var res = await this.onLogout()
        console.log(res)
        if(res.code === 10) {
          this.$router.push({name: 'Home'})
          this.checkLoginStatus()
        }
      },
    }
  }

</script>

<style lang="stylus">
.toolbar
  background-color #fff
  border-bottom: 1px solid #ccc
  box-shadow none
  @media(max-width: mobile-media)
    z-index: 99
    background-color: #333
  .btn
    color: #666
    background-color: transparent
    border: 0
    box-shadow: none
    padding: 0 10px
    transition: none 
    font-size: 15px
    height: 100%
    @media(max-width: mobile-media)
      margin: 0
      min-width: 20px
      color: #fff
    span.toolbar-icon-title
      @media(max-width: mobile-media)
        display: none
    &:hover 
      color: #333
      @media(max-width: mobile-media)
        color: #fff
      transition: none 
      .headerSubMenu
        display: block
    

  i 
    font-size: 30px
    margin-right: 5px
    
  .headerSubMenu
    display: none
    position: absolute
    width: 120px
    background-color: rgba(#000, 0.6)
    top: 0 
    right: 0 
    margin-top: 63px 
    margin-right: -15px
    &:hover 
      display: block
    &:after 
      content: ""
      display: block 
      position: absolute
      border-bottom: 10px solid rgba(#000, 0.6)
      border-left: 5px solid transparent
      border-right: 5px solid transparent
      top: 0 
      margin-top: -10px
      right: 30px
      z-index: 9

    a 
      display: block 
      padding: 8px 5px 
      text-align: center
      text-decoration: none 
      color: #eee
      font-size: 16px

      &:hover 
        color: #fff
        font-weight: bold




</style>