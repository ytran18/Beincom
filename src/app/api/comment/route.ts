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

// Reply to a comment
export async function POST_REPLY(req: NextRequest) {
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