"use client";

import { collection, addDoc, setDoc, onSnapshot, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import React from "react";

let localStream: MediaStream | null = null;
let remoteStream: MediaStream | null = null;

// HTML elements
type VideoRefs = {
	webcamButton: React.RefObject<HTMLButtonElement>;
	webcamVideo: React.RefObject<HTMLVideoElement>;
	callButton: React.RefObject<HTMLButtonElement>;
	callInput: React.RefObject<HTMLInputElement>;
	answerButton: React.RefObject<HTMLButtonElement>;
	remoteVideo: React.RefObject<HTMLVideoElement>;
	hangupButton: React.RefObject<HTMLButtonElement>;
};

let refs: VideoRefs;
let pc: RTCPeerConnection;

const initializeRefs = (videoRefs: VideoRefs) => {
	refs = videoRefs;
};

const initializePeerConnection = (rtcPeerConnection: RTCPeerConnection) => {
	pc = rtcPeerConnection;
};

// 1. Setup media sources
const startWebcam = async () => {
	localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
	remoteStream = new MediaStream();

	// Push tracks from local stream to peer connection
	localStream.getTracks().forEach((track) => {
		if (localStream) {
			pc.addTrack(track, localStream);
		}
	});

	// Pull tracks from remote stream, add to video stream
	pc.ontrack = (event) => {
		console.log("Received remote track:", event.streams);
		event.streams[0].getTracks().forEach((track) => {
			remoteStream?.addTrack(track);
		});
	};

	refs.webcamVideo.current.srcObject = localStream;
	refs.remoteVideo.current.srcObject = remoteStream;

	refs.callButton.current.disabled = false;
	refs.answerButton.current.disabled = false;
	refs.webcamButton.current.disabled = true;
};

// 2. Create an offer
const createCallOffer = async () => {
	// Reference Firestore collections for signaling
	const callDoc = doc(collection(db, "calls"));
	const offerCandidates = collection(callDoc, "offerCandidates");
	const answerCandidates = collection(callDoc, "answerCandidates");

	refs.callInput.current.value = callDoc.id;

	// Get candidates for caller, save to db
	pc.onicecandidate = (event) => {
		if (event.candidate) {
			addDoc(offerCandidates, event.candidate.toJSON());
		}
	};

	// Create offer
	const offerDescription = await pc.createOffer();
	await pc.setLocalDescription(offerDescription);

	const offer = {
		offer: {
			// Nested under 'offer' to match original structure
			sdp: offerDescription.sdp,
			type: offerDescription.type,
		},
	};

	await setDoc(callDoc, offer);

	// Listen for remote answer
	onSnapshot(callDoc, (snapshot) => {
		const data = snapshot.data();
		if (!pc.currentRemoteDescription && data?.answer) {
			const answerDescription = new RTCSessionDescription(data.answer);
			pc.setRemoteDescription(answerDescription);
		}
	});

	// Listen for remote ICE candidates
	onSnapshot(answerCandidates, (snapshot) => {
		snapshot.docChanges().forEach((change) => {
			if (change.type === "added") {
				const candidate = new RTCIceCandidate(change.doc.data());
				pc.addIceCandidate(candidate);
			}
		});
	});

	refs.hangupButton.current.disabled = false;
};

// 3. Answer the call with the unique ID
const answerCall = async () => {
	const callId = refs.callInput.current.value;
	const callDoc = doc(db, "calls", callId);
	const offerCandidates = collection(callDoc, "offerCandidates");
	const answerCandidates = collection(callDoc, "answerCandidates");

	pc.onicecandidate = (event) => {
		if (event.candidate) {
			addDoc(answerCandidates, event.candidate.toJSON());
		}
	};

	// Fetch data, then set the offer & answer
	const callData = (await getDoc(callDoc)).data();
	if (!callData) {
		throw new Error("Call does not exist. Please check the Call ID.");
	}

	const offerDescription = callData.offer;
	await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

	const answerDescription = await pc.createAnswer();
	await pc.setLocalDescription(answerDescription);

	const answer = {
		type: answerDescription.type,
		sdp: answerDescription.sdp,
	};

	await updateDoc(callDoc, { answer });

	// Listen to offer candidates
	onSnapshot(offerCandidates, (snapshot) => {
		snapshot.docChanges().forEach((change) => {
			if (change.type === "added") {
				const data = change.doc.data();
				pc.addIceCandidate(new RTCIceCandidate(data));
			}
		});
	});
};

const hangupCall = () => {

	// Cleanup and hang up the call
	if (pc) {
		pc.close();
		pc.onicecandidate = null;
		pc.ontrack = null;
	}

	// Reset local and remote streams
	localStream?.getTracks().forEach((track) => track.stop());
	localStream = null;
	remoteStream = null;

	// Reset UI elements
	if (refs) {
		refs.webcamVideo.current.srcObject = null;
		refs.remoteVideo.current.srcObject = null;

		refs.callButton.current.disabled = true;
		refs.answerButton.current.disabled = true;
		refs.hangupButton.current.disabled = true;
		refs.webcamButton.current.disabled = false;
	}
};

export { startWebcam, createCallOffer, answerCall, hangupCall, initializeRefs, initializePeerConnection };
