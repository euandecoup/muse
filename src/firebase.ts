import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8y0FbzQzgADjbn8oCo5eZG9kgD_PE-RU",
  authDomain: "muse-d344f.firebaseapp.com",
  projectId: "muse-d344f",
  storageBucket: "muse-d344f.appspot.com",
  messagingSenderId: "523189848674",
  appId: "1:523189848674:web:d05ca203b9b3904c58df3b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
