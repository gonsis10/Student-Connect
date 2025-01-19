import {signInWithPopup, signOut, GoogleAuthProvider} from "firebase/auth";
import {auth, db} from "@/firebase/firebaseConfig";
import {doc, getDoc, setDoc} from "firebase/firestore";

const provider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
            await setDoc(userDocRef, {
                userId: user.uid,
                email: user.email,
                photoURL: user.photoURL,
                displayName: user.displayName
            });
        }
    } catch (error) {
        console.error("Login error:", error);
    }
};

const handleLogout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export {loginWithGoogle, handleLogout};