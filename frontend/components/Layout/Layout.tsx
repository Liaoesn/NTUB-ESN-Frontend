import Head from "next/head";
import { useEffect, useState } from 'react';
import NavBar from "@/components/common/NavBar";
import styles from "@/styles/components/layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
  user?: { username: string, avatar_url: string } | undefined;
}

export default function Layout({ children, user }: LayoutProps) {
  const [userData, setUserData] = useState<{ username: string, avatar_url: string } | undefined>(user);
  
  const fetchUser = async () => {
    const res = await fetch('http://localhost:5000/api/auth/user', {
      credentials: 'include', // 確保發送請求時會附帶 cookie
    });
    if (res.ok) {
      const data = await res.json();
      setUserData(data.user);
    }
  };

  useEffect(() => {
    // 檢查用戶是否已經存在於狀態中
    if (!userData) {
      fetchUser();
    }
  }, []);

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
