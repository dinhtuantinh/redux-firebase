import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDbriILLBftAZXyZ3GGc7jc_WbI2_sWKi4",
  authDomain: "react-firebase-auth-27b7a.firebaseapp.com",
  projectId: "react-firebase-auth-27b7a",
  storageBucket: "react-firebase-auth-27b7a.appspot.com",
  messagingSenderId: "387239904599",
  appId: "1:387239904599:web:20652ce9b2d2552667aa12",
  measurementId: "G-N8LFXJVTYJ"
};

const firebaseDB = firebase.initializeApp(firebaseConfig);

const db = firebaseDB.database().ref();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider, db };
