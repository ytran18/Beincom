import {
    useMutation,
    useQueryClient,
    UseMutationResult,
    useQuery,
    UseQueryResult
} from "@tanstack/react-query";
import api from "@/service";
import { User } from "@/types";

interface CreateUserResponse {
    data: User;
    message: string;
}

// creat new user
const createUser = async (newUser: User): Promise<CreateUserResponse> => {
    const response = await api.post<CreateUserResponse>("/api/user", newUser);
    return response.data;
};

// get user by id
const getUser = async (userId: string): Promise<User> => {
    const response = await api.get<User>(`/api/user?id=${userId}`);
    return response.data;
};

export function useCreateUser(): UseMutationResult<
    CreateUserResponse,
    Error,
    User
> {
    const queryClient = useQueryClient();

    return useMutation<CreateUserResponse, Error, User>({
        mutationFn: createUser,
        onSuccess: () => {
            // Invalidate the 'users' query to refresh the user list
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            // Handle the error here, maybe show a notification
            console.error("Failed to create user:", error);
        },
    });
}

export function useGetUser(userId: string): UseQueryResult<User, Error> {
    return useQuery<User, Error>({
        queryKey: ['get-user', userId],
        queryFn: () => getUser(userId) as Promise<User>,
        refetchOnWindowFocus: false,
    });
}