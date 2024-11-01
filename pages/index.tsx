import { useEffect, useState } from 'react';
import { FaClock, FaFileAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from 'next/router';

import Layout from '../components/Layout/Layout';
import NavBar from '../components/common/NavBar';
import logo from '@/public/img/logo.png';
import styles from '@/styles/Home.module.scss';

interface User {
  user_name: string;
  avatar_url: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    const res = await fetch('/api/auth/user', {
      credentials: 'include', // 確保發送請求時會附帶 cookie
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data.user);
      setUser(data.user);
    } else {
      router.push('/user/login'); // 如果沒有用戶登錄，導向登錄頁面
    }
  };

  useEffect(() => {
    // 檢查用戶是否已經存在於狀態中
    if (!user) {
      fetchUser();
    }
  }, [user]); // 當 `user` 狀態變化時觸發

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
            <div onClick={() => router.push('/projectManage/list')} className={styles.listButton}>
              <article>
                <h3>{user.user_name}的專案</h3>
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