'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Lightbulb, Github } from "lucide-react";
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
					<div className="max-w-4xl mx-auto text-center pt-20">
						<h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Welcome to Student Connect</h2>
						<p className="mt-5 text-xl text-gray-500">A place where students come together to learn, grow, and connect.</p>
						<div className="mt-8 flex justify-center">
							<Link href="/get-started">
							    <Button size="lg" className="mr-4 bg-purple-600 hover:bg-purple-700 text-white">
							        Get Started
							        <ArrowRight className="ml-2 h-5 w-5" />
							    </Button>
							</Link>
							<Link href="/about">
								<Button variant="outline" size="lg" className="text-purple-600 border-purple-600 hover:bg-purple-100">
									Learn More
								</Button>
							</Link>
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
								title="Improve Your Social Skills"
								description="Talk to others from a collection of fun prompts to improve your social skills while meeting people from across the world."
							/>
						</div>
					</div>
				</section>
			</main>

			<footer className="bg-purple-600 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div>
							<h3 className="text-xl font-bold mb-4">Student Connect</h3>
							<p className="text-purple-100">Bringing students together to learn, grow, and connect.</p>
						</div>
						<div>
							<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
							<ul className="space-y-2">
								<li><a href="#" className="hover:text-purple-200 transition-colors">Home</a></li>
								<li><a href="#" className="hover:text-purple-200 transition-colors">About</a></li>
							</ul>
						</div>
						<div className="items-center">
							<h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
							<div className="flex space-x-4">
								<a href="#" className="text-white hover:text-purple-200 transition-colors">
									<Github className="h-6 w-6" href="https://github.com/owenHochwald/nw_hacks"/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md text-center">
			<div className="mb-4">{icon}</div>
			<h3 className="text-xl font-semibold mb-2">{title}</h3>
			<p className="text-gray-600">{description}</p>
		</div>
	);
}
