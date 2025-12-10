// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHpMtUvT9S-0s96k3Kwgi_GENJn0E62s8",
  authDomain: "mobile-class-2b641.firebaseapp.com",
  projectId: "mobile-class-2b641",
  storageBucket: "mobile-class-2b641.firebasestorage.app",
  messagingSenderId: "353071430577",
  appId: "1:353071430577:web:5c7984cd49b6a11542db90",
  measurementId: "G-DTRBGP4Q1R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
