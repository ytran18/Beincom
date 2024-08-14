import { fireStore } from "@/core/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Reply to a comment
export async function POST(req: NextRequest) {
    try {
        const { commentId, reply } = await req.json();

        // Reference to the comment document
        const commentRef = doc(fireStore, "comments", commentId);

        // Add the reply to the 'replies' array field
        await updateDoc(commentRef, {
            replies: arrayUnion(reply) // Ensure `reply` is an object with appropriate fields
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