"use client";

import "./style.css";
import React, { useRef } from "react";
import { startWebcam, answerCall, createCallOffer, hangupCall, initializeRefs, initializePeerConnection } from "./video";

function App() {
	// Create refs
	const refs = {
		webcamButton: useRef<HTMLButtonElement>(null),
		webcamVideo: useRef<HTMLVideoElement>(null),
		callButton: useRef<HTMLButtonElement>(null),
		callInput: useRef<HTMLInputElement>(null),
		answerButton: useRef<HTMLButtonElement>(null),
		remoteVideo: useRef<HTMLVideoElement>(null),
		hangupButton: useRef<HTMLButtonElement>(null),
	};

	// You can optionally log these refs to verify they are being passed correctly
	React.useEffect(() => {
		initializeRefs(refs); // Pass refs to the TS logic
		console.log({
			webcamButton: refs.webcamButton.current,
			webcamVideo: refs.webcamVideo.current,
			callButton: refs.callButton.current,
			callInput: refs.callInput.current,
			answerButton: refs.answerButton.current,
			remoteVideo: refs.remoteVideo.current,
			hangupButton: refs.hangupButton.current,
		});

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
	}, [refs]);

	return (
		<div className="App">
			<h2>1. Start your Webcam</h2>
			<div className="videos">
				<span>
					<h3>Local Stream</h3>
					<video ref={refs.webcamVideo} autoPlay playsInline></video>
				</span>
				<span>
					<h3>Remote Stream</h3>
					<video ref={refs.remoteVideo} id="remoteVideo" autoPlay playsInline></video>
				</span>
			</div>

			<button ref={refs.webcamButton} id="webcamButton" onClick={startWebcam}>
				Start webcam
			</button>
			<h2>2. Create a new Call</h2>
			<button ref={refs.callButton} id="callButton" onClick={createCallOffer}>
				Create Call (offer)
			</button>
			<h2>3. Join a Call</h2>
			<p>Answer the call from a different browser window or device</p>
			<input ref={refs.callInput} id="callInput" />
			<button ref={refs.answerButton} id="answerButton" onClick={answerCall}>
				Answer
			</button>
			<h2>4. Hangup</h2>
			<button ref={refs.hangupButton} id="hangupButton" onClick={hangupCall}>
				Hangup
			</button>
		</div>
	);
}

export default App;
