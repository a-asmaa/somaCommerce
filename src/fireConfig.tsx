import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBsQqbFJIIOiVnXI2l8Bd-W0pHvhllWtV8",
  authDomain: "somacommerce-3ec1a.firebaseapp.com",
  projectId: "somacommerce-3ec1a",
  storageBucket: "somacommerce-3ec1a.appspot.com",
  messagingSenderId: "130908811320",
  appId: "1:130908811320:web:80ba4ab77fcd0b2ad836cd",
  measurementId: "G-CWBJ0KTM81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const fireDB = getFirestore(app);  //db

export default fireDB;