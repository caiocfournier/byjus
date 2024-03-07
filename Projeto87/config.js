import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: "AIzaSyAc-1j3xaFx1fcgoMWVOfOEl2TnJWRjBy8",
  authDomain: "aplicativo-espectograma-70c1c.firebaseapp.com",
  databaseURL: "https://aplicativo-espectograma-70c1c-default-rtdb.firebaseio.com",
  projectId: "aplicativo-espectograma-70c1c",
  storageBucket: "aplicativo-espectograma-70c1c.appspot.com",
  messagingSenderId: "257011407903",
  appId: "1:257011407903:web:4e4a8642caa5309c5cc92a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;