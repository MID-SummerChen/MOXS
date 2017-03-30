<template>
  <header>
    <v-toolbar class="trans-dark">
      <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="controlSidebar(true)" />
      <v-toolbar-logo><div class="icon-logo"></div></v-toolbar-logo>
      <v-spacer />
      <v-btn icon dark>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn icon dark>
        <v-icon>favorite</v-icon>
      </v-btn>
    </v-toolbar>
  </header>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
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
