import { useEffect, useState } from "react";
import { auth } from "@/core/firebase";
import { User } from "@/types";
import api from "@/service";

const useAuth = (): { user: User | null; loading: boolean } => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                try {
                    const response = await api.get<User>(
                        `/api/user?id=${authUser.uid}`
                    );
                    const userData = response.data;
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
};

export default useAuth;