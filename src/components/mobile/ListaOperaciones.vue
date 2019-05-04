<template>
  <v-card >
    <v-list two-line>
      <template v-for="(operacion, index) in operaciones">
        <v-list-tile :key="operacion.name" avatar>
          <v-list-tile-content>
            <v-list-tile-title>Nombre: {{ operacion.name }}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">Máquina: {{ operacion.maquina }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>Dimensión: {{ operacion.dimension }}</v-list-tile-sub-title>
            <v-list-tile-sub-title v-if="pieza.fallo">Fallo: {{ operacion.fallo }}</v-list-tile-sub-title>
            <v-list-tile-sub-title v-if="pieza.fallo">Observaciones: {{ operacion.observaciones }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < operaciones.length" :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  computed: {
    piezas () {
    getListOperations: state => {
      return this.$store.getters.getListOperations
    }
  },
  created() {
    this.$store.commit('obtenerOperaciones')
  }
}
</script>
