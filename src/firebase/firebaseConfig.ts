// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export default { app, db, auth };
