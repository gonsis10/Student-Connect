// helpers/firebaseUser.js
import { doc, getDoc, setDoc, collection, deleteDoc, onSnapshot, runTransaction } from "firebase/firestore";

import { db } from "./firebaseConfig";

export const createUserDocument = async (user) => {
	if (!user) return null;

	// Reference to the user document
	const userRef = doc(db, "users", user.uid);

	// Check if user document exists
	const userSnap = await getDoc(userRef);

	if (!userSnap.exists()) {
		const userData = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			createdAt: new Date(),
			score: 0,
			currentCastle: "./c1.svg",
		};

		try {
			await setDoc(userRef, userData);
			console.log("New user created in Firestore");
			return userData;
		} catch (error) {
			console.error("Error creating user document:", error);
			throw error;
		}
	}

	return userSnap.data();
};

export const getUserData = async (uid) => {
	if (!uid) return null;

	const userRef = doc(db, "users", uid);
	const userSnap = await getDoc(userRef);

	if (userSnap.exists()) {
		return userSnap.data();
	}

	return null;
};
