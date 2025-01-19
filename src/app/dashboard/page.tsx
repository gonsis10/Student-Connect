"use client";

import { Button } from '@/components/ui/button'
import Navbar from '@/components/ui/Navbar'
import {fetchcalls} from "@/app/dashboard/handleRoomSelection";
import Link from "next/link";
import {useState} from "react";

export default function Dashboard() {
	const [roomData, setRoomData] = useState('');

	const handleFetchRoom = async () => {
		console.log('fetching room data');
		const data = await fetchcalls();
		console.log(data);
		setRoomData(data);
	};

	return (
	  <div>
		  <Navbar/>
		  <div className="container mx-auto px-4 py-8 pt-20">
			  <h1 className="text-3xl font-bold mb-6">Get Started with a Random Room!</h1>
			  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				  <Button onClick={handleFetchRoom}>Fetch Room Data</Button>
				  {roomData !== '' && (
					  <Link href={`/video?room=${encodeURIComponent(roomData)}`}>
						  <Button>Join a Random Room</Button>
					  </Link>
				  )}
			  </div>
		  </div>
	  </div>
  )
}

