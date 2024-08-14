"use client";

import { useState, useEffect } from "react";

import Header from "@/components/Header";
import SinglePost from "@/components/SinglePost";

import { useGetPost } from "@/hooks/usePost";
import { Post } from "@/types";

interface PostDetailState {
    post: Post;
}

const PostDetail = ({ params }: { params: { postId: string } }) => {

    const [state, setState] = useState<PostDetailState>({
        post: {
            _id: '',
            userId: '',
            title: '',
            content: '',
            comments: [],
            createdAt: 0,
        },
    });

    const { data, isPending } = useGetPost(params.postId);

    useEffect(() => {
        if (data) setState(prev => ({...prev, post: data}));
    },[data]);

    if (isPending) return <></>

    return (
        <div className="w-screen h-screen">
            <div className="w-full h-[3.75rem] px-24 flex items-center justify-center border-b bg-white shadow-sm">
                <Header />
            </div>
            <div
                className="bg-[#eaedf2] w-full flex justify-center overflow-y-auto py-6"
                style={{
                    height: 'calc(100vh - 60px)'
                }}
            >
                <div className="w-full h-fit min-w-[524px] max-w-[672px]">
                    <SinglePost
                        post={state.post}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostDetail;