import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArurkeGKxL4heJs0IkLqNBUMQ9urqfLXQ",
  authDomain: "workout-tracker-aeeea.firebaseapp.com",
  projectId: "workout-tracker-aeeea",
  storageBucket: "workout-tracker-aeeea.appspot.com",
  messagingSenderId: "969002659540",
  appId: "1:969002659540:web:f5d71d712c5e032df99541",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = {
  app,
  auth,
  db,
};
