<template>
  <header>
    <v-toolbar class="trans-dark">
      <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="sidebar2 = !sidebar2" />
      <v-toolbar-logo><img src="/static/imgs/logo.png"></v-toolbar-logo>
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
export default {
  name: 'Header',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">

</style>
