'''// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add your own Firebase configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBQBZQrHUOtd7LmRWzgq3mtucRKXWiEkbA",
  authDomain: "snapfind-web-weave-06456-66eaf.firebaseapp.com",
  projectId: "snapfind-web-weave-06456-66eaf",
  storageBucket: "snapfind-web-weave-06456-66eaf.firebasestorage.app",
  messagingSenderId: "568518812419",
  appId: "1:568518812419:web:43aaad9523082e8ad37f36"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);'''