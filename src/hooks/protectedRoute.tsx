"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const token = localStorage.getItem("user-token");

    useEffect(() => {
        if (!token && pathname !== "/login" && pathname !== "/sign-up") {
            router.replace("/login");
        }
    }, [token, pathname, router]);

    if (!token && pathname !== "/login" && pathname !== "/sign-up") {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
