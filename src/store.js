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
    activePage: ''
  },
  getters: {
    getActivePage: state => {
      return state.activePage
    }
  },
  mutations: {
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
    }
  }
})
