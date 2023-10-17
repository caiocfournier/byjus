import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyA1WurH78JfG1T76aDykCcfKf5POvMGHYY",
  authDomain: "ciclistaeletronico-2fa72.firebaseapp.com",
  projectId: "ciclistaeletronico-2fa72",
  storageBucket: "ciclistaeletronico-2fa72.appspot.com",
  messagingSenderId: "376482515251",
  appId: "1:376482515251:web:3511b32fa6012c7d985646"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
