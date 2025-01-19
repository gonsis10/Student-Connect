'use client';

import React from 'react';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Navbar: React.FC = () => {

    const provider = new GoogleAuthProvider();

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            const user = auth.currentUser;
            if(user){
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if(!userDocSnapshot.exists()){
                    await setDoc(userDocRef, {
                        userId: user.uid,
                        email: user.email,
                    })
                }
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // The signed-in user info
            const user = result.user;
            console.log("Signed in user:", user);
        } catch (error: any) {
            // Handle Errors here
            console.error("Google Sign-In Error:", error);
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used
            const email = error.customData?.email;
            // The AuthCredential type that was used
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-xl font-bold">
                    Your App Name
                </div>
                <div>
                    <button 
                        onClick={loginWithGoogle}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;