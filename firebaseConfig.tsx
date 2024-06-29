import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClHoVOH8tgnVKw8CxuQTT_Ytz7VNLhhUQ",
  authDomain: "laundry-mate-6bde8.firebaseapp.com",
  projectId: "laundry-mate-6bde8",
  storageBucket: "laundry-mate-6bde8.appspot.com",
  messagingSenderId: "571055662569",
  appId: "1:571055662569:web:d9c367ea57aead823d9778",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
