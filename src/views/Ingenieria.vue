<template>
  <v-layout row justify-center>
    <v-card>
      <v-list two-line>
        <template v-for="(pieza, index) in piezas">
          <v-list-tile :key="pieza.name" avatar>
            <v-list-tile-content>
              <v-list-tile-title>Nombre: {{ pieza.name }}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">Máquina: {{ pieza.maquina }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>Dimension: {{ pieza.dimension }}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-if="pieza.fallo">Fallo: {{ pieza.fallo }}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-if="pieza.fallo">Observaciones: {{ pieza.observaciones }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <!-- <v-list-tile-action>
              <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
              <v-icon
                v-if="selected.indexOf(index) < 0"
                color="grey lighten-1"
              >
                star_border
              </v-icon>

              <v-icon
                v-else
                color="yellow darken-2"
              >
                star
              </v-icon>
            </v-list-tile-action> -->

          </v-list-tile>
          <v-divider v-if="index + 1 < piezas.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  computed: {
    piezas () {
      return this.$store.getters.getListPiezas
    }
  },
  created() {
    this.$store.commit('obtenerPiezas')
  }

}
</script>

<style>

</style>
