<template>
  <div id="app">
    <transition name="fade">
      <qrcode-modal v-if="isShowQRCodeModal"></qrcode-modal>
    </transition>




    <v-app top-toolbar left-fixed-sidebar>
      <router-view></router-view>
    </v-app>

  </div>
</template>

<script>
  import Header from '@/components/layout/Header.vue'
  import SideBar from '@/components/layout/SideBar.vue'
  import QRCodeModal from '@/components/widgets/QRCodeModal.vue'
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'app',
  components: {
    HeaderCpt: Header,
    SideBar,
    QrcodeModal: QRCodeModal
  },
  data() {
    return {
      eventHub,
    }
  },
  computed: {
    ...mapGetters([
      'isShowQRCodeModal'
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
