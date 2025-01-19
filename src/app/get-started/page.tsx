"use client";

import {auth} from '@/firebase/firebaseConfig';
import {loginWithGoogle} from "@/utils/handleLoginOut";
import React from "react";

const GetStartedPage: React.FC = () => {
    const user = auth.currentUser;

    const login = () => loginWithGoogle().then(() => window.location.href = '/dashboard');

    if (user) {
        window.location.href = '/dashboard';
    }



    if (!user) {
        // Get Started Page if user is not logged in
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold mb-4">Welcome to Our App</h1>
                <p className="mb-6 text-gray-600">Get started by signing up or logging in below:</p>
                <div className="flex space-x-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={login}
                    >
                        Sign Up/Login
                    </button>
                </div>
            </div>
        );
    }

    return null; // Should never reach here since user is redirected if logged in
};

export default GetStartedPage;