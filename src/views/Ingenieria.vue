<template>
  <v-layout row justify-center>
    <v-flex v-if="isMobile">
      <lista-piezas-mobile/>
    </v-flex>
    <v-flex v-else>
      <lista-piezas-desktop/>
    </v-flex>
  </v-layout>
</template>

<script>
import listaPiezasDesktop from '../components/desktop/ListaPiezas.vue'
import listaPiezasMobile from '../components/mobile/ListaPiezas'
export default {
  data: () => {
    return {
      isMobile: false
      // isTablet: false
    }
  },
  created() {
    let mediaQueryMobile = window.matchMedia('(max-width: 700px)')
    // let mediaQueryTablet = window.matchMedia('(max-width: 1024px)')

    if (mediaQueryMobile.matches)
      this.isMobile = true
    // else if (mediaQueryMobile.matches)
    //   this.isTablet = true
  },
  components: {
    listaPiezasDesktop,
    listaPiezasMobile
  }

}
</script>

<style>

</style>
