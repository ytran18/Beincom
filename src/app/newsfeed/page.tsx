"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Feed from "@/components/Feed";

import { auth } from "@/core/firebase";
import { useGetAllPosts, useCreatePost } from "@/hooks/usePost";

import { Post } from "@/types";
import { message } from "antd";

interface NewsFeedState {
    posts: Post[];
}

const NewsFeed = () => {

    const [state, setState] = useState<NewsFeedState>({
        posts: [],
    });
    
    const { data, isPending, refetch } = useGetAllPosts();
    const { mutate, isPending: createPending } = useCreatePost();

    useEffect(() => {
        if (data) setState(prev => ({...prev, posts: data}));
    },[data]);

    const handleNewPost = (post: Post) => {
        mutate(post,
            {
                onSuccess: () => {
                    message.success("Post created successfully!");
                    refetch();
                },
                onError: (error) => {
                    message.error(`Failed to create post: ${error.message}`);
                },
            }
        );
    };

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
                    handleNewPost={handleNewPost}
                    isCreatePostPending={createPending}
                />
            </div>
        </div>
    );
};

export default NewsFeed;