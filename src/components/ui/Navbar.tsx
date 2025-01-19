'use client';

import React, { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Navbar = () => {
    const [user, setUser] = useState(auth.currentUser);
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

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

    return (
        <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="text-lg font-semibold text-gray-800">
                    Student Connect
                </div>
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3">
                                {user.photoURL && (
                                    <img 
                                        src={user.photoURL} 
                                        alt="Profile" 
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <button 
                            onClick={loginWithGoogle}
                            className="text-sm text-gray-600 hover:text-gray-800"
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;