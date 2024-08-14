"use client"

import { useState } from "react";

import WelcomePost from "./WelcomePost";
import Content from "./Content";
import Sort from "./Sort";
import ModalCreatePost from "../Modal/ModalCreatePost";

import { Post } from "@/types";

interface FeedState {
    isModalCreatePost: boolean;
}

interface FeedProps {
    posts?: Post[];
    isCreatePostPending: boolean;
    sort: 'latest' | 'comment';
    handleNewPost: (post: Post) => void;
    handleChangeSort: (value: 'latest' | 'comment') => void;
}

const Feed = (props: FeedProps) => {

    const { posts, isCreatePostPending, sort } = props;
    const { handleNewPost, handleChangeSort } = props;

    const [state, setState] = useState<FeedState>({
        isModalCreatePost: false,
    });

    const handleModalCreatePost = () => {
        setState(prev => ({...prev, isModalCreatePost: !prev.isModalCreatePost}));
    };

    return (
        <section className="w-full h-full px-6 md:px-0 md:min-w-[524px] max-w-[672px] pt-6">
            <div className="w-full bg-white rounded-lg mb-4">
                <WelcomePost
                    handleModalCreatePost={handleModalCreatePost}
                />
            </div>
            <div className="w-full mb-4">
                <Sort
                    sort={sort}
                    handleChangeSort={handleChangeSort}
                />
            </div>
            <div className="w-full pb-6">
                <Content
                    posts={posts}
                />
            </div>
            <ModalCreatePost
                open={state.isModalCreatePost}
                isCreatePostPending={isCreatePostPending}
                handleNewPost={handleNewPost}
                handleModalCreatePost={handleModalCreatePost}
            />
        </section>
    );
};

export default Feed;