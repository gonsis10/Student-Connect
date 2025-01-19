"use client";

import { useAuth } from "@/app/context/AuthContext";
import { loginWithGoogle } from "@/utils/handleLoginOut";
import { UserData } from "@/utils/handleLoginOut";

const Navbar = () => {
	const { user, setUser } = useAuth();

	const handleSignInSuccess = (userData: UserData) => {
		setUser(userData);
		console.log(user);
	};

	return (
		<nav className="fixed top-0 left-0 w-full border-b border-gray-200 z-50 bg-peach">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center ">
				<div className="text-xl font-semibold font-custom text-moss">STUDENTCONNECT</div>
				<div className="flex items-center gap-4">
					{user ? (
						<>
							<div className="flex items-center gap-3">
								{user.photoURL && (
									// eslint-disable-next-line @next/next/no-img-element
									<img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
								)}
								<button onClick={() => setUser(null)} className="text-sm text-gray-900 hover:text-gray-800">
									Logout
								</button>
							</div>
						</>
					) : (
						<button onClick={() => loginWithGoogle(handleSignInSuccess)} className="text-sm text-gray-900 hover:text-gray-800">
							Sign in
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
