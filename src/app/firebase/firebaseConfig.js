// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBSaYCXUmsD6s5ieTKg5NbpgbIep7lOzP0",
	authDomain: "stud-teach-8cd77.firebaseapp.com",
	projectId: "stud-teach-8cd77",
	storageBucket: "stud-teach-8cd77.firebasestorage.app",
	messagingSenderId: "57490244132",
	appId: "1:57490244132:web:75596baedbb5f04a7b8eb1",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default { app, db };
