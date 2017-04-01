<template>
  <div id="app">
    <transition name="fade">
      <qrcode-modal v-if="isShowQRCodeModal"></qrcode-modal>
      <checkout-modal v-if="isShowCheckoutModal"></checkout-modal>
    </transition>
    <v-app top-toolbar left-fixed-sidebar>

      <div class="page" :id="$route.name">
        <header>
          <v-toolbar class="trans-dark">
            <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="showSidebar = !showSidebar" />
            <v-toolbar-logo>
              <div class="icon-logo"></div>
            </v-toolbar-logo>
            <v-spacer />
            <v-btn icon dark>
              <v-icon>account_circle</v-icon>
            </v-btn>
            <v-btn icon dark>
              <v-icon>favorite</v-icon>
            </v-btn>
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
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'app',
    components: {
      HeaderCpt: Header,
      SideBar,
      QrcodeModal: QRCodeModal,
      CheckoutModal
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
          {title: "會員中心", route: {name: 'Products'}},
          {title: "APP下載", route: {name: 'Products'}},
          {divider: true},
          {title: "會員登入", route: {name: 'Products'}},
        ]
      }
    },
    computed: {
      ...mapGetters([
        'isShowQRCodeModal',
        'isShowCheckoutModal',
      ])
    },
    mounted() {

    },
    methods: {
    }
  }

</script>

<style lang="stylus">

</style>