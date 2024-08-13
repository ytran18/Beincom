"use client"

import { useState } from "react";

import WelcomePost from "./WelcomePost";
import Content from "./Content";
import ModalCreatePost from "../Modal/ModalCreatePost";

import { Post } from "@/types";

interface FeedState {
    isModalCreatePost: boolean;
}

interface FeedProps {
    posts?: Post[];
}

const Feed = (props: FeedProps) => {

    const { posts } = props;

    const [state, setState] = useState<FeedState>({
        isModalCreatePost: false,
    });

    const handleModalCreatePost = () => {
        setState(prev => ({...prev, isModalCreatePost: !prev.isModalCreatePost}));
    };

    return (
        <section className="w-full h-full min-w-[524px] max-w-[672px] pt-6">
            <div className="w-full bg-white rounded-lg mb-4">
                <WelcomePost
                    handleModalCreatePost={handleModalCreatePost}
                />
            </div>
            <div className="w-full pb-6">
                <Content
                    posts={posts}
                />
            </div>
            <ModalCreatePost
                open={state.isModalCreatePost}
                handleModalCreatePost={handleModalCreatePost}
            />
        </section>
    );
};

export default Feed;