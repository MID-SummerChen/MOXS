<template>
  <v-sidebar fixed v-model="$parent.showSidebar">
    <div class="logo">
      <img v-if="imgs.logoDarkWImg" :src="getLogoImg()" alt="">
    </div>
    <v-list>
      <v-list-item v-if="menu.ITEM">
        <v-list-tile ripple>
          <router-link :to="{name: 'Products'}">{{menu.ITEM.TITLE}}</router-link>
        </v-list-tile>
      </v-list-item>
      <!--<v-list-item v-if="menu.RESV">
        <v-list-tile ripple>
          <router-link :to="{name: 'Products'}">{{menu.RESV.TITLE}}</router-link>
        </v-list-tile>
      </v-list-item>-->
      <v-list-item>
        <v-list-tile v-if="menu.NEWS" ripple>
          <router-link :to="{name: 'News'}">{{menu.NEWS.TITLE}}</router-link>
        </v-list-tile>
      </v-list-item>
      <v-list-item>
        <v-list-tile v-if="menu.INFO" ripple>
          <router-link :to="{name: 'Info'}">{{menu.INFO.TITLE}}</router-link>
        </v-list-tile>
      </v-list-item>
      <v-list-item v-if="isLogin && menu.ACCOUNT">
        <v-list-tile ripple>
          <router-link :to="{name: 'Member'}">{{menu.ACCOUNT.TITLE}}</router-link>
        </v-list-tile>
      </v-list-item>
      <v-list-item>
        <v-list-tile ripple>
          <a @click="CONTROL_MODAL({target: 'qrcode', boo: true})">APP下載</a>
        </v-list-tile>
      </v-list-item>
      <v-list-item>
        <v-divider light />
      </v-list-item>
      <v-list-item v-if="!isLogin">
        <v-list-tile ripple>
          <a @click="CONTROL_MODAL({target: 'login', boo: true})">會員登入</a>
        </v-list-tile>
      </v-list-item>


    </v-list>
  </v-sidebar>
</template>

<script>
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'Sidebar',
    components: {
    },
    data() {
      return {
        eventHub,
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
        menu: state => state.menu,
        imgs: state => state.imgs,
      }),
      ...mapGetters([
        'apiHost',
        'apiModule',
      ])
    },
    mounted() {
    },
    methods: {
      ...mapMutations([
        'setAlertMsg',
        'gotConfig',
      ]),
      ...mapActions([
        'checkLoginStatus',
        'onLogout',
        'getConfig',
      ]),
      getLogoImg() {
        return `http://${this.apiHost}/${this.apiModule.sys}/${this.imgs.logoDarkWImg}`
      }
    }
  }

</script>

<style lang="stylus">

</style>