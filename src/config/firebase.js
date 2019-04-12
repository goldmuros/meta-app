import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBXVU8DHh2wd1ViwW-fxytfXJO4sdLTpD0",
  authDomain: "meta-app-3226a.firebaseapp.com",
  databaseURL: "https://meta-app-3226a.firebaseio.com",
  projectId: "meta-app-3226a",
  storageBucket: "meta-app-3226a.appspot.com",
  messagingSenderId: "1078796150178"
}

const firebaseapp = firebase.initializeApp(config)

export default firebaseapp.firestore()