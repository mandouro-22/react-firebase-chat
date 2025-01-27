// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-d775f.firebaseapp.com",
  projectId: "react-chat-d775f",
  storageBucket: "react-chat-d775f.firebasestorage.app",
  messagingSenderId: "833349618206",
  appId: "1:833349618206:web:a091af0e9d5ac03c3bfc0f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
