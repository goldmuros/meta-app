<template>
  <v-app>
    <v-toolbar dark dense class="light-green darken-3">
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="logueado">
        <v-tooltip left>
          <v-btn fab small dark class="darken-3" slot="activator" @click="logout">
            <v-icon dark>power_settings_new</v-icon>
          </v-btn>
          <span>Salir del sistema</span>
        </v-tooltip>
      </v-toolbar-items>
    </v-toolbar>
    <div>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: 'Meta App'
    }
  },
  computed: {
    logueado () {
      let page = this.$store.getters.getActivePage

      if (page !== null && page !== '')
        return true

      return false
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')

      this.$router.push('/')
    }
  },
  created() {
    let mediaQueryMobile = window.matchMedia('(max-width: 700px)')
    let mediaQueryTablet = window.matchMedia('(max-width: 1024px)')

    let mediaQuery = 'desktop'

    if (mediaQueryMobile.matches)
      mediaQuery = 'mobile'
    else if (mediaQueryMobile.matches)
      mediaQuery = 'tablet'

    this.$store.commit('setMediaQuery', mediaQuery)
  }
}
</script>
