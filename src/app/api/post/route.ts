import { fireStore } from "@/core/firebase";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// add new post
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // Validate required fields
        if (!data._id || !data.userId || !data.title || !data.content) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const docRef = doc(collection(fireStore, "posts"), data._id);
        await setDoc(docRef, data);

        return NextResponse.json(
            { message: "Create post successful" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    };
};

// Get a post by ID
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("id");

        if (postId) {
            const docRef = doc(fireStore, "posts", postId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return NextResponse.json({ error: "Post not found" }, { status: 404 });
            }

            const postData = docSnap.data();

            return NextResponse.json(postData, { status: 200 });
        } else {
            const postsCollection = collection(fireStore, "posts");
            const postsSnapshot = await getDocs(postsCollection);
            const postsList = postsSnapshot.docs.map(doc => ({
                _id: doc.id,
                ...doc.data(),
            }));

            return NextResponse.json(postsList, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}