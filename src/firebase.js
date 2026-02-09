// firebase.js - FINAL CORRECT VERSION
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// COPY EXACTLY from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDvbZwdXRE8F5tz6ZIeTLPqo90GS0mJVC4",
  authDomain: "examprep-9aa44.firebaseapp.com",
  projectId: "examprep-9aa44",
  storageBucket: "examprep-9aa44.firebasestorage.app",
  messagingSenderId: "519625612438",
  appId: "1:519625612438:web:4c771b0ecf3aa91f64b6b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);