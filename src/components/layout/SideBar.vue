<template>
  <v-sidebar fixed v-model="isShowSidebar">
    <div class="icon-logo"></div>
    <v-list>
      <template v-for="m in menu">
        <v-list-item v-if="m.divider">
          <v-divider light />
        </v-list-item>
        <v-list-item v-else>
          <v-list-tile ripple>
            <v-list-tile-title >
              <router-link :to="m.route">{{m.title}}</router-link>
            </v-list-tile-title>
          </v-list-tile>
        </v-list-item>
        
        
      </template>
      
      
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
