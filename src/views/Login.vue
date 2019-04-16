<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-form class="formUsuario" ref="form" lazy-validation>
          <v-flex md12 sm12 xs12 class="background-blanco text-xs-center capa-login">
            <v-container>
              <v-layout row>
                <v-flex class="title">Ingrese Usuario y password</v-flex>
              </v-layout>
            </v-container>
            <v-container>
              <v-layout row wrap>
                <v-flex md3 hidden-sm-and-down></v-flex>
                <v-flex md6 sm12 xs12>
                  <v-text-field focus label="Usuario *" hint="Ejemplo: caehlich" required
                  v-model="usuario" :rules="usuarioRegla"></v-text-field>
                </v-flex>
                <v-flex md3 hidden-sm-and-down></v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex md3 hidden-sm-and-down></v-flex>
                <v-flex md6 sm12 xs12>
                  <v-text-field label="Password *" required :type="'password'" v-model="password"
                  :rules="passwordRegla" @keyup.enter="login"></v-text-field>
                </v-flex>
                <v-flex md3 hidden-sm-and-down></v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex md3 hidden-sm-and-down></v-flex>
                <v-flex md6 sm12 xs12 class="text-xs-left">
                  <small>*indica campos obligatorios</small>
                </v-flex>
                <v-flex md3 hidden-sm-and-down></v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex md3 hidden-sm-and-down></v-flex>
                <v-flex md6 sm12 xs12 class="text-xs-center">
                  <!-- Login -->
                  <v-btn dark class="primary" slot="activator" flat @click="login">
                    Inicio
                  </v-btn>
                  <!-- Limpiar -->
                  <v-btn dark class="primary" slot="activator" flat @click="limpiar">
                    Limpiar
                  </v-btn>
                </v-flex>
                <v-flex md3 hidden-sm-and-down></v-flex>
              </v-layout>
            </v-container>
            <!-- Dialog Error usuario -->
            <v-dialog v-model="dialog_error_usuario" max-width="50%">
              <v-card>
                <v-card-title>
                  <span class="red--text headline">Error al ingresar</span>
                </v-card-title>
                <v-card-text>
                  El Usuario o Password ingresados es incorrecto.
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- Cerrar -->
                  <v-btn class="red" fab @click="dialog_error_usuario = false">
                    <v-icon dark>close</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog_error_usuario: false,
        usuario: '',
        password: '',
        usuarioRegla: [
          (v) => !!v || 'Usuario requerido'
        ],
        passwordRegla: [
          (v) => !!v || 'Password requerido'
        ]
      }
    },
    computed: {
      page () {
        return this.$store.getters.getActivePage
      }
    },
    methods: {
      login () {
        if (this.$refs.form.validate()) {
          let usuario = {
            user: this.usuario.toLowerCase(),
            pass: this.password.toLowerCase()
          }

          this.$store.dispatch('validateUser', usuario).then(() => {
            this.$router.push('/' + this.page)
          }).catch(() => {
              this.dialog_error_usuario = true
          })
        }
      },
      limpiar () {
        this.$refs.form.reset()
      }
    }
  }
</script>
