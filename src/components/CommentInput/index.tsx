"use client";

import React, { useEffect, useRef } from "react";

import { Avatar, Input } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface CommentInputProps {
    comment: string;
    isFocusComment?: number;
    handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    handleCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleComment: () => void;
}

const CommentInput = (props: CommentInputProps) => {

    const { comment, isFocusComment } = props;
    const { handleKeyDown, handleCommentChange, handleComment } = props;

    const commentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isFocusComment === undefined) return;
        
        if (commentRef.current && isFocusComment > 0) commentRef.current.focus();
    },[isFocusComment]);

    return (
        <div className="w-full flex gap-3">
            <Avatar
                size={"small"}
                icon={<UserOutlined />}
            />
            <div className="w-full relative border border-[#d9d9d9] rounded-md py-1">
                <TextArea
                    ref={commentRef}
                    autoSize
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Write your comment"
                    rootClassName="!border-none !shadow-none"
                    onKeyDown={handleKeyDown}
                />
                <div
                    className={`${!comment ? 'top-1/2 -translate-y-1/2 right-3 absolute cursor-not-allowed opacity-60' : 'cursor-pointer w-full flex justify-end pr-3 pb-1'}`}
                    onClick={handleComment}
                >
                    <SendOutlined />
                </div>
            </div>
        </div>
    );
};

export default CommentInput;