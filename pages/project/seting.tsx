import Layout from '@/components/Layout/Layout';
import ProjectNamePopup from '@/components/popup/projectNamePopup';
import ProjectPeoplePopup from '@/components/popup/projectPeoplePopup';
import styles from '@/styles/page/project/seting.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FaRegTrashAlt, FaCheck, FaPen, FaFolder } from "react-icons/fa";
import { useRouter } from 'next/router';

interface User {
  username: string;
  avatar_url: string;
}

function ProjectList({ user }: { user: User | undefined }) {
  const [year, setYear] = React.useState('');
  const [academic, setAcademic] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);
  const [showPopup1, setShowPopup1] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {

    if (event.target.name == 'year') {
      setYear(event.target.value);
    };
    if (event.target.name == 'academic') {
      setAcademic(event.target.value);
    };
  };
  
  const handleCheckClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  //審核方式錄取人數
  const handleCheckClick1 = () => {
    setShowPopup1(true);
  };

  const handleClosePopup1 = () => {
    setShowPopup1(false);
  };

  return (
    <Layout user={user}>
      {showPopup && <ProjectNamePopup onClose={handleClosePopup} />}
      {showPopup1 && <ProjectPeoplePopup onClose={handleClosePopup1} />}
      <main className={styles.listArea}>
        <h2>專案設定</h2>
        <section className={styles.aboutArea}>
            <div className={styles.setingList}>
                <div className={styles.content}>
                  <h3>專案名稱</h3>
                  <p>金美麗招生</p>
                </div>
                <a onClick={handleCheckClick}><FaPen/></a>
            </div>
            <div className={styles.setingList}>
                <div className={styles.contentShort}>
                  <h3>學制</h3>
                  <p>二技</p>
                </div>
                <a onClick={handleCheckClick}><FaPen/></a>
                <div className={styles.contentShort}>
                  <h3>學年</h3>
                  <p>113</p>
                </div>
                <a onClick={handleCheckClick}><FaPen/></a>
            </div>
            <div className={styles.setingList}>
                <div className={styles.contentShort}>
                  <h3>審核方式</h3>
                  <p>全部分配</p>
                </div>
                <a onClick={handleCheckClick1}><FaPen/></a>
                <div className={styles.contentShort}>
                  <h3>錄取人數</h3>
                  <p>20</p>
                </div>
                <a onClick={handleCheckClick1}><FaPen/></a>
            </div>
            <div className={styles.setingList}>
                <div className={styles.content}>
                  <h3>資料數量</h3>
                  <p>120筆</p>
                </div>
                <a><FaFolder/></a>
            </div>
            <div className={styles.setingTeacher}>
                <div className={styles.contentTeacher}>
                  <h3>協作老師</h3>
                  <div>
                    <p>葉明貴</p>
                    <p>葉明貴</p>
                    <p>葉明貴</p>
                  </div>
                </div>
                <a onClick={handleCheckClick}><FaPen/></a>
            </div>
        </section>
        <section className={styles.setingButton}>
          <a className={`${styles.button} ${styles.check}`}><FaCheck/></a>
          <a className={`${styles.button} ${styles.delete}`}><FaRegTrashAlt/></a>
        </section>
      </main>
    </Layout>
  );
}
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push('/user/login'); // 如果沒有用戶登錄，導向登錄頁面
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/user/login');
      }
    }
    fetchUser();
  }, [router]);

  return user ? <ProjectList user={user} /> : <p>Loading...</p>;
}