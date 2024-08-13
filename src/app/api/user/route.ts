import { fireStore } from "@/core/firebase";
import { collection, getDocs, query, doc, setDoc, where, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// get user by ID
export async function GET(req: NextRequest) {
    try {
        // Extract the user ID from the query parameters
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("id");
        console.log({userId});

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const docRef = doc(fireStore, "users", userId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userData = docSnap.data();

        return NextResponse.json(userData, { status: 200 });

    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    };
};

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