<template>
  <div id="app">
    <transition name="slide-fade">
      <cart v-if="cart"></cart>
    </transition>
    <transition name="fade">
      <qrcode-modal v-if="qrcodeModal"></qrcode-modal>
      <checkout-modal v-if="checkoutModal"></checkout-modal>
      <product-modal v-if="productModal"></product-modal>
      <login-modal v-if="loginModal"></login-modal>
    </transition>
    <v-app top-toolbar left-fixed-sidebar>

      <div class="page" :id="$route.name">
        <header>
          <v-toolbar :fixed="true">
            <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="showSidebar = !showSidebar" />
            <!--<v-toolbar-logo>
              <div class="icon-logo"></div>
            </v-toolbar-logo>
            <v-spacer />
            <v-btn icon dark>
              <v-icon>account_circle</v-icon>
            </v-btn>
            <v-btn icon dark>
              <v-icon>favorite</v-icon>
            </v-btn>-->
          </v-toolbar>
        </header>
        <main>
          <v-sidebar fixed v-model="showSidebar">
            <div class="icon-logo"></div>
            <v-list>
              <template v-for="m in menu">
                <v-list-item v-if="m.divider">
                  <v-divider light />
                </v-list-item>
                <v-list-item v-else-if="m.openModal">
                  <v-list-tile ripple>
                    <a @click="controlModal({target: m.openModal, boo: true})">{{m.title}}</a>
                  </v-list-tile>
                </v-list-item>
                <v-list-item v-else>
                  <v-list-tile ripple>
                    <router-link :to="m.route">{{m.title}}</router-link>
                  </v-list-tile>
                </v-list-item>


              </template>


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
  import CheckoutModal from '@/components/widgets/CheckoutModal.vue'
  import ProductModal from '@/components/widgets/ProductModal.vue'
  import LoginModal from '@/components/widgets/LoginModal.vue'
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
      CheckoutModal,
      ProductModal,
      LoginModal,
      Cart
    },
    data() {
      return {
        showSidebar: true,
        eventHub,
        menu: [
          {title: "餐點瀏覽", route: {name: 'Products'}},
          {title: "訂位點餐", route: {name: 'Products'}},
          {title: "動態消息", route: {name: 'Products'}},
          {title: "商店資訊", route: {name: 'Info'}},
          {title: "會員中心", route: {name: 'Member'}},
          {title: "APP下載", openModal: "qrcode"},
          {divider: true},
          {title: "會員登入", openModal: "login"},
        ]
      }
    },
    computed: {
      ...mapState({
        productModal: state => state.modal.product,
        checkoutModal: state => state.modal.checkout,
        qrcodeModal: state => state.modal.qrcode,
        loginModal: state => state.modal.login,
        cart: state => state.modal.cart,
      }),
      ...mapGetters([
      ])
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