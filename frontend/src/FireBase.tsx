import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "image-upload-3bfe6.firebaseapp.com",
  projectId: "image-upload-3bfe6",
  storageBucket: "image-upload-3bfe6.appspot.com",
  messagingSenderId: "17998004745",
  appId: "1:17998004745:web:db678e24a9dca82498aed8",
  measurementId: "G-S457FQ67EV",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
