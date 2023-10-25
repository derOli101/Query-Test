import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgV1C1nyvG2eJ13tGs1CwDJh_dcaGWTXc",
  authDomain: "sonar0.firebaseapp.com",
  projectId: "sonar0",
  storageBucket: "sonar0.appspot.com",
  messagingSenderId: "1096856922094",
  appId: "1:1096856922094:web:9df9aea96f320e132e90ff",
  measurementId: "G-JFRVL2QV3C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
createApp(App).mount("#app");

export { db };
