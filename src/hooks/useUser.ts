import {
    useMutation,
    useQueryClient,
    UseMutationResult,
} from "@tanstack/react-query";
import api from "@/service";
import { User } from "@/types";

// Định nghĩa kiểu dữ liệu cho phản hồi
interface CreateUserResponse {
    data: User;
    message: string;
}

// Hàm gửi yêu cầu tạo người dùng mới
const createUser = async (newUser: User): Promise<CreateUserResponse> => {
    const response = await api.post<CreateUserResponse>("/api/user", newUser);
    return response.data;
};

// Hook sử dụng useMutation để tạo người dùng mới
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
