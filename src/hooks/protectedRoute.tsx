"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    validRoutes: string[];
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [token, setToken] = useState<string | null>(null);

    const validRoutes = ['/login', '/sign-up', '/newsfeed'];

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem("user-token") : null;
        setToken(token);

        if (token && (pathname === "/login" || pathname === "/sign-up")) {
            router.replace("/newsfeed");
        } else if (!token && pathname !== "/login" && pathname !== "/sign-up") {
            router.replace("/login");
        } else if (!validRoutes.includes(pathname) && !pathname.startsWith('/post/')) {
            router.replace("/newsfeed");
        }
    }, [pathname, router, token, validRoutes]);

    if (!token && pathname !== "/login" && pathname !== "/sign-up") {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;