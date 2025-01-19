"use client";
import { db } from "@/firebase/firebaseConfig";

import { collection, getDocs } from "firebase/firestore";


const fetchcalls = async () => {
    const querySnapshot = await getDocs(collection(db, "calls"));
    if (querySnapshot.empty) {
        console.log("No matching documents.");
        return 'null';
    }

    const roomId = querySnapshot.docs[Math.floor(Math.random()*(querySnapshot.docs.length))].id;
    while (roomId === '') {
        await new Promise(resolve => setTimeout(resolve, 100));
    } // scuffed wait

    return roomId
}

export { fetchcalls } ;