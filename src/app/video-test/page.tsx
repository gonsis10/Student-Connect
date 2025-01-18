import './style.css';

// 3. Answer the call with the unique ID
answerButton.onclick = async () => {
    const callId = callInput.value;
    const callDoc = firestore.collection('calls').doc(callId);
    const answerCandidates = callDoc.collection('answerCandidates');
    const offerCandidates = callDoc.collection('offerCandidates');

    pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            console.log(change);
            if (change.type === 'added') {
                let data = change.doc.data();
                pc.addIceCandidate(new RTCIceCandidate(data));
            }
        });
    });
};

export default function Page() {
    return <html lang="en">
    <head>
        <meta charSet="UTF-8"/>
        <link rel="icon" type="image/svg+xml" href="favicon.svg"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>WebRTC Demo</title>
    </head>
    <body>
    <h2>1. Start your Webcam</h2>
    <div className="videos">
      <span>
        <h3>Local Stream</h3>
        <video id="webcamVideo" autoPlay playsInline></video>
      </span>
        <span>
        <h3>Remote Stream</h3>
        <video id="remoteVideo" autoPlay playsInline></video>
      </span>


    </div>

    <button id="webcamButton">Start webcam</button>
    <h2>2. Create a new Call</h2>
    <button id="callButton" disabled>Create Call (offer)</button>

    <h2>3. Join a Call</h2>
    <p>Answer the call from a different browser window or device</p>

    <input id="callInput"/>
    <button id="answerButton" disabled>Answer</button>

    <h2>4. Hangup</h2>

    <button id="hangupButton" disabled>Hangup</button>

    <script type="module" src="/video.tsx"></script>

    </body>
    </html>
}