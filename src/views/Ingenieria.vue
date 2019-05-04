<template>
  <v-layout row justify-center>
    <v-flex v-if="mediaQuery === 'mobile'">
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
  computed: {
    mediaQuery () {
      return this.$store.getters.getMediaQuery
    }
  },
  components: {
    listaPiezasDesktop,
    listaPiezasMobile
  }
}
</script>

<style>

</style>
