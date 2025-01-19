// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBSaYCXUmsD6s5ieTKg5NbpgbIep7lOzP0",
	authDomain: "stud-teach-8cd77.firebaseapp.com",
	projectId: "stud-teach-8cd77",
	storageBucket: "stud-teach-8cd77.firebasestorage.app",
	messagingSenderId: "57490244132",
	appId: "1:57490244132:web:75596baedbb5f04a7b8eb1",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export default { app, db, auth };
