<template>
  <v-sidebar fixed v-model="$parent.showSidebar">
    <div class="icon-logo"></div>
    <v-list>
      <template v-for="m in menu">
        <v-list-item v-if="m.divider">
          <v-divider light />
        </v-list-item>
        <v-list-item v-else-if="m.onClick">
          <v-list-tile ripple>
            <a @click="m.onClick('qrcode')">{{m.title}}</a>
            <router-link :to="m.route">{{m.title}}</router-link>
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
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  function openAppModal(target, boo) {
    console.log(this)
    console.log(target)
  }

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
        {title: "APP下載", onClick: openModal},
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
    ]),
    openAppModal: openAppModal,

  }
}
</script>
