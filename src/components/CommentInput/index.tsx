"use client";

import { useState } from "react";

import { Avatar, Input } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface CommentInputState {
    comment: string;
}

const CommentInput = () => {

    const [state, setState] = useState<CommentInputState>({
        comment: '',
    });

    return (
        <div className="w-full flex gap-3">
            <Avatar
                size={"small"}
                icon={<UserOutlined />}
            />
            <div className="w-full relative border border-[#d9d9d9] rounded-md py-1">
                <TextArea
                    autoSize
                    value={state.comment}
                    onChange={(e) => setState(prev => ({...prev, comment: e.target.value}))}
                    placeholder="Write your comment"
                    rootClassName="!border-none !shadow-none"
                />
                <div className={`${!state.comment ? 'top-1/2 -translate-y-1/2 right-3 absolute cursor-not-allowed opacity-60' : 'cursor-pointer w-full flex justify-end pr-3 pb-1'}`}>
                    <SendOutlined />
                </div>
            </div>
        </div>
    );
};

export default CommentInput;