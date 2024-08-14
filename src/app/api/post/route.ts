import { fireStore } from "@/core/firebase";
import { collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";
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

// Get post
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("id");
        const sortByComments = searchParams.get("sortByComments") === "true";

        if (postId) {
            const docRef = doc(fireStore, "posts", postId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return NextResponse.json({ error: "Post not found" }, { status: 404 });
            }

            const postData = docSnap.data();

            // Fetch comments for the post
            const commentsRef = collection(fireStore, "comments");
            const commentsQuery = query(
                commentsRef,
                where("postId", "==", postId),
                orderBy("createdAt", "asc")
            );
            const commentsSnapshot = await getDocs(commentsQuery);
            const commentsList = commentsSnapshot.docs.map(doc => ({
                _id: doc.id,
                ...doc.data(),
            }));

            const totalCommentsQuery = query(
                commentsRef,
                where("postId", "==", postId)
            );
            const totalCommentsSnapshot = await getDocs(totalCommentsQuery);
            const totalCommentCount = totalCommentsSnapshot.size;

            // Combine post data with comments
            const responseData = {
                ...postData,
                comments: commentsList,
                totalComment: totalCommentCount,
            };

            return NextResponse.json(responseData, { status: 200 });
        } else {
            const postsCollection = collection(fireStore, "posts");
            const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
            const postsSnapshot = await getDocs(postsQuery);

            const postsList = await Promise.all(postsSnapshot.docs.map(async (doc) => {
                const postData = doc.data();

                const commentsRef = collection(fireStore, "comments");
                const latestCommentQuery = query(
                    commentsRef,
                    where("postId", "==", doc.id),
                    orderBy("createdAt", "desc"),
                    limit(1)
                );
                const latestCommentSnapshot = await getDocs(latestCommentQuery);
                const latestComment = latestCommentSnapshot.docs.map(commentDoc => ({
                    _id: commentDoc.id,
                    ...commentDoc.data(),
                }))[0];

                const totalCommentsQuery = query(
                    commentsRef,
                    where("postId", "==", doc.id)
                );
                const totalCommentsSnapshot = await getDocs(totalCommentsQuery);
                const totalCommentCount = totalCommentsSnapshot.size;

                return {
                    _id: doc.id,
                    ...postData,
                    comments: latestComment ? [latestComment] : [],
                    totalComment: totalCommentCount,
                };
            }));

            if (sortByComments) {
                postsList.sort((a, b) => (b.totalComment || 0) - (a.totalComment || 0));
            }

            return NextResponse.json(postsList, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts", detail: error }, { status: 500 });
    }
}