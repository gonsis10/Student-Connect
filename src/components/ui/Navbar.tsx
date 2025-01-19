"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { loginWithGoogle, handleLogout } from "@/utils/handleLoginOut";
import Link from "next/link";
import { Button } from "./button";
import { Key } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-sky-400 z-50 bg-sky-400 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <div className="text-2xl font-bold text-white font-custom transition-all duration-200 group-hover:text-sky-100">
            STUDENTCONNECT
          </div>
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              {user.photoURL && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
              )}
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="bg-white text-sky-600 hover:bg-sky-100 transition-colors duration-200 font-medium px-6 py-2 rounded-lg font-custom text-lg"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={loginWithGoogle}
              variant="secondary"
              className="bg-white text-sky-600 hover:bg-sky-100 transition-colors duration-200 font-medium px-6 py-2 rounded-lg flex items-center font-custom text-lg"
            >
              Sign in
              <span className="ml-2">
                <Key className="h-4 w-4" />
              </span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;