export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
};