<template>
  <v-layout row justify-center>
    <v-card>
      <v-card-title>
        <span class="headline">Datos de la operación</span>
      </v-card-title>
      <v-form class="formUsuario" ref="form" lazy-validation>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-select
                :items="maquinas"
                label="Maquina *"
                v-model="maquina"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                :items="names"
                v-model="name"
                label="Nombre *"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="Dimension *" v-model="dimension" required @keyup.enter="guardarPieza"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-checkbox label="Fallo" v-model="fallo"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="Observaciones" v-model="observaciones"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>* Campos obligatorios</small>
        <!-- Popup de mensaje de error al guardar la operacion -->
        <v-dialog v-model="dialog_error_operacion" max-width="50%">
          <v-card>
            <v-card-title>
              <span class="red--text headline">Error al guardar la operación</span>
            </v-card-title>
            <v-card-text>
              Ha habido un problema el guardar la operación, por favor intentelo nuevamente
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- Cerrar -->
              <v-btn class="red" fab @click="dialog_error_operacion = false">
                <v-icon dark>close</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Popup de mensaje correcto al guarfdar la operación -->
        <v-dialog v-model="dialog_operacion_correcta" max-width="50%">
          <v-card>
            <v-card-title>
              <span class="red--text headline">Operación guardada</span>
            </v-card-title>
            <v-card-text>
              Se ha guardado correctamente la pieza
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- Cerrar -->
              <v-btn class="green" fab @click="dialog_operacion_correcta = false">
                <v-icon dark>close</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="limpiar">Limpiar</v-btn>
        <v-btn color="blue darken-1" :disabled="!validarDatosReq" flat @click="saveOperation">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    fallo: false,
    maquina: [],
    maquinas: ['Maq 1', 'Maq 2', 'Maq 3'],
    name: [],
    names: ['Nombre 1', 'Nombre 2', 'Nombre 3', 'Nombre 4'],
    dimension: '',
    observaciones: '',
    dialog_error_operacion: false,
    dialog_operacion_correcta: false
  }),
  computed: {
    // Se valida que los datos requeridos existan y no sean vacios
    validarDatosReq () {
      if (this.maquina !== '' && this.name !== '' && this.dimension !== '')
        return true
      else  
        return false
    }
  },
  methods: {
    limpiar() {
      this.dimension = ''
      this.maquina = []
      this.name = []
      this.fallo = false
      this.observaciones = ''
    },
    saveOperation(){
      if (this.$refs.form.validate()) {
        let operacion = {
          name: this.name,
          maquina: this.maquina,
          dimension: this.dimension,
          fallo: this.fallo,
          observaciones: this.observaciones
        }
      
        this.$store.dispatch('saveOperation', operacion).then(() => {
          this.limpiar()
          this.dialog_operacion_correcta = true
        }).catch(() => {
            this.dialog_error_operacion = true
        })
      }
    }
  }
}
</script>

<style>

</style>