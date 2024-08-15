import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";

import IconPost from '@/assets/icons/iconPost.svg';

interface WelcomePostProps {
    handleModalCreatePost: () => void;
}

const WelcomePost = (props: WelcomePostProps) => {

    const { handleModalCreatePost } = props;

    const user = useAuth().user;

    return (
        <div className="w-full p-4 flex flex-col gap-3 shadow-md">
            <div className="flex items-center gap-4">
                <div className="">
                    <Avatar
                        size={"large"}
                        icon={<UserOutlined />}
                    />
                </div>
                <div className="">
                    <div className="text-sm">Welcome back, <span className="font-semibold">{user?.name}</span></div>
                    <div className="text-xs">Share new ideas with your community!</div>
                </div>
            </div>
            <Button
                icon={<IconPost className="text-[#4096ff]"/>}
                size="large"
                onClick={handleModalCreatePost}
            >
                Quick Post
            </Button>
        </div>
    );
};

export default WelcomePost;