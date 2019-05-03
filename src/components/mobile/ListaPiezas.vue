<template>
  <v-card >
    <v-list two-line>
      <template v-for="(pieza, index) in piezas">
        <v-list-tile :key="pieza.name" avatar>
          <v-list-tile-content>
            <v-list-tile-title>Nombre: {{ pieza.name }}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">Máquina: {{ pieza.maquina }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>Dimensión: {{ pieza.dimension }}</v-list-tile-sub-title>
            <v-list-tile-sub-title v-if="pieza.fallo">Fallo: {{ pieza.fallo }}</v-list-tile-sub-title>
            <v-list-tile-sub-title v-if="pieza.fallo">Observaciones: {{ pieza.observaciones }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < piezas.length" :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
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
