"use client";

import Image from "next/image";
import Link from "next/link";

import { Input, Avatar, Popover, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { signOut } from "firebase/auth";
import { auth } from "@/core/firebase";
import { useRouter } from "next/navigation";

import ProfilePopover from "../Popover/ProfilePopover";

import LogoIcon from '@/assets/images/logo_beincomm_icon_only.webp';
import LogoText from '@/assets/images/logo_beincomm_text_only.webp';

const { Search } = Input;

interface HeaderProps {
    onSearch: (value: string) => void;
}

const Header = (props: HeaderProps) => {

    const { onSearch } = props;
    const router = useRouter();

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('user-token');
            router.push('/login');
        } catch (error) {
            message.error('Internal error');
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-between">
            <div className="flex">
                <Link className="flex items-center gap-1" href={'/newsfeed'}>
                    <Image
                        alt="logo-icon"
                        src={LogoIcon}
                        className="w-[28px] h-[28px]"
                    />
                    <Image
                        alt="logo-text"
                        src={LogoText}
                        className="w-[110px] h-[22px]"
                    />
                </Link>
            </div>
            <div className="hidden md:flex md:w-[300px] lg:w-[500px]">
                <Search
                    rootClassName="w-full"
                    placeholder="Search content"
                    onSearch={onSearch}
                    allowClear
                />
            </div>
            <div className=" flex items-center justify-end">
                <Popover
                    trigger={"click"}
                    placement="bottomRight"
                    arrow={false}
                    content={
                        <ProfilePopover
                            handleLogOut={handleLogOut}
                        />
                    }
                >
                    <Avatar
                        className="cursor-pointer"
                        icon={<UserOutlined />}
                    />
                </Popover>
            </div>
        </div>
    );
};

export default Header;