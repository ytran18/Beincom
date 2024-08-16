import {
    useMutation,
    useQueryClient,
    UseMutationResult,
    useQuery,
    UseQueryResult,
} from "@tanstack/react-query";
import api from "@/service";
import { Post } from "@/types";

interface CreatePostResponse {
    data: Post;
    message: string;
}

// create new post
const createPost = async (newPost: Post): Promise<CreatePostResponse> => {
    const response = await api.post<CreatePostResponse>("/api/post", newPost);
    return response.data;
};

// get post by id
const getPost = async (postId: string): Promise<Post> => {
    const response = await api.get<Post>(`/api/post?id=${postId}`);
    return response.data;
};

// get all posts
const getAllPosts = async (sortByComments: boolean = false): Promise<Post[]> => {
    const response = await api.get<Post[]>(`/api/post?sortByComments=${sortByComments}`);
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

export function useGetAllPosts(sortByComments: boolean = false): UseQueryResult<Post[], Error> {
    return useQuery<Post[], Error>({
        queryKey: ["get-all-posts", sortByComments],
        queryFn: () => getAllPosts(sortByComments),
        refetchOnWindowFocus: false,
    });
}