// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

//import {signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6FfUMTWZdWS_K0Lu6O7nCjz8tSoP_YfM",
  authDomain: "netflixgpt-39fa4.firebaseapp.com",
  projectId: "netflixgpt-39fa4",
  storageBucket: "netflixgpt-39fa4.appspot.com",
  messagingSenderId: "145178424189",
  appId: "1:145178424189:web:138ac32ba52ffe62b99214",
  measurementId: "G-JSEJ6YL363"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
initializeApp(firebaseConfig);
export const auth = getAuth();