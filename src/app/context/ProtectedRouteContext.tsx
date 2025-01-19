"use client";

import { useAuth } from "./AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";

interface ProtectedRouteProps {
	children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { user } = useAuth();

	useEffect(() => {
		if (!user) {
			redirect("/");
		}
	}, [user]);

	// Don't render anything while checking authentication
	if (!user) {
		return null;
	}

	return <>{children}</>;
}
