import firebase from 'firebase'
require("@firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBYefVLPG0Qdf0TkrhN1uIwYAh94Xl7Xmo",
    authDomain: "biblioteca-72872.firebaseapp.com",
    projectId: "biblioteca-72872",
    storageBucket: "biblioteca-72872.appspot.com",
    messagingSenderId: "1029773159834",
    appId: "1:1029773159834:web:2c76d7ff03e03caa975e23"
  };

  firebase.inializeApp(firebaseConfig);
  export default firebase.firestore();