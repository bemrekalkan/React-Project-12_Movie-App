import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! get firebaseconfig settings from firebase console settings
const firebaseConfig = {
  apiKey: "AIzaSyDReWYi7eBjaJ2d3xQI5gnNGkMuxNuKSjo",
  authDomain: "movie-application-21f1b.firebaseapp.com",
  projectId: "movie-application-21f1b",
  storageBucket: "movie-application-21f1b.appspot.com",
  messagingSenderId: "981308327583",
  appId: "1:981308327583:web:704fb96cd8bcb7494604aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
