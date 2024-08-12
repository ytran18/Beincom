import api from ".";

type Post = {
    id: number;
    title: string;
    body: string;
}

export default async function getPosts(limit = 10): Promise<Array<Post>> {
    const { data } = await api.get<Array<Post>>(`/posts`);
    return data.filter((x: Post) => x.id <= limit);
};