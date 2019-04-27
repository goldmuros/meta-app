<template>
  <v-layout row justify-center>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="piezas"
      select-all
      item-key="operador"
      class="elevation-1"
    >
      <template v-slot:headers="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox
              :input-value="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.maquina }}</td>
          <td class="text-xs-right">{{ props.item.dimension }}</td>
          <td class="text-xs-right">{{ props.item.fallo }}</td>
          <td class="text-xs-right">{{ props.item.observaciones }}</td>
        </tr>
      </template>
    </v-data-table>
    <!-- <v-card>
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
          </v-list-tile>
          <v-divider v-if="index + 1 < piezas.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card> -->
  </v-layout>
</template>

<script>
export default {
  data: () => {
    return {
      selected: [],
      headers: [
        { text: 'Operador', value: 'operador'
        },
        { text: 'Máquina', value: 'maquina' },
        { text: 'Dimension', value: 'dimension' },
        { text: 'Fallo', value: 'fallo' },
        { text: 'Observaciones', value: 'observaciones' }
      ]
    }
  },
  computed: {
    piezas () {
      return this.$store.getters.getListPiezas
    }
  },
  methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.desserts.slice()
    }
  },
  created() {
    this.$store.commit('obtenerPiezas')
  }
}
</script>

<style>

</style>
