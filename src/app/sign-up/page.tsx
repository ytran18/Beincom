"use client"
import { useState } from "react";
import { Input, Button, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/core/firebase";

const { v4: uuidv4 } = require('uuid');

// hooks
import { useCreateUser } from "@/hooks/useUser";

// utils
import { isValidEmail } from "@/utils";

// image, icons
import LoginBg from '@/assets/images/background.webp';

const { Password } = Input;

interface SignUpState {
    email: string;
    username: string;
    fullname: string;
    password: string;
}

const SignUp = () => {

    const router = useRouter();

    const [state, setState] = useState<SignUpState>({
        email: '',
        username: '',
        fullname: '',
        password: '',
    });

    const { mutate, isPending } = useCreateUser();

    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return user;
        } catch (error) {
            throw error;
        };
    };
    
    const handleSignUp = async () => {
        const { email, username, password, fullname } = state;

        if (!isValidEmail(email)) {
            message.error('Invalid email');
            return;
        };

        try {
            const user = await signUp(email, password);

            mutate(
                { email, username, password, name: fullname, _id: user.uid },
                {
                    onSuccess: () => {
                        message.success("User created successfully!");
                        router.push('/login');
                    },
                    onError: (error) => {
                        message.error(`Failed to create user: ${error.message}`);
                    },
                }
            );
        } catch (error: any) {
            message.error(`Failed to sign up: ${error.message}`);
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
                <div className="w-full mx-4 sm:w-[27.25rem] bg-white h-fit rounded-2xl p-12">
                    <div className="flex flex-col gap-1 pb-10 text-center">
                        <div className="text-2xl font-bold">Log in to Beincom</div>
                        <div className="text-sm opacity-70">The future of community engagement</div>
                    </div>
                    <div className="w-full px-3 flex flex-col gap-4 pb-10">
                        <div className="flex flex-col gap-1 text-sm">
                            Email
                            <Input
                                placeholder="Your email"
                                size="large"
                                value={state.email}
                                status={isValidEmail(state.email) ? '' : 'error'}
                                onChange={(e) => setState(prev => ({...prev, email: e.target.value}))}
                            />
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            Username
                            <Input
                                placeholder="Your username"
                                size="large"
                                value={state.username}
                                onChange={(e) => setState(prev => ({...prev, username: e.target.value}))}
                            />
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            Full name
                            <Input
                                placeholder="Your full name"
                                size="large"
                                value={state.fullname}
                                onChange={(e) => setState(prev => ({...prev, fullname: e.target.value}))}
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
                    </div>
                    <div className="w-full px-3 text-sm text-center flex flex-col gap-2">
                        <Button
                            size="large"
                            type="primary"
                            disabled={!state.email || !state.password || !state.fullname || !state.username}
                            onClick={handleSignUp}
                            loading={isPending}
                        >
                            Sign up
                        </Button>
                        <div>
                            Already have an account?&nbsp;
                            <span className="text-blue-500 hover:underline cursor-pointer">
                                <Link href={'/login'}>
                                    Log in
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;