import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Lightbulb } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import React from "react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<Navbar />
			</header>

			<main className="flex-grow">
				<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Welcome to Student Connect</h2>
						<p className="mt-5 text-xl text-gray-500">A place where students come together to learn, grow, and connect.</p>
						<div className="mt-8 flex justify-center">
							<Link href="/get-started">
							    <Button size="lg" className="mr-4 bg-purple-600 hover:bg-purple-700 text-white">
							        Get Started
							        <ArrowRight className="ml-2 h-5 w-5" />
							    </Button>
							</Link>
							<Button variant="outline" size="lg" className="text-purple-600 border-purple-600 hover:bg-purple-100">
								Learn More
							</Button>
						</div>
					</div>
				</section>

				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
							<FeatureCard
								icon={<Users className="h-8 w-8 text-purple-600" />}
								title="Inclusive Environment"
								description="Join a diverse community of students from all walks of life. We foster an inclusive environment where everyone is welcome."
							/>
							<FeatureCard
								icon={<BookOpen className="h-8 w-8 text-purple-600" />}
								title="Find Your People"
								description="Connect with like-minded peers who share your interests. Whether you're looking for study buddies or friends, you'll find them here."
							/>
							<FeatureCard
								icon={<Lightbulb className="h-8 w-8 text-purple-600" />}
								title="Learn New Skills"
								description="Engage in skill-sharing sessions, workshops, and discussions to enhance your knowledge and capabilities."
							/>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 border border-purple-100">
			<div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-md mb-4">{icon}</div>
			<h3 className="text-lg font-medium text-gray-900">{title}</h3>
			<p className="mt-2 text-base text-gray-500">{description}</p>
		</div>
	);
}
