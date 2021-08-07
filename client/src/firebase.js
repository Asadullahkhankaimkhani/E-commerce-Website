import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtO74nGlTzgCAnES38yChDZSvbeHf3Pbc",
  authDomain: "ecommerce-9490b.firebaseapp.com",
  projectId: "ecommerce-9490b",
  storageBucket: "ecommerce-9490b.appspot.com",
  messagingSenderId: "923501273315",
  appId: "1:923501273315:web:9a26c9b547a1861d3be5d6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
