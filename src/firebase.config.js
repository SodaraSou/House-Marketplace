import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw14yZLaiRbepPBbHKmsrqdq-sL0ZggZ8",
  authDomain: "house-marketplace-app-4bb24.firebaseapp.com",
  projectId: "house-marketplace-app-4bb24",
  storageBucket: "house-marketplace-app-4bb24.appspot.com",
  messagingSenderId: "210533723781",
  appId: "1:210533723781:web:3093a0c40b672f670d83ec",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
