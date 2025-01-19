'use client'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/ui/Navbar'
import { fetchcalls } from "@/app/dashboard/handleRoomSelection"
import Link from "next/link"
import { useState } from "react"
import { Video, Users, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function Dashboard() {
  const [roomData, setRoomData] = useState('');

  const handleFetchRoom = async () => {
    console.log('fetching room data');
    const data = await fetchcalls();
    console.log(data);
    setRoomData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[80vh]">
        <Card className="max-w-2xl w-full bg-white/50 backdrop-blur border-none shadow-lg">
          <CardContent className="p-8 text-center">
            {/* Hero Section */}
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <Video className="h-12 w-12 text-sky-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Start Connecting
              </h1>
              <div className="h-1 w-20 bg-sky-400 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 mb-8">
                Join a random room to start meaningful conversations with peers
              </p>
            </div>

            {/* Button Section */}
            <div className="space-y-4">
              <Button 
                onClick={handleFetchRoom}
                className="w-full bg-sky-400 hover:bg-sky-500 text-white py-6 text-lg"
              >
                <Users className="mr-2 h-5 w-5" />
                Find Available Room
              </Button>

              {roomData !== '' && roomData !== 'null' && (
                <Link href={`/video?room=${encodeURIComponent(roomData)}`} className="w-full block">
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white py-6 text-lg">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Join Random Room
                  </Button>
                </Link>
              )}

              {roomData === 'null' && (
                <Link href={`/video`} className="w-full block">
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white py-6 text-lg">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Create New Room
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}