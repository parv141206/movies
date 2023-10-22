// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBa5FCWxG0BAIA2AwEGBF3CdWZnx-ApkEE",
  authDomain: "movies-883d0.firebaseapp.com",
  projectId: "movies-883d0",
  storageBucket: "movies-883d0.appspot.com",
  messagingSenderId: "1069095395392",
  appId: "1:1069095395392:web:cf18cbef2d2344d30f7fa5",
  measurementId: "G-3X0Z5ZJJHH",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
