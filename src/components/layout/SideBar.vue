<template>
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
  name: 'Header',
  data() {
    return {
      sidebar2: false,
    }
  },
  methods: {
    ...mapMutations([
      'controlQRCodeModal'
    ])
  }
}
</script>

<style lang="stylus">

</style>
