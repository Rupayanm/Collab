// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3oYomYgIDCfTGuhaE4guh8w9qNABFyT8",
  authDomain: "collab0508.firebaseapp.com",
  projectId: "collab0508",
  storageBucket: "collab0508.appspot.com",
  messagingSenderId: "727435171832",
  appId: "1:727435171832:web:cf6f25509bf09edf0de80d",
  measurementId: "G-365TSQCK2M",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
