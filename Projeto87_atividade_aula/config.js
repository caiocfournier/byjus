// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRl5VJjaGya78wW6w4JEv1-3TPgL3wc4k",
  authDomain: "storytelling-ce3d9.firebaseapp.com",
  databaseURL: "https://storytelling-ce3d9-default-rtdb.firebaseio.com",
  projectId: "storytelling-ce3d9",
  storageBucket: "storytelling-ce3d9.appspot.com",
  messagingSenderId: "836445755988",
  appId: "1:836445755988:web:669105f08cda7fda28abc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;