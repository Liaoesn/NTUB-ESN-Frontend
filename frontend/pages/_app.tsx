import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ProSidebarProvider } from 'react-pro-sidebar';
import '../styles/main.scss';
import Layout from '../components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(undefined);


  const fetchUser = async () => {
    const res = await fetch('http://localhost:5000/api/auth/user', {
      credentials: 'include', // 確保發送請求時會附帶 cookie
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  };

  useEffect(() => {
    // 檢查用戶是否已經存在於狀態中
    if (!user) {
      fetchUser();
    }
  }, []); 

  return (
    <ProSidebarProvider>
      <Layout user={user}>
        <Component {...pageProps} />
      </Layout>
    </ProSidebarProvider>
  );
}
