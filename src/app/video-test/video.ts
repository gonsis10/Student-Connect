import {collection, addDoc, setDoc, onSnapshot, getDoc, updateDoc, doc, getFirestore} from 'firebase/firestore';
import app from '../firebase/firebaseConfig';
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

const initializeRefs = (videoRefs: VideoRefs)=> {
    refs = videoRefs;
}

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

    const offerCandidates = collection(callDoc, 'offerCandidates');
    const answerCandidates = collection(callDoc, 'answerCandidates');

    refs.callInput.current.value = callDoc.id;

    // Get candidates for caller, save to db
    pc.onicecandidate = (event) => {
        if (event.candidate) {
            const candidateData = event.candidate.toJSON();
            addDoc(offerCandidates, candidateData)
                .then(() => console.log(candidateData))
                .catch((error) => console.error("Failed to add candidate: ", error));
        }
    };

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
    };

    await setDoc(callDoc, offer);

    // Listen for remote answer
    onSnapshot(callDoc, (snapshot) => {
        const data = snapshot;
        if (!pc.currentRemoteDescription && data.exists() && data.data().answer) {
            const answerDescription = new RTCSessionDescription(data.data().answer);
            pc.setRemoteDescription(answerDescription);
        }
    });

    const iceCandidateQueue: RTCIceCandidate[] = [];

    // When answered, add candidate to peer connection
    onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const candidateData = change.doc.data();
                const candidate = new RTCIceCandidate(candidateData);

                if (pc.remoteDescription) {
                    // Add candidate immediately if remote description is set
                    pc.addIceCandidate(candidate)
                        .then(() => console.log('Added ICE candidate:', candidate))
                        .catch((error) => console.error('Failed to add ICE candidate:', error));
                } else {
                    // Queue candidate if remote description is not set yet
                    console.log('Queuing ICE candidate until remote description is set:', candidate);
                    iceCandidateQueue.push(candidate);
                }
            }
        });

        // Process the queued ICE candidates after the remote description is set
        if (pc.remoteDescription) {
            iceCandidateQueue.forEach((queuedCandidate) => {
                pc.addIceCandidate(queuedCandidate)
                    .then(() => console.log('Added queued ICE candidate:', queuedCandidate))
                    .catch((error) => console.error('Failed to add queued ICE candidate:', error));
            });
            iceCandidateQueue.length = 0; // Clear the queue
        }
    });

    refs.hangupButton.current.disabled = false;
};

// 3. Answer the call with the unique ID
const answerCall = async () => {
    const callId = refs.callInput.current.value;
    const callDoc = doc(db, 'calls', callId);

    const answerCandidates = collection(callDoc, 'answerCandidates');
    const offerCandidates = collection(callDoc, 'offerCandidates');

    pc.onicecandidate = (event) => {
        if (event.candidate) addDoc(answerCandidates, event.candidate.toJSON());
    };


    const callData = await getDoc(callDoc);
    if (!callData.exists()) {
        throw new Error("Call does not exist. Please check the Call ID.");
    }

    console.log(callData.data());

    const data = callData.data();
    console.log(data);
    if (data?.type != "offer") {
        throw new Error("Offer missing in call data.");
    }

    const formatted_data = {
        type: data.type,
        sdp: data.sdp,
    }

    await pc.setRemoteDescription(new RTCSessionDescription(formatted_data));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, answer);

    const iceCandidateQueue: RTCIceCandidate[] = [];
    onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const candidateData = change.doc.data();
                const candidate = new RTCIceCandidate(candidateData);

                if (pc.remoteDescription) {
                    // Add candidate immediately if remote description is set
                    pc.addIceCandidate(candidate)
                        .then(() => console.log('Added ICE candidate:', candidate))
                        .catch((error) => console.error('Failed to add ICE candidate:', error));
                } else {
                    // Queue candidate if remote description is not set yet
                    console.log('Queuing ICE candidate until remote description is set:', candidate);
                    iceCandidateQueue.push(candidate);
                }
            }
        });

        // Process the queued ICE candidates after the remote description is set
        if (pc.remoteDescription) {
            iceCandidateQueue.forEach((queuedCandidate) => {
                pc.addIceCandidate(queuedCandidate)
                    .then(() => console.log('Added queued ICE candidate:', queuedCandidate))
                    .catch((error) => console.error('Failed to add queued ICE candidate:', error));
            });
            iceCandidateQueue.length = 0; // Clear the queue
        }

    });
};

const hangupCall = () => {
    pc.close();
    localStream?.getTracks().forEach((track) => {
        track.stop();
    });
    remoteStream?.getTracks().forEach((track) => {
        track.stop();
    });
    refs.webcamButton.current.disabled = false;
    refs.callButton.current.disabled = true;
    refs.answerButton.current.disabled = true;
    refs.hangupButton.current.disabled = true;
}

export {startWebcam, createCallOffer, answerCall, hangupCall, initializeRefs, initializePeerConnection};