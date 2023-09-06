// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVMvMIpb8fO8Lbo0TwYw95HpF8UM5J4w4",
  authDomain: "buddy-bd33b.firebaseapp.com",
  projectId: "buddy-bd33b",
  storageBucket: "buddy-bd33b.appspot.com",
  messagingSenderId: "446057997928",
  appId: "1:446057997928:web:0dce4ab4716edcdcc97ddd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
