// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTQwr96n41gDo7_wjzJYyLMfsmHah6YWA",
  authDomain: "service365-78ae4.firebaseapp.com",
  projectId: "service365-78ae4",
  storageBucket: "service365-78ae4.firebasestorage.app",
  messagingSenderId: "821264445560",
  appId: "1:821264445560:web:c44e9e41eb53e8ea5efd8d",
  measurementId: "G-J000SDDV84",
  databaseURL: "https://service365-78ae4-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { db, realtimeDb };