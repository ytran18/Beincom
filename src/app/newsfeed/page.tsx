"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Feed from "@/components/Feed";

import { auth } from "@/core/firebase";
import { useGetAllPosts } from "@/hooks/usePost";

import { Post } from "@/types";

interface NewsFeedState {
    posts: Post[];
}

const NewsFeed = () => {

    const [state, setState] = useState<NewsFeedState>({
        posts: [],
    });
    
    const { data, isPending } = useGetAllPosts();

    useEffect(() => {
        if (data) setState(prev => ({...prev, posts: data}));
    },[data]);

    return (
        <div className="w-screen h-screen">
            <div className="w-full h-[3.75rem] px-24 flex items-center justify-center border-b bg-white shadow-sm">
                <Header />
            </div>
            <div
                className="bg-[#eaedf2] w-full flex justify-center overflow-y-auto"
                style={{
                    height: 'calc(100vh - 60px)'
                }}
            >
                <Feed
                    posts={state.posts}
                />
            </div>
        </div>
    );
};

export default NewsFeed;