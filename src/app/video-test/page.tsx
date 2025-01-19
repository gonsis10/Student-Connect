'use client';
import React, { useRef, useState } from "react";
import { startWebcam, answerCall, createCallOffer, hangupCall, initializeRefs, initializePeerConnection } from "./video";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, MessageCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

// Define types for our questions structure
type QuestionCategory = 'funny' | 'getToKnow' | 'deep';

type Questions = {
  [K in QuestionCategory]: string[];
};

const questions: Questions = {
  funny: [
    "If you could instantly master any skill but it only works on Tuesdays, what would you choose?",
    "What's the most ridiculous thing you've ever done to avoid talking to someone?",
    "If your pet could suddenly speak, what's the first secret of yours they would expose?",
    "What's the weirdest thing you've ever eaten out of politeness?",
    "If you had to replace your hands with any two objects, what would you choose?",
    "What's the most embarrassing song on your playlist that you secretly love?"
  ],
  getToKnow: [
    "What's a small habit that completely changed your life?",
    "What's something you're proud of that you rarely get to talk about?",
    "What's the best piece of advice you've ever ignored?",
    "What's a recurring dream you've had throughout your life?",
    "What's the story behind your name?",
    "What's a belief you held strongly in your teens that makes you laugh now?"
  ],
  deep: [
    "How has your definition of success changed as you've gotten older?",
    "What part of your younger self would be most surprised by who you are today?",
    "What's a fear you've overcome that still surprises you?",
    "What's something that everyone seems to understand but you've never quite figured out?",
    "What's a memory that always makes you smile but might seem ordinary to others?",
    "How do you think your future self will judge your current priorities?"
  ]
};

function App() {
  const [activeCategory, setActiveCategory] = useState<QuestionCategory>('funny');
  const [currentQuestion, setCurrentQuestion] = useState<string>(questions.funny[0]);
  const [isQuestionPanelOpen, setIsQuestionPanelOpen] = useState(true);

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

  React.useEffect(() => {
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
  }, []);

  const getRandomQuestion = () => {
    const categoryQuestions = questions[activeCategory];
    const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
    setCurrentQuestion(categoryQuestions[randomIndex]);
  };

  // Rest of the component remains the same...
  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] pt-16">
        {/* Main Content */}
        <div className="flex-1 p-6 flex flex-col space-y-4">
          {/* Video Grid */}
          <div className="flex-1 grid grid-cols-2 gap-6">
            {/* Local Video */}
            <Card className="relative overflow-hidden bg-purple-100 rounded-xl shadow-lg">
              <video 
                ref={refs.webcamVideo} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-purple-800/80 text-white px-3 py-1 rounded-lg backdrop-blur-sm">
                You
              </div>
            </Card>

            {/* Remote Video */}
            <Card className="relative overflow-hidden bg-purple-100 rounded-xl shadow-lg">
              <video 
                ref={refs.remoteVideo} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-purple-800/80 text-white px-3 py-1 rounded-lg backdrop-blur-sm">
                Partner
              </div>
            </Card>
          </div>

          {/* Controls */}
          <Card className="p-4 bg-white/50 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  ref={refs.webcamButton} 
                  onClick={startWebcam}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Start Webcam
                </Button>
                <Button 
                  ref={refs.callButton} 
                  onClick={createCallOffer}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Create Call
                </Button>
              </div>
              <div className="flex gap-4">
                <Input 
                  ref={refs.callInput} 
                  placeholder="Enter call ID" 
                  className="flex-grow"
                />
                <Button 
                  ref={refs.answerButton} 
                  onClick={answerCall}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Answer
                </Button>
              </div>
              <Link href="/dashboard" className="block">
                <Button 
                  ref={refs.hangupButton} 
                  onClick={hangupCall}
                  className="w-full bg-red-500 hover:bg-red-600"
                >
                  End Call
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Questions Panel */}
        <div className="relative">
          <Button
            onClick={() => setIsQuestionPanelOpen(!isQuestionPanelOpen)}
            className="absolute -left-12 top-4 p-2 bg-purple-600 hover:bg-purple-700"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          
          <div className={`w-96 bg-white p-6 shadow-lg transition-all duration-300 ${isQuestionPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-800">Conversation Starters</h2>
              <Button
                onClick={getRandomQuestion}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New
              </Button>
            </div>

            <Tabs 
              value={activeCategory} 
			  // TODO: handle value change
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="funny">Fun</TabsTrigger>
                <TabsTrigger value="getToKnow">Social</TabsTrigger>
                <TabsTrigger value="deep">Deep</TabsTrigger>
              </TabsList>

              <Card className="p-4 bg-purple-50 mb-4">
                <p className="text-lg text-purple-900">{currentQuestion}</p>
              </Card>

              {Object.entries(questions).map(([category, categoryQuestions]) => (
                <TabsContent key={category} value={category}>
                  <div className="space-y-3">
                    {categoryQuestions.map((question, index) => (
                      <Card 
                        key={index} 
                        className="p-3 cursor-pointer hover:bg-purple-50 transition-colors"
                        onClick={() => setCurrentQuestion(question)}
                      >
                        <p className="text-sm text-purple-700">{question}</p>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;