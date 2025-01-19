"use client";
import { db } from "@/firebase/firebaseConfig";

import { collection, getDocs } from "firebase/firestore";


const fetchcalls = () => {
    getDocs(collection(db, "calls")).then((querySnapshot) => {
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return null;
        }

        return querySnapshot.docs[Math.floor(Math.random()*(querySnapshot.docs.length))].id;
    }).catch((error) => {
        console.log("Error getting documents: ", error);
        return null;
    });
}

export { fetchcalls } ;