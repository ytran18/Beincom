import { fireStore } from "@/core/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Reply to a comment
export async function POST(req: NextRequest) {
    try {
        const { commentId, reply } = await req.json();

        const commentRef = doc(fireStore, "comments", commentId);

        await updateDoc(commentRef, {
            replies: arrayUnion(reply)
        });

        return NextResponse.json(
            { message: "Reply added successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error adding reply:", error);
        return NextResponse.json(
            { error: "Failed to add reply" },
            { status: 500 }
        );
    }
}