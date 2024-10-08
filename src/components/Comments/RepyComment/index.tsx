import { Avatar, Input } from "antd";

import { Comment } from "@/types";
import { timeGap } from "@/utils";
import { UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface ReplyCommentProps {
    replies: Comment;
}

const ReplyComment = (props: ReplyCommentProps) => {

    const { replies } = props;

    return (
        <div className="w-full flex gap-3">
            <Avatar 
                icon={<UserOutlined />}
                size={"small"}
            />
            <div className="flex flex-col gap-2 w-full">
                <div className="w-full relative border border-[#d9d9d9] rounded-md py-1">
                    <div className="text-sm font-extrabold px-[11px]">{replies.user?.name}</div>
                    <TextArea
                        autoSize
                        value={replies.content}
                        disabled
                        rootClassName="!border-none !shadow-none !bg-white !text-black !text-xs !cursor-text"
                    />
                </div>
                <div className="w-full flex items-center gap-5 text-xs">
                    <div className="">{timeGap(replies.createdAt)}</div>
                    <div className="hover:underline cursor-pointer">Like</div>
                </div>
            </div>
        </div>
    );
};

export default ReplyComment;