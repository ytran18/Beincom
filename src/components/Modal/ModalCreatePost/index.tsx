import { useState, useRef, useEffect } from "react";
import { Modal, Avatar, Input, Button, message } from "antd";
import useAuth from "@/hooks/useAuth";
import { UserOutlined } from "@ant-design/icons";
import { Post } from "@/types";
import { useCreatePost } from "@/hooks/usePost";

const { v4: uuidv4 } = require('uuid');

const { TextArea } = Input;

interface ModalCreatePostProps {
    open: boolean;
    handleModalCreatePost: () => void;
};

interface ModalCreatePostState {
    content: string;
    title: string;
};

const ModalCreatePost = (props: ModalCreatePostProps) => {

    const { open } = props;
    const { handleModalCreatePost } = props;

    const [state, setState] = useState<ModalCreatePostState>({
        content: '',
        title: '',
    });

    const user = useAuth().user;
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const { mutate, isPending } = useCreatePost();

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    },[]);

    const handleCreatePost = () => {
        const { content, title } = state;

        if (!user?._id) return;

        const post = {
            _id: uuidv4(),
            userId: user._id,
            title: title,
            content: content,
            createdAt: new Date().getTime(),
            comments: [],
        };

        mutate(post,
            {
                onSuccess: () => {
                    message.success("Post created successfully!");
                    handleModalCreatePost();
                },
                onError: (error) => {
                    message.error(`Failed to create post: ${error.message}`);
                },
            }
        );
    };

    return (
        <Modal
            open={open}
            title="Create post"
            onCancel={handleModalCreatePost}
            footer={[]}
        >
            <div className="w-full flex flex-col gap-5 pt-5">
                <div className="flex gap-2 items-center">
                    <Avatar
                        icon={<UserOutlined />}
                    />
                    <div className="text-sm font-medium">{user?.name}</div>
                </div>

                <Input
                    placeholder="Title"
                    value={state.title}
                    onChange={(e) => setState(prev => ({...prev, title: e.target.value}))}
                />

                <div className="w-full">
                    <TextArea
                        ref={inputRef}
                        placeholder="Content"
                        value={state.content}
                        autoSize={{
                            minRows: 3
                        }}
                        onChange={(e) => setState(prev => ({...prev, content: e.target.value}))}
                    />
                </div>
                <Button
                    type="primary"
                    size="large"
                    disabled={!state.content || !state.title}
                    onClick={handleCreatePost}
                    loading={isPending}
                >
                    Post
                </Button>
            </div>
        </Modal>
    );
};

export default ModalCreatePost;