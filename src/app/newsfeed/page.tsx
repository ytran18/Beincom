"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Feed from "@/components/Feed";

import { useGetAllPosts, useCreatePost } from "@/hooks/usePost";

import { Post } from "@/types";
import { message } from "antd";

interface NewsFeedState {
    posts: Post[];
    sort: 'latest' | 'comment';
}

const NewsFeed = () => {

    const [state, setState] = useState<NewsFeedState>({
        posts: [],
        sort: 'latest',
    });

    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    const { data, refetch } = useGetAllPosts(state.sort === 'comment' ? true : false);
    const { mutate, isPending: createPending } = useCreatePost();

    useEffect(() => {
        if (data) {
            setState(prev => ({...prev, posts: data}));
            setFilteredPosts(data);
        }
    }, [data]);

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

    const handleChangeSort = (value: 'latest' | 'comment') => {
        setState(prev => ({ ...prev, sort: value }));
    };

    const onSearch = (value: string) => {
        const searchTerm = value.toLowerCase();

        const filtered = state.posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.content.toLowerCase().includes(searchTerm)
        );

        setFilteredPosts(filtered);
    };

    useEffect(() => {
        refetch();
    }, [state.sort]);

    return (
        <div className="w-screen h-screen">
            <div className="w-full h-[3.75rem] px-24 flex items-center justify-center border-b bg-white shadow-sm">
                <Header
                    onSearch={onSearch}
                />
            </div>
            <div
                className="bg-[#eaedf2] w-full flex justify-center overflow-y-auto"
                style={{
                    height: 'calc(100vh - 60px)'
                }}
            >
                <Feed
                    posts={filteredPosts}
                    sort={state.sort}
                    isCreatePostPending={createPending}
                    handleNewPost={handleNewPost}
                    handleChangeSort={handleChangeSort}
                />
            </div>
        </div>
    );
};

export default NewsFeed;