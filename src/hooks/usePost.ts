import {
    useMutation,
    useQueryClient,
    UseMutationResult,
    useQuery,
    UseQueryResult,
} from "@tanstack/react-query";
import api from "@/service";
import { Post } from "@/types";

// Định nghĩa kiểu dữ liệu cho phản hồi của việc tạo bài đăng mới
interface CreatePostResponse {
    data: Post;
    message: string;
}

// Hàm gửi yêu cầu tạo bài đăng mới
const createPost = async (newPost: Post): Promise<CreatePostResponse> => {
    const response = await api.post<CreatePostResponse>("/api/post", newPost);
    return response.data;
};

// Hàm lấy thông tin chi tiết của bài đăng theo ID
const getPost = async (postId: string): Promise<Post> => {
    const response = await api.get<Post>(`/api/post?id=${postId}`);
    return response.data;
};

const getAllPosts = async (): Promise<Post[]> => {
    const response = await api.get<Post[]>("/api/post");
    return response.data;
};

export function useCreatePost(): UseMutationResult<
    CreatePostResponse,
    Error,
    Post
> {
    const queryClient = useQueryClient();

    return useMutation<CreatePostResponse, Error, Post>({
        mutationFn: createPost,
        onSuccess: () => {
            // Invalidate the 'posts' query to refresh the post list
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            // Handle the error here, maybe show a notification
            console.error("Failed to create post:", error);
        },
    });
}

export function useGetPost(postId: string): UseQueryResult<Post, Error> {
    return useQuery<Post, Error>({
        queryKey: ["get-post", postId],
        queryFn: () => getPost(postId) as Promise<Post>,
        refetchOnWindowFocus: false,
    });
}

export function useGetAllPosts(): UseQueryResult<Post[], Error> {
    return useQuery<Post[], Error>({
        queryKey: ["get-all-posts"],
        queryFn: getAllPosts,
        refetchOnWindowFocus: false,
    });
}