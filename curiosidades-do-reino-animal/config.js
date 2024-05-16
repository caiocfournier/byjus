import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
    apiKey: "AIzaSyD-rLbRevBsmd79sj7gIhYce1pgXKDn4HY",
    authDomain: "curiosidades-sobre-os-animais.firebaseapp.com",
    databaseURL: "https://curiosidades-sobre-os-animais-default-rtdb.firebaseio.com",
    projectId: "curiosidades-sobre-os-animais",
    storageBucket: "curiosidades-sobre-os-animais.appspot.com",
    messagingSenderId: "598400202389",
    appId: "1:598400202389:web:525558db9ede2b68310d9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;