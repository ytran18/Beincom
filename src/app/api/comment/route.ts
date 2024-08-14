import { fireStore } from "@/core/firebase";
import { collection, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// add new comment
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const docRef = doc(collection(fireStore, "comments"), data._id);
        await setDoc(docRef, data);

        return NextResponse.json(
            { message: "Comment successful" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { error: "Failed to create comment" },
            { status: 500 }
        );
    };
};