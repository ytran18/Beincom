import { fireStore } from "@/core/firebase";
import { collection, getDocs, query, doc, setDoc, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// add new user
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const email = data?.email;

        // check email exists
        const q = query(collection(fireStore, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
        }

        const docRef = doc(collection(fireStore, "users"), data?._id);
        await setDoc(docRef, data);

        return NextResponse.json({ message: "Create user successful" }, { status: 201 });

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
};