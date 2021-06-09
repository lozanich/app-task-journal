import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6pqNBJ4WIQAekFoyJVKVfg1YxRiEC6Ho",
  authDomain: "react-fr-curso.firebaseapp.com",
  projectId: "react-fr-curso",
  storageBucket: "react-fr-curso.appspot.com",
  messagingSenderId: "807182030554",
  appId: "1:807182030554:web:327cf9c8f76361aeb0b7e3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
