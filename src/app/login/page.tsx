"use client"
import { useState } from "react";
import { Input, Button, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/core/firebase";

import LoginBg from '@/assets/images/background.webp';

const { Password } = Input;

interface LoginState {
    email: string;
    password: string;
}

const Login = () => {

    const router = useRouter();

    const [state, setState] = useState<LoginState>({
        email: '',
        password: ''
    });

    const handleLogin = async () => {
        const { email, password } = state;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const token = await user.getIdToken();
            localStorage.setItem('user-token', token);

            message.success('Login successful!');
            router.push('/newsfeed');

            return user;
        } catch (error) {
            throw error;
        };
    };

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
                                onClick={handleLogin}
                            >
                                Log In
                            </Button>
                            <div className="text-sm text-blue-400 hover:underline cursor-pointer text-end">Fotgot password?</div>
                        </div>
                    </div>
                    <div className="w-full text-sm text-center">
                        <div>
                            Don't have an account?&nbsp;
                            <span className="text-blue-500 hover:underline cursor-pointer">
                                <Link href={'/sign-up'}>
                                    Sign up
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;