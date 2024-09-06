import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
    username: string;
    avatar_url: string;
}

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/auth/user');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    router.push('/user/login'); // 如果沒有用戶登錄，導向登錄頁面
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                router.push('/user/login');
            }
        }
        fetchUser();
    }, [router]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return <>{children}</>;
};

export default PrivateRoute;