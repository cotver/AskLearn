import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBh81un4y7yoThzjoAmD_e-lpkhj6ECfAI",
    authDomain: "asklearn.firebaseapp.com",
    databaseURL: "https://asklearn.firebaseio.com",
    projectId: "asklearn",
    storageBucket: "asklearn.appspot.com",
    messagingSenderId: "127608628383",
    appId: "1:127608628383:web:ea39b080753faf1d79eeaa",
    measurementId: "G-CC05FDB2G9"
  };

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase