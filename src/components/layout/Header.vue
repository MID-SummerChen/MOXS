<template>
  <header>
    <v-toolbar :fixed="true">
      <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="$parent.showSidebar = !$parent.showSidebar" />
      <v-toolbar-logo>
        <div class="icon-logo"></div>
      </v-toolbar-logo>
      <v-spacer />
      <v-btn :ripple="false">
        <v-icon>today</v-icon>
        預約點餐
      </v-btn>
      <v-btn :ripple="false">
        <v-icon>account_circle</v-icon>
        {{account.mb ? account.mb.name : ''}}
        <div class="headerSubMenu">
          <p>aveeee</p>
          <p>aveeee</p>
          <p>aveeee</p>
        </div>
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
      'account'
    ])
  },
  methods: {
    ...mapMutations([
    ])
  }
}
</script>

<style lang="stylus">

</style>
