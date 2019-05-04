<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="operaciones"
    select-all
    item-key="operador"
    class="elevation-1"
    :pagination.sync="pagination"
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
          :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
          @click="changeSort(header.value)"
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
</template>

<script>
export default {
  data: () => {
    return {
      pagination: {
        sortBy: 'operador'
      },
      selected: [],
      headers: [
        { text: 'Operador', value: 'operador'
        },
        { text: 'Máquina', value: 'maquina' },
        { text: 'Dimensión', value: 'dimension' },
        { text: 'Fallo', value: 'fallo' },
        { text: 'Observaciones', value: 'observaciones' }
      ]
    }
  },
  computed: {
    operaciones () {
      return this.$store.getters.getListOperations
    }
  },
  methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.desserts.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  },
  created() {
    this.$store.commit('obtenerOperaciones')
  }
}
</script>
