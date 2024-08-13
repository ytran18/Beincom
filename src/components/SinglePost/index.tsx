import { Avatar } from "antd";

import { Post } from "@/types";

interface SinglePost {
    post: Post;
}

const SinglePost = (props: SinglePost) => {

    const { post } = props;

    return (
        <div className="w-full p-4 flex flex-col gap-3 shadow-md bg-white rounded-lg">
            <div className="w-full flex items-center gap-2">
                <Avatar
                    shape="square"
                    size={"large"}
                >
                    {post.userId}
                </Avatar>
                <div className="text-base">{post.userId}</div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <div className="text-xl">{post.title}</div>
                <div className="text-sm">{post.body}</div>
            </div>
            <div className=""></div>
            <div className=""></div>
        </div>
    );
};

export default SinglePost;