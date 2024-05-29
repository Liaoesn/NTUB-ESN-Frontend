import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ProSidebarProvider } from 'react-pro-sidebar';
import '../styles/main.scss';
import Layout from '../components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/user');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    }
    fetchUser();
  }, []);

  return (
    <ProSidebarProvider>
      <Layout user={user}>
        <Component {...pageProps} />
      </Layout>
    </ProSidebarProvider>
  );
}
