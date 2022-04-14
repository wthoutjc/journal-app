import "firebase/firestore";
import "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFdGjXKPafqlUtW_7AsWKAwk6DNJFW6D0",
    authDomain: "react-journal-app-be71f.firebaseapp.com",
    projectId: "react-journal-app-be71f",
    storageBucket: "react-journal-app-be71f.appspot.com",
    messagingSenderId: "303767520366",
    appId: "1:303767520366:web:a54d35e63370dfdad9127f"
  };
  

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
