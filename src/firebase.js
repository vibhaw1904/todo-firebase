// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA96LbonunUm7LK_fbB2J_6gfpxrGuN0Vw",
  authDomain: "todoapp-a85e6.firebaseapp.com",
  projectId: "todoapp-a85e6",
  storageBucket: "todoapp-a85e6.appspot.com",
  messagingSenderId: "241166133914",
  appId: "1:241166133914:web:2aaa527cb01faa1d0f4d23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);