<template>
  <div id="app">
    <transition name="fade">
      <div v-if="isShowQRCodeModal" id="qrcode-modal" class="my-modal-wrap" @click.self="isShowQRCodeModal = false">
        <div class="modal-box">
          <div class="close-btn"  @click="isShowQRCodeModal = false">
            <v-icon>clear</v-icon>
          </div>
          <div class="modal-box-content">
            <div style="margin-top: 10px"></div>
            <h4>下載官方APP<br>預約更即時！</h4>
            <div><img src="/static/imgs/qrcode.png"></div>
            <div style="margin-top: 5px"></div>
            <div><img src="/static/imgs/appstore.png"></div>
            <div style="margin-top: 5px"></div>
            <div><img src="/static/imgs/googleplay.png"></div>
          </div>
        </div>
      </div>
    </transition>

    <v-app top-toolbar left-fixed-sidebar>
      <header>
        <v-toolbar class="trans-dark">
          <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="sidebar2 = !sidebar2" />
          <v-toolbar-logo><img src="/static/imgs/logo.png"></v-toolbar-logo>
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
        <v-sidebar fixed v-model="sidebar2">
          <div class="logo"></div>
          <v-list>
            <v-list-item>
              <v-list-tile ripple>
                <v-list-tile-title>餐點瀏覽</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile ripple>
                <v-list-tile-title>訂位點餐</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile ripple>
                <v-list-tile-title>動態消息</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile ripple>
                <v-list-tile-title>商店資訊</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile ripple>
                <v-list-tile-title>會員中心</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile ripple>
                <v-list-tile-title @click="isShowQRCodeModal = true">APP下載</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-divider light />
            </v-list-item>
            <v-list-item>
              <v-list-tile ripple>
                <v-list-tile-title>會員登入</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-sidebar>


        <router-view></router-view>

      </main>


    </v-app>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      sidebar2: false,
      isShowQRCodeModal: false,
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">

</style>
