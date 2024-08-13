import SinglePost from "@/components/SinglePost";

import { Post } from "@/types";

interface ContentProps {
    posts?: Post[];
}

const Content = (props: ContentProps) => {

    const { posts } = props;

    return (
        <div className="w-full flex flex-col gap-4">
            {posts?.map((item, index) => {
                return (
                    <div
                        key={`post-${index}`}
                        className=""
                    >
                        <SinglePost
                            post={item}
                        />
                    </div>
                )
            })}
        </div>
    );
};

export default Content;