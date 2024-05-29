import { useEffect, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";

import Layout from '../components/Layout/Layout';
import NavBar from '../components/common/NavBar';
import logo from '@/public/img/logo.png'
import styles from '@/styles/Home.module.scss'

interface User {
  name: string;
  picture: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

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

  const handleGoogleLogin = () => {
    // 將這個URL發送給前端，用戶點擊後將重定向到Google登入頁面
    window.location.href = '/api/auth/login';
  };

  return (
  <Layout>
    {user ? (
      <>
        <NavBar user={user} />
        <main className={styles.login}>
        <Image src={logo} alt='logo' />
        </main>
      </>
    ) : (
      <main className={styles.login}>
        <Image src={logo} alt='logo' />
        <a className={styles.loginButtton} onClick={handleGoogleLogin}><FaGoogle/><p>請用學校帳號登入</p></a>
      </main>
    )}
  </Layout>

  );
}
