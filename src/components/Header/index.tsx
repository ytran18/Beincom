"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Input, Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";

import ProfilePopover from "../Popover/ProfilePopover";

import LogoIcon from '@/assets/images/logo_beincomm_icon_only.webp';
import LogoText from '@/assets/images/logo_beincomm_text_only.webp';

const { Search } = Input;

interface HeaderState {
    searchContent: string;
}

const Header = () => {

    const [state, setState] = useState<HeaderState>({
        searchContent: '',
    });

    return (
        <div className="w-full h-full flex items-center justify-between">
            <div className="flex flex-grow min-w-[288px] max-w-[320px]">
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
            <div className="min-w-[524px] max-w-[672px]">
                <Search
                    rootClassName="w-full"
                    value={state.searchContent}
                    onChange={(e) => setState(prev => ({...prev, searchContent: e.target.value}))}
                    placeholder="Search content"
                />
            </div>
            <div className="min-w-[288px] max-w-[320px] flex items-center justify-end">
                <Popover
                    trigger={"click"}
                    placement="bottomRight"
                    arrow={false}
                    content={
                        <ProfilePopover />
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