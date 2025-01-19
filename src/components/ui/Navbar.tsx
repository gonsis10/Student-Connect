'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { loginWithGoogle, handleLogout } from '@/utils/handleLoginOut';
import Link from 'next/link';
import { Button } from './button';

const Navbar = () => {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full border-b border-gray-200 z-50 bg-slate-100">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center ">
                <Link href="/" className='py-2 px-3 hover:bg-slate-200 rounded'>
                    <span className="font-bold text-lg">Student Connect</span>
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
                                <Button
                                    onClick={handleLogout}
                                    className="text-sm hover:text-gray-800"
                                >
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button 
                            onClick={loginWithGoogle}
                            className="text-sm hover:text-gray-300"
                        >
                            Sign in
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;