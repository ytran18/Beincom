import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import IconPost from '@/assets/icons/iconPost.svg';

const WelcomePost = () => {
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
                    <div className="text-sm">Welcome back, <span className="font-semibold">Jin Eu</span></div>
                    <div className="text-xs">Share new ideas with your community!</div>
                </div>
            </div>
            <Button
                icon={<IconPost className="text-[#4096ff]"/>}
                size="large"
            >
                Quick Post
            </Button>
        </div>
    );
};

export default WelcomePost;