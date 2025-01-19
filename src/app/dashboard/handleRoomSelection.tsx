"use client";
import { db } from "@/firebase/firebaseConfig";

import { collection, getDocs } from "firebase/firestore";


const fetchcalls = async () => {
    const querySnapshot = await getDocs(collection(db, "calls"));

    // Check if there are any documents in the collection
    if (!querySnapshot.empty) {
        // Return the ID of the first document
        return querySnapshot.docs[0].id;
    }

    // Return null or an appropriate value if no documents are found
    ;
}


export { fetchcalls } ;