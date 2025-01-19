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
        <section className="py-24 pt-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-400/20 to-white">
          <div className="max-w-4xl mx-auto text-center pt-20">
            <h2 className="text-5xl font-bold sm:text-5xl lg:text-6xl bg-clip-text text-transparent text-slate-800 font-custom">
			  WELCOME TO STUDENT CONNECT
            </h2>
            <p className="mt-6 text-2xl text-gray-600 font-custom pt-10">
              A place where students come together to learn, grow, and connect.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link href="/get-started">
                <Button size="lg" className="bg-sky-400 hover:bg-sky-500 text-white font-semibold px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200  font-custom text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-sky-600 border-sky-400 hover:bg-sky-50 font-semibold px-12 py-6 rounded-xl  font-custom text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white font-custom text-lg">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Users className="h-12 w-12 text-sky-400" />}
                title="Inclusive Environment"
                description="Join a diverse community of students from all walks of life. We foster an inclusive environment where everyone is welcome."
              />
              <FeatureCard
                icon={<BookOpen className="h-12 w-12 text-sky-400" />}
                title="Find Your People"
                description="Connect with like-minded peers who share your interests. Whether you're looking for study buddies or friends, you'll find them here."
              />
              <FeatureCard
                icon={<Lightbulb className="h-12 w-12 text-sky-400" />}
                title="Improve Your Social Skills"
                description="Talk to others from a collection of fun prompts to improve your social skills while meeting people from across the world."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-sky-400 text-white py-16 font-small font-custom text-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Student Connect</h3>
              <p className="text-sky-50 text-lg">
                Bringing students together to learn, grow, and connect.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sky-50 hover:text-white transition-colors duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sky-50 hover:text-white transition-colors duration-200">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/owenHochwald/nw_hacks" 
                  className="text-white hover:text-sky-100 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-8 w-8" />
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
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-center border border-sky-100">
      <div className="mb-6 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
    </div>
  );
}