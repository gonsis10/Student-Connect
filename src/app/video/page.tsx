"use client";

import React, { useEffect, useRef } from "react";
import { startWebcam, answerCall, createCallOffer, hangupCall, initializeRefs, initializePeerConnection } from "./video";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

const questions = [
	"If you could instantly master any skill but it only works on Tuesdays, what would you choose?",
	"What's the most ridiculous thing you've ever done to avoid talking to someone?",
	"If your pet could suddenly speak, what's the first secret of yours they would expose?",
	"What's the weirdest thing you've ever eaten out of politeness?",
	"What's the most embarrassing song on your playlist that you secretly love?",
	"If you could turn any mundane activity into an Olympic sport, what would you win gold in?",
	"If animals could drive, who would be the worst driver and why?",
	"What's a small habit that completely changed your life?",
	"What's something you're proud of that you rarely get to talk about?",
	"What's the best piece of advice you've ever ignored?",
	"What's a recurring dream you've had throughout your life?",
	"What's the story behind your name?",
	"What's a belief you held strongly in your teens that makes you laugh now?",
	"Who has influenced your life the most in unexpected ways?",
	"What's your favorite memory from childhood that still inspires you today?",
	"How has your definition of success changed as you've gotten older?",
	"What part of your younger self would be most surprised by who you are today?",
	"What's a fear you've overcome that still surprises you?",
	"What's something that everyone seems to understand but you've never quite figured out?",
	"What's a memory that always makes you smile but might seem ordinary to others?",
	"How do you think your future self will judge your current priorities?",
	"What is something you wish you could tell your past self?",
	"What is your dream job?",
	"What are your strengths?",
	"What is your biggest weakness?",
	"What do you do to relax?",
	"What is your favorite food?",
	"What is your favorite childhood memory?",
	"What is your favorite holiday destination?",
	"Who is your role model?",
	"What are your plans for the future?",
	"What is one thing you want to improve about yourself?",
	"What is your favorite way to spend a weekend?",
	"What inspires you?",
	"What is your favorite subject in school?",
	"What do you do when you feel stressed?",
	"What is your proudest moment?",
	"What is something you want to try but haven’t yet?",
	"What is your favorite sport?",
	"What is one skill you want to learn?",
	"What do you value most in a friendship?",
	"What is your favorite season of the year?",
	"What is your favorite app or website?",
	"What do you usually do in the mornings?",
	"What is your favorite way to exercise?",
	"What is one thing you would change about the world?",
	"What is your favorite animal?",
	"What is the most adventurous thing you’ve ever done?",
	"What do you like most about your job or studies?",
	"What is your favorite memory from the past year?",
	"What do you do to stay healthy?",
	"What is one thing you cannot live without?",
	"What is your favorite genre of books or movies?",
	"What is your morning routine?",
	"What motivates you to work hard?",
	"What do you usually do on holidays?",
];

function App() {
	const refs = {
		webcamVideo: useRef<HTMLVideoElement>(null!),
		remoteVideo: useRef<HTMLVideoElement>(null!),
		hangupButton: useRef<HTMLButtonElement>(null!),
	};

	useEffect(() => {
		initializeRefs(refs);

		const peerConnection = new RTCPeerConnection({
			iceServers: [
				{
					urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
				},
				{
					urls: "turn:global.relay.metered.ca:80",
					username: "fce59371acabe2e99f8755ad",
					credential: "qovyPoRp1pZiE/l6",
				},
			],
			iceCandidatePoolSize: 10,
		});

		initializePeerConnection(peerConnection);

		const urlParams = new URLSearchParams(window.location.search);
		const callId = urlParams.get("room");

		setTimeout(() => {
			startWebcam().then(() => {
				if (callId && callId !== "") {
					answerCall(callId).then(console.log).catch(console.error);
				} else {
					createCallOffer().then(console.log).catch(console.error);
				}
			});
		}, 1000);
	}, [refs]);

	return (
		<div className="min-h-screen bg-white">
			<Navbar />
			<main className="container mx-auto px-2 pt-36 h-[calc(100vh-64px)]">
				<div className="flex gap-4 h-full">
					<div className="flex-1 flex flex-col gap-4">
						<div className="grid grid-cols-2 gap-4 flex-1 h-[80vh]">
							<Card className="relative overflow-hidden bg-sky-50 shadow-lg border-sky-100 h-full">
								<video ref={refs.webcamVideo} autoPlay playsInline className="w-full h-full object-cover" />
								<div className="absolute bottom-3 left-3 bg-sky-500/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
									<Video className="h-4 w-4" />
									You
								</div>
							</Card>
							<Card className="relative overflow-hidden bg-sky-50 shadow-lg border-sky-100 h-full">
								<video ref={refs.remoteVideo} autoPlay playsInline className="w-full h-full object-cover" />
								<div className="absolute bottom-3 left-3 bg-sky-500/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
									<Video className="h-4 w-4" />
									Partner
								</div>
							</Card>
						</div>
						<Card className="bg-white/80 backdrop-blur border-sky-100 shadow-md">
							<div className="p-4 flex justify-center">
								<Link href="/dashboard" className="block">
									<Button ref={refs.hangupButton} onClick={hangupCall} className="bg-red-400 hover:bg-red-600 px-6">
										End Call
									</Button>
								</Link>
							</div>
						</Card>
					</div>
					<div className="relative">
						<Card className="w-90 h-full bg-white shadow-lg border-sky-100">
							<div className="p-6 h-full flex flex-col">
								<h2 className="text-xl font-semibold text-sky-900 mb-6">Conversation Starters</h2>
								<div className="flex-1 overflow-y-auto space-y-3">
									{questions.map((question, index) => (
										<Card key={index} className="p-3 bg-sky-50 hover:bg-sky-100/80 transition-colors border-sky-100">
											<p className="text-sm text-sky-900">{question}</p>
										</Card>
									))}
								</div>
							</div>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
