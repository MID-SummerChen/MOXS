<template>
  <div>
    <header-cpt></header-cpt>
    <main>
      <side-bar></side-bar>
      <v-content class="products">
        <v-container fluid>
          test

        </v-container>
      </v-content>

    </main>
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
    name: 'Products',
    components: {
      HeaderCpt: Header,
      SideBar,
      QrcodeModal: QRCodeModal
    },
    data () {
      return {

      }
    },
    mounted() {
    }
  }
</script>
