"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem("user-token") : null;
        setToken(token);

        if (!token && pathname !== "/login" && pathname !== "/sign-up") {
            router.replace("/login");
        }
    }, [pathname, router]);

    // Handle the case where `token` is not yet determined
    if (token === null) {
        return null;
    }

    if (!token && pathname !== "/login" && pathname !== "/sign-up") {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;