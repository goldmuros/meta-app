import Vue from 'vue'
import Vuex from 'vuex'
import db from './config/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    usuarios:[
      {
        user: 'op',
        pass: 'op',
        role: 'operario',
        name: 'Operario'
      },
      {
        user: 'inge',
        pass: 'inge',
        role: 'ingeniero',
        name: 'Ingeniero'
      }
    ],
    user:{
      role: '',
      name: ''
    },
    activePage: '',
    piezas: []
  },
  getters: {
    getActivePage: state => {
      return state.activePage
    },
    getListPiezas: state => {
      return state.piezas
    }
  },
  mutations: {
    obtenerPiezas (state) {
      db.collection('Piezas').get().then((piezas) => {
        piezas.docs.forEach(pieza => {
          state.piezas.push(pieza.data())
        })        
      })
    }
  },
  actions: {
    validateUser ({state}, payload) {
      return new Promise((resolve, reject) => {
        db.collection('Users').where('user', '==', payload.user).where('pass', '==', payload.pass)
          .get()
          .then((usuarios) => {
            state.user.role = usuarios.docs[0].data().role
            state.user.name = usuarios.docs[0].data().name
    
            switch (usuarios.docs[0].data().role) {
              case 'operario':
                state.activePage = 'Operaciones'
                break
              case 'ingeniero':
                state.activePage = 'Ingenieria'
                break
            }
    
            return resolve()
        })
        .catch(() => {
          return reject()
        })

      })
    },
    guardarPieza ({state}, payload) {
      return new Promise((resolve, reject) => {
        let pieza = {
          name: payload.name,
          maquina: payload.maquina,
          dimension: payload.dimension,
          fallo: payload.fallo,
          observaciones: payload.observaciones,
          nombre_operario: state.user.name,
          created: new Date()
        }

        db.collection('Piezas').add(pieza)
          .then(() => {   
            return resolve()
        })
        .catch(() => {
          return reject()
        })

      })
    }
  }
})
