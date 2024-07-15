import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import CheckPopup from '@/components/popup/checkPopup';
import { useEffect, useState } from 'react';

interface User {
  username: string;
  avatar_url: string;
}

export default function LoginSuccess({ user }: { user: User | undefined }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <Layout user={user}>
      <CheckPopup title={'成功登入'} />
    </Layout>
  );
}
export function Home() {
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

}