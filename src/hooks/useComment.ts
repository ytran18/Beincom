import {
    useMutation,
    useQueryClient,
    UseMutationResult,
    useQuery,
    UseQueryResult,
} from "@tanstack/react-query";
import api from "@/service";
import { Comment } from "@/types";

interface CreateCommentResponse {
    data: Comment;
    message: string;
}

// create comment
const createPost = async (newPost: Comment): Promise<CreateCommentResponse> => {
    const response = await api.post<CreateCommentResponse>("/api/comment", newPost);
    return response.data;
};

export function useCreateComment(): UseMutationResult<
    CreateCommentResponse,
    Error,
    Comment
> {
    const queryClient = useQueryClient();

    return useMutation<CreateCommentResponse, Error, Comment>({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
        onError: (error) => {
            console.error("Failed to create comment:", error);
        },
    });
};

// reply
const replyToComment = async (data: { commentId: string, reply: Comment }): Promise<void> => {
    await api.post("/api/comment/reply", data);
};

export function useReplyToComment(): UseMutationResult<
    void,
    Error,
    { commentId: string, reply: Comment }
> {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { commentId: string, reply: Comment }>({
        mutationFn: replyToComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
        onError: (error) => {
            console.error("Failed to reply to comment:", error);
        },
    });
}