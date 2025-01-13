import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbJRtBAHDIeLgg4vFd_M3T05nURR_2CpA",
    authDomain: "noontoon-712a1.firebaseapp.com",
    projectId: "noontoon-712a1",
    storageBucket: "noontoon-712a1.firebasestorage.app",
    messagingSenderId: "603722864218",
    appId: "1:603722864218:web:d7b43d9fd6bb24a8dbaa63"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
