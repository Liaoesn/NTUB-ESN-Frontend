import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/user/about.module.scss'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface User {
  username: string;
  avatar_url: string;
}

export default function about({ user }: { user: User | undefined }) {
  return (
    <Layout user={user}>
      <main className={styles.main}>
        <div>
            <img></img>
            <div>
                <p>使用者名稱：</p>
                <p>ESN</p>
            </div>
        </div>
      </main>
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

  return user ? <ProjectList user={user} /> : <p>Loading...</p>;
}