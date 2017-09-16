<template>
  <v-content>
    <v-container fluid>
      <div class="slogan-wrap">
        <h3 class="slogan">{{pageMsgs.title}}</h3>
        <router-link v-if="checkoutType.code === 'resv'" to="/">立即訂位點餐</router-link>
      </div>
    </v-container>
  </v-content>

</template>

<script>
  import Header from '@/components/layout/Header.vue'
  import SideBar from '@/components/layout/SideBar.vue'
  import QRCodeModal from '@/components/widgets/QRCodeModal.vue'
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'Home',
  mixins: [commonMixin],
  components: {
    HeaderCpt: Header,
    SideBar,
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      resources: state => state.resources,
    }),
    ...mapGetters([
      'account',
      'pageMsgs',
      'checkoutType',
    ]),
    bgImgSrc() {
      return this.resources.WEB_INDEX_MAIN_IMG ? `${this.resHttpPath}${this.resources.WEB_INDEX_MAIN_IMG}` : ''
    }
  },
  mounted() {
  }
}
</script>
