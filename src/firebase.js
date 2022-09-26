import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhV0rpOaFDJu5ocQ09ICEJ-4qL0gMpS94",
  authDomain: "svelte-reddit.firebaseapp.com",
  projectId: "svelte-reddit",
  storageBucket: "svelte-reddit.appspot.com",
  messagingSenderId: "349903067227",
  appId: "1:349903067227:web:7ae1c1c524ccff0ba0477e",
  measurementId: "G-QSY7DHXZVN",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
