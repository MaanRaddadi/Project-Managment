import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0Bx2w3KfyB_vMbeN4kPmcR43ESTqM9as",
  authDomain: "ordinal-quarter-364013.firebaseapp.com",
  projectId: "ordinal-quarter-364013",
  storageBucket: "ordinal-quarter-364013.appspot.com",
  messagingSenderId: "420120136952",
  appId: "1:420120136952:web:cf7760edd7e450bfbbff0d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();