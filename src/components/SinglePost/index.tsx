import { Avatar } from "antd";
import useAuth from "@/hooks/useAuth";

import CommentInput from "../CommentInput";

import { Post } from "@/types";
import { UserOutlined, LikeOutlined, CommentOutlined, LinkOutlined } from "@ant-design/icons";

interface SinglePost {
    post: Post;
}

const SinglePost = (props: SinglePost) => {

    const { post } = props;

    const user = useAuth().user;

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
                    <div className="text-xs opacity-60 font-semibold">4 mins</div>
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
                    11 comments
                </div>
            </div>
            <div className="w-full flex items-center gap-16 text-xl border-t border-b py-2">
                <div className="cursor-pointer px-10 rounded-md py-1 hover:bg-[#f4f4f4]">
                    <LikeOutlined />
                </div>
                <div className="cursor-pointer px-10 rounded-md py-1 hover:bg-[#f4f4f4]">
                    <CommentOutlined />
                </div>
                <div className="cursor-pointer px-10 rounded-md py-1 hover:bg-[#f4f4f4]">
                    <LinkOutlined />
                </div>
            </div>
            <div className="w-full">
                <CommentInput />
            </div>
        </div>
    );
};

export default SinglePost;