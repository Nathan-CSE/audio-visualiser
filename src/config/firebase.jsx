// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe0y-ZgK515TwVqzX0bLjvfdwx5z2KfLg",
  authDomain: "audio-visualiser-3bd76.firebaseapp.com",
  projectId: "audio-visualiser-3bd76",
  storageBucket: "audio-visualiser-3bd76.appspot.com",
  messagingSenderId: "967468307507",
  appId: "1:967468307507:web:0da955deca10f03038ff46",
  measurementId: "G-KR5NJ742PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);