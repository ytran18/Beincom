export interface Comment {
    _id: string;
    userId: string;
    postId: string;
    content: string;
    createdAt: number;
    replies?: Comment[];
};

export interface Post {
    _id: string;
    userId: string;
    title: string;
    content: string;
    comments: Comment[];
    createdAt: number;
    totalComment?: number;
};

export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
};