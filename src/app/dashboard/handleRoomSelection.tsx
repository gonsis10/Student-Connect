"use client";
import { db } from "@/firebase/firebaseConfig";

import { collection, getDocs } from "firebase/firestore";



const querySnapshot = await getDocs(collection(db, "calls"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (doc.data().answer === null){
        return;
    }

    console.log(doc.id, " => ", doc.data());
});



