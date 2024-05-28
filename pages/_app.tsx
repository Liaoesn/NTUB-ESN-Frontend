import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ProSidebarProvider } from 'react-pro-sidebar';
import '../styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

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
      <Component {...pageProps} user={user} />
    </ProSidebarProvider>
  );
}
