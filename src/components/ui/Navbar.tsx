"use client";

import { useAuth } from "@/app/context/AuthContext";
import { loginWithGoogle } from "@/utils/handleLoginOut";
import { UserData } from "@/utils/handleLoginOut";
import { Button } from "./button";
import Link from "next/link";
import { Key } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const { user, setUser } = useAuth();
	const router = useRouter();

	const handleSignInSuccess = (userData: UserData) => {
		setUser(userData);
		console.log(user);
	};

	return (
		<nav className="fixed top-0 left-0 w-full border-b border-gray-200 z-50 bg-sky-400">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center ">
				<Link href="/">
					<div className="text-2xl font-semibold font-custom text-white">STUDENTCONNECT</div>
				</Link>
				<div className="flex items-center gap-4">
					{user ? (
						<>
							<div className="flex items-center gap-3">
								{user.photoURL && (
									// eslint-disable-next-line @next/next/no-img-element
									<img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
								)}
								<span className="text-white font-bold">Hi, {user.displayName}</span>
								<Button
									onClick={() => {
										setUser(null);
										router.push("/landing");
									}}
									variant="secondary"
									className="font-custom bg-white text-sky-600 hover:bg-sky-100 transition-colors duration-200 font-medium px-6 py-2 rounded-lg shadow-sm custom"
								>
									Logout
								</Button>
							</div>
						</>
					) : (
						<Button
							onClick={() => loginWithGoogle(handleSignInSuccess)}
							className="bg-white text-sky-600 hover:bg-sky-100 transition-colors duration-200 font-medium px-6 py-2 rounded-lg flex items-center font-custom text-lg"
						>
							Sign in{" "}
							<span>
								<Key className="ml-2 h-5 w-3" />
							</span>
						</Button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
