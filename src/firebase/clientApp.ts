import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBP2QNSfegH8tFxlnq2-D_YFGkPW-dSEA0",
  authDomain: "reddit-73b7b.firebaseapp.com",
  projectId: "reddit-73b7b",
  storageBucket: "reddit-73b7b.appspot.com",
  messagingSenderId: "527425616263",
  appId: "1:527425616263:web:f0c9b234b556f9b5207b22",
};

const app = initializeApp(firebaseConfig);
