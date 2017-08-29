<template>
  <div id="dashboard" :class="{noScroll: noScroll}">
    <v-app top-toolbar left-fixed-sidebar>

      <div class="page" :id="$route.name">
        <header>
          <v-toolbar :fixed="true">
            <v-toolbar-side-icon :ripple="false" class="hidden-md-and-up" @click.native.stop="showSidebar = !showSidebar" />
            <v-toolbar-logo>
              <router-link to="/" class="logo">
                <img v-if="resources.WEB_LOGO_IMG" :src="getLogoImg()" alt="">
              </router-link>
            </v-toolbar-logo>
            <v-spacer />
            <v-btn v-if="Object.keys(modules).indexOf('ORD') > -1" :ripple="false" @click.native="CONTROL_MODAL({target: 'cart', boo: true})">
              <v-icon>shopping_cart</v-icon>
              <span class="toolbar-icon-title">{{modules.ORD.TITLE}}</span>
            </v-btn>
            <v-btn v-if="Object.keys(modules).indexOf('RESV') > -1" :ripple="false" @click.native="CONTROL_MODAL({target: 'cart', boo: true})">
              <v-icon>today</v-icon>
              <span class="toolbar-icon-title">{{modules.RESV.TITLE}}</span>
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
              <img v-if="resources.WEB_LOGO_IMG" :src="getLogoImg()" alt="">
            </router-link>
            <v-list>
              <v-list-item v-if="menu.indexOf('ITEM') > -1">
                <v-list-tile ripple>
                  <router-link :to="{name: 'Products'}">{{modules.ITEM.TITLE}}</router-link>
                </v-list-tile>
              </v-list-item>
              <v-list-item v-if="menu.indexOf('RESV') > -1">
                <v-list-tile ripple>
                  <a href="" @click.prevent="CONTROL_MODAL({target: 'cart', boo: true})">{{modules.RESV.TITLE}}</a>
                </v-list-tile>
              </v-list-item>
               <v-list-item v-if="menu.indexOf('ORD') > -1">
                <v-list-tile ripple>
                  <a href="" @click.prevent="CONTROL_MODAL({target: 'cart', boo: true})">{{modules.ORD.TITLE}}</a>
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
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'app',
    mixins: [commonMixin],
    components: {
      HeaderCpt: Header,
      SideBar,
    },
    data() {
      return {
        showSidebar: true,
        eventHub,
      }
    },
    computed: {
      ...mapState({
        
        alertBox: state => state.alertBox.display,
        isLogin: state => state.isLogin,
        modules: state => state.modules,
        menu: state => state.menu,
        resources: state => state.resources,
        noScroll: state => state.modal.noScroll,
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
        return `${this.resHttpPath}/${this.resources.WEB_LOGO_IMG}`
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