"use client";
import { db } from "@/firebase/firebaseConfig";

import { collection, getDocs } from "firebase/firestore";


const fetchcalls = async () => {
    const querySnapshot = await getDocs(collection(db, "calls"));

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id);
    });

    return 0;

}



export { fetchcalls } ;