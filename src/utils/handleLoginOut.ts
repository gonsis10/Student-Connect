import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

// First, let's define the type for the user data
export type UserData = {
	userId: string;
	email: string | null;
	photoURL: string | null;
	displayName: string | null;
};

// Update the loginWithGoogle function to accept the callback directly
const loginWithGoogle = async (onSignInSuccess: (userData: UserData) => void) => {
	try {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;

		const userDocRef = doc(db, "users", user.uid);
		const userDocSnapshot = await getDoc(userDocRef);

		const userData = {
			userId: user.uid,
			email: user.email,
			photoURL: user.photoURL,
			displayName: user.displayName,
		};

		if (!userDocSnapshot.exists()) {
			await setDoc(userDocRef, userData);
		}

		onSignInSuccess(userData);
	} catch (error) {
		console.error("Login error:", error);
	}
};

export { loginWithGoogle };
