import { Comment } from "@/types";
import SingleComment from "./SingleComment";

interface CommentsProps {
    comments: Comment[];
    handleReply: (commentId: string) => void;
}

const Comments = (props: CommentsProps) => {

    const { comments } = props;
    const { handleReply } = props;

    return (
        <div className="w-full flex flex-col gap-3">
            {comments.map((item) => {
                return (
                    <div
                        className="w-full"
                        key={item._id}
                    >
                        <SingleComment
                            comment={item}
                            handleReply={handleReply}
                        />
                    </div>
                )
            })}
        </div>
    );
};

export default Comments;