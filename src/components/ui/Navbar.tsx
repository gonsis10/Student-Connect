'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { loginWithGoogle, handleLogout } from '@/utils/handleLoginOut';
import Link from 'next/link';

const Navbar = () => {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full border-b border-gray-200 z-50 bg-purple-600">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center ">
                <Link href={"/landing"}>
                    <div className="text-lg font-semibold text-black">
                        Student Connect
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3">
                                {user.photoURL && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={user.photoURL} 
                                        alt="Profile" 
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-gray-900 hover:text-gray-800"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <button 
                            onClick={loginWithGoogle}
                            className="text-sm text-gray-900 hover:text-gray-800"
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