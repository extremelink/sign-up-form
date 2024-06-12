// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdlFzG03mdlx7fb7Ezu0GL04c1qD0mrs4",
  authDomain: "my-projects-653c4.firebaseapp.com",
  databaseURL: "https://my-projects-653c4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-projects-653c4",
  storageBucket: "my-projects-653c4.appspot.com",
  messagingSenderId: "90258427041",
  appId: "1:90258427041:web:6d1b84110ae9985e2a74e0",
  measurementId: "G-TC1Y0SQNBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);