import { useEffect, useState, createContext, useContext } from 'react';
import type { AppProps } from 'next/app';
import '../styles/main.scss';
import Layout from '../components/Layout/Layout';

interface User {
  user_name: string;
  avatar_url: string;
}

const UserContext = createContext<User | undefined>(undefined);

export const useUser = () => useContext(UserContext);

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/user', {
        credentials: 'include', // 確保發送請求時會附帶 cookie
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Layout user={user}>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}
