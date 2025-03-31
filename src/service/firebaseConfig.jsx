// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi_UNizbYnpI1ZHiFwiJP-NNFx-9yq60I",
  authDomain: "travel-512c8.firebaseapp.com",
  projectId: "travel-512c8",
  storageBucket: "travel-512c8.firebasestorage.app",
  messagingSenderId: "209424193065",
  appId: "1:209424193065:web:04dc7a8f5f94f7b180ee38",
  measurementId: "G-QSC15FZZN2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);