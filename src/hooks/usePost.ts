import getPosts from "@/service/get-post";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

type Post = {
    id: number;
    title: string;
    body: string;
};

export default function usePost(limit: number): UseQueryResult<Post[]> {
    return useQuery({
        queryKey: ['posts', limit],
        queryFn: () => getPosts(limit),
    });
};