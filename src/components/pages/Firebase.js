// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDb3Hn_eYXI4tSAyFHWqx8pf4pIuURuHHA",

  authDomain: "bmstrialforauthentication.firebaseapp.com",

  projectId: "bmstrialforauthentication",

  storageBucket: "bmstrialforauthentication.appspot.com",

  messagingSenderId: "882346596609",

  appId: "1:882346596609:web:3a8c2414ca3c91441b2300",

  measurementId: "G-PPG5PC0RN4"

};


// Initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth()
export {auth}