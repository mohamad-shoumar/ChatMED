import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyCqxw4zmMwbxaauOTIgUucjihGpnmiEYjE",
  authDomain: "chats-92982.firebaseapp.com",
  projectId: "chats-92982",
  storageBucket: "chats-92982.appspot.com",
  messagingSenderId: "64193817638",
  appId: "1:64193817638:web:730dd7c0546bcc79160ae7",
  measurementId: "G-KG6SJVWJ6H",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

// process.env.REACT_APP_FIREBASE_API_KEY
