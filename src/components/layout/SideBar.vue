<template>
  <v-sidebar fixed v-model="sidebar2">
    <div class="icon-logo"></div>
    <v-list>
      <v-list-item>
        <v-list-tile ripple>
          <v-list-tile-title>餐點瀏覽</v-list-tile-title>
        </v-list-tile>
      </v-list-item>
      <v-list-item>
        <v-list-tile ripple>
          <v-list-tile-title link="/">訂位點餐</v-list-tile-title>
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
          <v-list-tile-title @click="controlQRCodeModal(true)">APP下載</v-list-tile-title>
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
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'SideBar',
  data() {
    return {
      menu: [
        {title: "餐點瀏覽", link: "/"},
        {title: "訂位點餐", link: "/"},
        {title: "動態消息", link: "/"},
        {title: "商店資訊", link: "/"},
        {title: "會員中心", link: "/"},
        {title: "APP下載", link: "/"},
        {title: "會員登入", link: "/"},
      ]
    }
  },
  computed: {
    ...mapGetters([
      'isShowSidebar'
    ])
  },
  methods: {
    ...mapMutations([
      'controlQRCodeModal',
      'controlSidebar'
    ])
  }
}
</script>

<style lang="stylus">

</style>
