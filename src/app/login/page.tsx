"use client"
import { useState } from "react";
import { Input, Button } from "antd";
import Image from "next/image";

import LoginBg from '@/assets/images/background.webp';

const { Password } = Input;

interface LoginState {
    email: string;
    password: string;
}

const Login = () => {

    const [state, setState] = useState<LoginState>({
        email: '',
        password: ''
    });

    return (
        <div className="w-screen h-screen relative">
            <div className="fixed inset-0 z-[-1]">
                <Image
                    alt="login_bg"
                    src={LoginBg}
                    className="absolute w-full h-full"
                />
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full sm:w-[27.25rem] bg-white h-fit rounded-2xl p-12">
                    <div className="flex flex-col gap-1 pb-6 text-center">
                        <div className="text-2xl font-bold">Log in to Beincom</div>
                        <div className="text-sm opacity-70">The future of community engagement</div>
                    </div>
                    <div className="w-full px-3 flex flex-col gap-4 pb-6">
                        <div className="flex flex-col gap-1 text-sm">
                            Email
                            <Input
                                placeholder="Your email"
                                size="large"
                                value={state.email}
                                onChange={(e) => setState(prev => ({...prev, email: e.target.value}))}
                                />
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            Password
                            <Password
                                placeholder="Your password"
                                size="large"
                                value={state.password}
                                onChange={(e) => setState(prev => ({...prev, password: e.target.value}))}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <Button
                                size="large"
                                type="primary"
                                disabled={!state.email || !state.password}
                            >
                                Log In
                            </Button>
                            <div className="text-sm text-blue-400 hover:underline cursor-pointer text-end">Fotgot password?</div>
                        </div>
                    </div>
                    <div className="w-full text-sm text-center">
                        <div>Don't have an account? <span className="text-blue-500 hover:underline cursor-pointer">Sign up</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;