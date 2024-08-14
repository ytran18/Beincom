"use client";
import { useEffect, useState } from "react";

import { Avatar, Input, message } from "antd";
import useAuth from "@/hooks/useAuth";

import { useReplyToComment } from "@/hooks/useComment";

import { Comment } from "@/types";
import { UserOutlined } from "@ant-design/icons";
import CommentInput from "@/components/CommentInput";
import ReplyComment from "../RepyComment";

const { v4:uuidv4 } = require('uuid');

const { TextArea } = Input;

interface SingleCommentState {
    isReply: boolean;
    replies: Comment[];
    replyContent: string;
}

interface SingleCommentProps {
    comment: Comment;
    handleReply: (commentId: string) => void;
}

const SingleComment = (props: SingleCommentProps) => {

    const { comment } = props;
    const { handleReply } = props;

    const [state, setState] = useState<SingleCommentState>({
        isReply: false,
        replies: [],
        replyContent: '',
    });

    const user = useAuth().user;

    const { mutate, isPending } = useReplyToComment();

    useEffect(() => {
        if (comment.replies !== undefined && comment.replies.length > 0) {
            setState(prev => ({ ...prev, replies: comment.replies ?? [] }));
        }
    },[comment]);

    const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState(prev => ({...prev, replyContent: event.target.value}));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!user?._id) return;

        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const data: Comment = {
                _id: uuidv4(),
                userId: user?._id,
                postId: comment.postId,
                content: state.replyContent,
                createdAt: new Date().getTime(),
                replies: [],
            };

            const { replies } = state;

            mutate(
                {commentId: comment._id, reply: data},
                {
                    onSuccess: () => {
                        message.success("Reply successfully!");
                        replies.push(data);
                        setState(prev => ({...prev, replies: replies, replyContent: ''}))
                    },
                    onError: (error) => {
                        message.error(`Failed to reply: ${error.message}`);
                    },
                }
            );
        }
    };

    return (
        <div className="w-full flex gap-3">
            <Avatar 
                icon={<UserOutlined />}
                size={"small"}
            />
            <div className="flex flex-col gap-2 w-full">
                <div className="w-full relative border border-[#d9d9d9] rounded-md py-1">
                    <div className="text-sm font-extrabold px-[11px]">{user?.name}</div>
                    <TextArea
                        autoSize
                        value={comment.content}
                        disabled
                        rootClassName="!border-none !shadow-none !bg-white !text-black !text-xs !cursor-text"
                    />
                </div>
                <div className="w-full flex items-center gap-10 text-xs">
                    <div className="hover:underline cursor-pointer">Like</div>
                    <div
                        className="hover:underline cursor-pointer"
                        onClick={() => {handleReply(comment._id); setState(prev => ({...prev, isReply: true}))}}
                    >
                        Reply
                    </div>
                </div>
                {state.replies.map((item) => {
                    return (
                        <div
                            className=""
                            key={item._id}
                        >
                            <ReplyComment
                                replies={item}
                            />
                        </div>
                    )
                })}
                {state.isReply && (
                    <div className="mt-2">
                        <CommentInput
                            comment={state.replyContent}
                            handleCommentChange={handleReplyChange}
                            handleKeyDown={handleKeyDown}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleComment;