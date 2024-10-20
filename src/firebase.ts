import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: "muse-d344f",
  storageBucket: "muse-d344f.appspot.com",
  messagingSenderId: "523189848674",
  appId: "1:523189848674:web:d05ca203b9b3904c58df3b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
