import { useEffect, useState } from 'react';
import { FaClock, FaFileAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from 'next/router';

import Layout from '../components/Layout/Layout';
import NavBar from '../components/common/NavBar';
import logo from '@/public/img/logo.png';
import styles from '@/styles/Home.module.scss';

interface User {
  name: string;
  picture: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/user');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        router.push('user/login'); // 如果沒有用戶登錄，導向登錄頁面
      }
    }
    fetchUser();
  }, []);

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
                <h3>觀看歷年專案</h3>
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
    ) : ('')}
  </Layout>

  );
}