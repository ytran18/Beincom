"use client";

import Header from "@/components/Header";
import Feed from "@/components/Feed";

import usePost from "@/hooks/usePost";

const NewsFeed = () => {

    const { data } = usePost(10);
    console.log({data});

    return (
        <div className="w-screen h-screen">
            <div className="w-full h-[3.75rem] px-24 flex items-center justify-center border-b bg-white shadow-sm">
                <Header />
            </div>
            <div
                className="bg-[#eaedf2] w-full flex justify-center"
                style={{
                    height: 'calc(100vh - 60px)'
                }}
            >
                <Feed />
            </div>
        </div>
    );
};

export default NewsFeed;