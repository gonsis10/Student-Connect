"use client";
import React, { useRef, useState } from "react";
import { startWebcam, answerCall, createCallOffer, hangupCall, initializeRefs, initializePeerConnection } from "./video";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

type QuestionCategory = "funny" | "getToKnow" | "deep";

type Questions = {
	[K in QuestionCategory]: string[];
};

const questions: Questions = {
	funny: [
		"If you could instantly master any skill but it only works on Tuesdays, what would you choose?",
		"What's the most ridiculous thing you've ever done to avoid talking to someone?",
		"If your pet could suddenly speak, what's the first secret of yours they would expose?",
		"What's the weirdest thing you've ever eaten out of politeness?",
		"What's the most embarrassing song on your playlist that you secretly love?",
		"If you could turn any mundane activity into an Olympic sport, what would you win gold in?",
		"If animals could drive, who would be the worst driver and why?",
	],
	getToKnow: [
		"What's a small habit that completely changed your life?",
		"What's something you're proud of that you rarely get to talk about?",
		"What's the best piece of advice you've ever ignored?",
		"What's a recurring dream you've had throughout your life?",
		"What's the story behind your name?",
		"What's a belief you held strongly in your teens that makes you laugh now?",
		"Who has influenced your life the most in unexpected ways?",
		"What’s your favorite memory from childhood that still inspires you today?",
	],
	deep: [
		"How has your definition of success changed as you've gotten older?",
		"What part of your younger self would be most surprised by who you are today?",
		"What's a fear you've overcome that still surprises you?",
		"What's something that everyone seems to understand but you've never quite figured out?",
		"What's a memory that always makes you smile but might seem ordinary to others?",
		"How do you think your future self will judge your current priorities?",
		"What is something you wish you could tell your past self?",
	],
};

function App() {
	const [activeTab, setActiveTab] = useState<QuestionCategory>("funny");
	const [isQuestionPanelOpen, setIsQuestionPanelOpen] = useState(true);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const refs = {
		webcamVideo: useRef<HTMLVideoElement>(null),
		remoteVideo: useRef<HTMLVideoElement>(null),
		hangupButton: useRef<HTMLButtonElement>(null),
	};

	React.useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
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
				{
					urls: "turn:global.relay.metered.ca:80?transport=tcp",
					username: "fce59371acabe2e99f8755ad",
					credential: "qovyPoRp1pZiE/l6",
				},
				{
					urls: "turn:global.relay.metered.ca:443",
					username: "fce59371acabe2e99f8755ad",
					credential: "qovyPoRp1pZiE/l6",
				},
				{
					urls: "turns:global.relay.metered.ca:443?transport=tcp",
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
					// Answer the call if callId is present in URL
					answerCall(callId).then(console.log).catch(console.error);
				} else {
					// If no callId is provided, create the call
					createCallOffer().then(console.log).catch(console.error);
				}
			})
		}, 1000);

	}, [refs]);

	return (
		<div className="min-h-screen bg-gradient-to-br bg-ivory">
			<Navbar />
			<main className="container mx-auto px-4 pt-20 h-[calc(100vh-64px)]">
				<div className="flex gap-6 h-full">
					{/* Main Content */}
					<div className="flex-1 flex flex-col gap-6">
						{/* Video Grid */}
						<div className="grid grid-cols-2 gap-6 flex-1">
							{/* Local Video */}
							<Card className="aspect-video relative overflow-hidden bg-purple-200/50">
								<video ref={refs.webcamVideo} autoPlay playsInline className="w-full h-full object-cover" />
								<div className="absolute bottom-3 left-3 bg-purple-900/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium">You</div>
							</Card>

							{/* Remote Video */}
							<Card className="aspect-video relative overflow-hidden bg-purple-200/50">
								<video ref={refs.remoteVideo} autoPlay playsInline className="w-full h-full object-cover" />
								<div className="absolute bottom-3 left-3 bg-purple-900/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium">Partner</div>
							</Card>
						</div>

						{/* Controls */}
						<Card className="bg-white/80 backdrop-blur border-purple-100">
							<div className="grid gap-4 p-4">
								<Link href="/dashboard" className="block">
									<Button ref={refs.hangupButton} onClick={hangupCall} className="w-full bg-red-500 hover:bg-red-600">
										End Call
									</Button>
								</Link>
							</div>
						</Card>
					</div>

					{/* Questions Panel */}
					<div className="relative">
						<Button onClick={() => setIsQuestionPanelOpen(!isQuestionPanelOpen)} className="absolute -left-12 top-4 p-2 bg-purple-700 hover:bg-purple-800 rounded-l-lg rounded-r-none">
							<MessageCircle className="h-5 w-5" />
						</Button>

						<Card className={`w-96 h-full bg-white/80 backdrop-blur transition-all duration-300 ${isQuestionPanelOpen ? "translate-x-0" : "translate-x-full"}`}>
							<div className="p-6 h-full flex flex-col">
								<h2 className="text-xl font-semibold font-custom text-purple-900 mb-6">Conversation Starters</h2>

								<Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as QuestionCategory)} className="flex-1 flex flex-col">
									<TabsList className="grid w-full grid-cols-3 mb-6">
										<TabsTrigger value="funny">Fun</TabsTrigger>
										<TabsTrigger value="getToKnow">Social</TabsTrigger>
										<TabsTrigger value="deep">Deep</TabsTrigger>
									</TabsList>

									<div className="flex-1 overflow-y-auto">
										<TabsContent value={activeTab} className="mt-0 h-full">
											<div className="space-y-3">
												{questions[activeTab].map((question, index) => (
													<Card key={index} className="p-3 bg-purple-50/50 hover:bg-purple-100/50 transition-colors border-purple-100">
														<p className="text-sm text-purple-900">{question}</p>
													</Card>
												))}
											</div>
										</TabsContent>
									</div>
								</Tabs>
							</div>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
