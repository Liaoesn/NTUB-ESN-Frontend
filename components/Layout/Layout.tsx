import Head from "next/head";
import { useEffect, useState } from 'react';
import NavBar from "@/components/common/NavBar";
import styles from "@/styles/components/layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
  user?: { name: string, picture: string } | undefined;
}

export default function Layout({ children, user }: LayoutProps) {
  const [userData, setUserData] = useState<{ name: string, picture: string } | undefined>(user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/user');
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    };

    fetchUser();
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/login';
  };

  return (
    <>
      <Head>
        <title>履人</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="NTUB IMD ESN" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar user={userData} />
      <div className={styles.layout}>
        {children}
      </div>
    </>
  );
}
