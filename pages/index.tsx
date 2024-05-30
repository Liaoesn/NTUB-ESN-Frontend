import { useEffect, useState } from 'react';
import { FaGoogle, FaClock, FaFileAlt } from "react-icons/fa";
import Image from "next/image";

import Layout from '../components/Layout/Layout';
import NavBar from '../components/common/NavBar';
import logo from '@/public/img/logo.png'
import styles from '@/styles/Home.module.scss'
import { GetServerSidePropsContext } from 'next';
import router from 'next/router';

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
        <main className={styles.mainPage}>
          <Image src={logo} alt='logo' />
          <section className={styles.banner}>
            <div onClick={() => router.push('/project/list')} className={styles.yearButton}>
              <article>
                <h3>關看歷年專案</h3>
                <p>歷年的書審狀況、辦法、結果、人數...都在這裡了</p>
              </article>
              <FaClock className={styles.buttonIcon} />
            </div>
            <div onClick={() => router.push('/project/manageList')} className={styles.listButton}>
              <article>
                <h3>{user.name}的專案</h3>
                <p>您建立或是參與的書審專案</p>
              </article>
              <FaFileAlt className={styles.buttonIcon} />
            </div>
          </section>
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

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const res = await fetch('http://localhost:3000/api/auth/user', {
    headers: {
      cookie: req.headers.cookie ?? '',
    },
  });
  const user = res.ok ? await res.json() : null;

  return {
    props: {
      user,
    },
  };
}
