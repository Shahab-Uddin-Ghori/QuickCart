// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0-NI3ouT0Z__TNBK8zxY66P0M77rYNMU",
  authDomain: "quickcart0321.firebaseapp.com",
  projectId: "quickcart0321",
  storageBucket: "quickcart0321.appspot.com",
  messagingSenderId: "347503554288",
  appId: "1:347503554288:web:de2d511f10f0c1d60e9c35",
  measurementId: "G-KR9EJ182YH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// export auth database and storage
export { auth, db, storage };
