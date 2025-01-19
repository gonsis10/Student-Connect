"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context value
type AuthContextType = {
	user: User | null;
	setUser: (user: User | null) => void;
};

// Define the User type
type User = {
	id?: string;
	email?: string | null;
	// ... other user properties
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props type for AuthProvider
interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	// Initialize state from localStorage if available
	const [user, setUser] = useState<User | null>(() => {
		if (typeof window !== "undefined") {
			const savedUser = localStorage.getItem("auth_user");
			return savedUser ? JSON.parse(savedUser) : null;
		}
		return null;
	});

	// Update localStorage whenever user state changes
	useEffect(() => {
		if (user) {
			localStorage.setItem("auth_user", JSON.stringify(user));
		} else {
			localStorage.removeItem("auth_user");
		}
	}, [user]);

	// Enhanced setUser function that updates both state and storage
	const handleSetUser = (newUser: User | null) => {
		setUser(newUser);
	};

	return <AuthContext.Provider value={{ user, setUser: handleSetUser }}>{children}</AuthContext.Provider>;
}

// Custom hook with type checking
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
