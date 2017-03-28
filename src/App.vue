<template>
  <v-app top-toolbar left-fixed-sidebar>
    <header>
      <v-toolbar class="trans-dark">
        <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="sidebar2 = !sidebar2" />
        <v-toolbar-logo>LOGO</v-toolbar-logo>
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
        <div class="logo">LOGO</div>
        <v-list>
          <v-list-item v-for="item in menu">
            <v-list-tile ripple v-if="item.title">
              <v-list-tile-title v-text="item.title" />
            </v-list-tile>
            <v-divider v-else-if="item.divider" light />
          </v-list-item>
        </v-list>
      </v-sidebar>

      <router-view></router-view>

    </main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      sidebar2: false,
      menu: [
        { title: '餐點瀏覽' },
        { title: '訂位點餐' },
        { title: '動態消息' },
        { title: '商店資訊' },
        { title: '會員中心' },
        { title: 'APP下載' },
        { divider: true },
        { title: '會員登入' },
      ]
    }
  }
}
</script>

<style lang="stylus">

</style>
