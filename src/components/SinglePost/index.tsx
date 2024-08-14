import React, { useEffect, useState } from "react";
import { Avatar, message } from "antd";
import useAuth from "@/hooks/useAuth";
import { useCreateComment } from "@/hooks/useComment";

import CommentInput from "../CommentInput";
import Comments from "../Comments";

import { Post, Comment } from "@/types";
import { timeGap } from "@/utils";
import { UserOutlined, LikeOutlined, CommentOutlined, LinkOutlined } from "@ant-design/icons";

const { v4: uuidv4 } = require('uuid');

interface SinglePostState {
    comments: Comment[];
    comment: string;
    isFocusComment: number;
}

interface SinglePostProps {
    post: Post;
}

const SinglePost = (props: SinglePostProps) => {

    const { post } = props;
    const user = useAuth().user;

    const [state, setState] = useState<SinglePostState>({
        comments: [],
        comment: '',
        isFocusComment: 0,
    });

    const { mutate, isPending } = useCreateComment();

    useEffect(() => {
        if (post.comments) setState(prev => ({...prev, comments: post.comments}));
    },[post]);

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState(prev => ({...prev, comment: event.target.value}));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!user?._id) return;
        
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const data: Comment = {
                _id: uuidv4(),
                userId: user?._id,
                postId: post._id,
                content: state.comment,
                createdAt: new Date().getTime(),
                replies: [],
            };

            const { comments } = state;

            mutate(
                data,
                {
                    onSuccess: () => {
                        message.success("Comment successfully!");
                        comments.push(data);
                        setState(prev => ({...prev, comments: comments, comment: ''}))
                    },
                    onError: (error) => {
                        message.error(`Failed to comment: ${error.message}`);
                    },
                }
            );
        };
    };

    const handleFocusComment = () => {
        state.isFocusComment = state.isFocusComment + 1;
        setState(prev => ({...prev}));
    };

    const handleReply = (commentId: string) => {
        
    };

    return (
        <div className="w-full p-4 flex flex-col gap-3 shadow-md bg-white rounded-lg">
            <div className="w-full flex gap-4">
                <Avatar
                    // shape="square"
                    size={"large"}
                    icon={<UserOutlined />}
                />
                <div className="flex flex-col gap-1">
                    <div className="text-sm font-bold tracking-wide">{user?.name}</div>
                    <div className="text-xs opacity-60 font-semibold">{timeGap(post.createdAt)}</div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-2">
                <div className="text-xl">{post.title}</div>
                <div className="text-sm">{post.content}</div>
            </div>

            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs cursor-pointer">
                    <LikeOutlined />
                    <div>12</div>
                </div>
                <div className="text-xs font-medium opacity-70 cursor-pointer hover:underline">
                    {`${post.totalComment || 0} comments`}
                </div>
            </div>

            <div className="w-full flex items-center gap-16 text-xl border-t border-b py-2">
                <div className="cursor-pointer px-10 rounded-md py-1 hover:bg-[#f4f4f4]">
                    <LikeOutlined />
                </div>
                <div
                    className="cursor-pointer px-10 rounded-md py-1 hover:bg-[#f4f4f4]"
                    onClick={handleFocusComment}
                >
                    <CommentOutlined />
                </div>
                <div className="cursor-pointer px-10 rounded-md py-1 hover:bg-[#f4f4f4]">
                    <LinkOutlined />
                </div>
            </div>

            <div className="w-full">
                <Comments
                    comments={state.comments}
                    handleReply={handleReply}
                />
            </div>

            <div className="w-full">
                <CommentInput
                    comment={state.comment}
                    isFocusComment={state.isFocusComment}
                    handleKeyDown={handleKeyDown}
                    handleCommentChange={handleCommentChange}
                />
            </div>
        </div>
    );
};

export default SinglePost;