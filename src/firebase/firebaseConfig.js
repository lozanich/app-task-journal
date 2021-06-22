import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

// const firebaseConfigTest = {
//   apiKey: "AIzaSyDo7YJAwrTUmSqDvJDAvwNB4SYRSFwG71o",
//   authDomain: "react-testing-a2fdf.firebaseapp.com",
//   databaseURL: "https://react-testing-a2fdf-default-rtdb.firebaseio.com",
//   projectId: "react-testing-a2fdf",
//   storageBucket: "react-testing-a2fdf.appspot.com",
//   messagingSenderId: "736312961905",
//   appId: "1:736312961905:web:1f7ca8b5085c4fe73ea4d0",
// };

// if (process.env.NODE_ENV === "test") {
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfigTest);
// } else {
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
