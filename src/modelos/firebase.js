import "dotenv/config";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW4swjF1UGEBGjOif3M9aDNoj-gQzonnY",
  authDomain: "tpfinal-nodejs.firebaseapp.com",
  projectId: "tpfinal-nodejs",
  storageBucket: "tpfinal-nodejs.firebasestorage.app",
  messagingSenderId: "414102089072",
  appId: "1:414102089072:web:8e977e50b58e9f6e4af3b5",
  measurementId: "G-DG1DZXX62V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };