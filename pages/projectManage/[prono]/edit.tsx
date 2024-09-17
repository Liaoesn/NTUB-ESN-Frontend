import Layout from '@/components/Layout/Layout';
import ProjectNamePopup from '@/components/popup/project/projectNamePopup';
import ProjectPeoplePopup from '@/components/popup/project/projectPeoplePopup';
import ProjectChoosePopup from '@/components/popup/project/projectChoosePopup';
import ProjectFilePopuo from '@/components/popup/project/projectFilePopup';
import styles from '@/styles/page/project/seting.module.scss'
import { SelectChangeEvent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaCheck, FaPen, FaFolder } from "react-icons/fa";
import router, { useRouter } from 'next/router';

interface User {
  username: string;
  avatar_url: string;
}

function ProjectList({ user }: { user: User | undefined }) {
  const [year, setYear] = React.useState('');
  const [academic, setAcademic] = React.useState('');
  //PopupShowOut 各種Popup的值
  const [showName, setShowName] = React.useState(false);
  const [showPeople, setShowPeople] = React.useState(false);
  const [showChoose, setShowChoose] = React.useState(false);
  const [showFile, setShowFile] = React.useState(false);
  const router = useRouter();
  const { prono } = router.query;

  const handleChange = (event: SelectChangeEvent) => {

    if (event.target.name == 'year') {
      setYear(event.target.value);
    };
    if (event.target.name == 'academic') {
      setAcademic(event.target.value);
    };
  };
  
  const  handlePopup = ( popupName: string ) => {
    if (popupName == 'Chose') { 
      if (showChoose == true) {
        setShowChoose(false);
      } else {
        setShowChoose(true);
      }
    } else if (popupName == 'Name'){
      if (showName == true) {
        setShowName(false);
      } else {
        setShowName(true);
      }
    } else if (popupName == 'People'){
      if (showPeople == true) {
        setShowPeople(false);
      } else {
        setShowPeople(true);
      }
    } else if (popupName == 'File'){
      if (showFile == true) {
        setShowFile(false);
      } else {
        setShowFile(true);
      }
    }
  }

  return (
    <Layout user={user}>
      {showName && <ProjectNamePopup onClose={() => handlePopup('Name')} />}
      {showPeople && <ProjectPeoplePopup onClose={() => handlePopup('People')} />}
      {showChoose && <ProjectChoosePopup onClose={() => handlePopup('Chose')} />}
      {showFile && <ProjectFilePopuo onClose={() => handlePopup('File')} />}
      <main className={styles.listArea}>
        <h2>專案設定</h2>
        <section className={styles.aboutArea}>
            <div className={styles.setingList}>
                <div className={styles.content}>
                  <h3>專案名稱</h3>
                  <p>金美麗招生</p>
                </div>
                <a onClick={() => handlePopup('Name')}><FaPen/></a>
            </div>
            <div className={styles.setingList}>
                <div className={styles.contentShort}>
                  <h3>學制</h3>
                  <p>二技</p>
                </div>
                <a onClick={() => handlePopup('Name')}><FaPen/></a>
                <div className={styles.contentShort}>
                  <h3>學年</h3>
                  <p>113</p>
                </div>
                <a onClick={() => handlePopup('Name')}><FaPen/></a>
            </div>
            <div className={styles.setingList}>
                <div className={styles.contentShort}>
                  <h3>審核方式</h3>
                  <p>全部分配</p>
                </div>
                <a onClick={() => handlePopup('Chose')}><FaPen/></a>
                <div className={styles.contentShort}>
                  <h3>錄取人數</h3>
                  <p>20</p>
                </div>
                <a onClick={() => handlePopup('People')}><FaPen/></a>
            </div>
            <div className={styles.setingList}>
                <div className={styles.content}>
                  <h3>資料數量</h3>
                  <p>120筆</p>
                </div>
                <a onClick={() => handlePopup('File')}><FaFolder/></a>
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
                <a onClick={() => router.push(`/projectManage/${prono}/teacher`)}><FaPen/></a>
            </div>
        </section>
        <section className={styles.setingButton}>
          <a className={`${styles.button} ${styles.check}`}><FaCheck/></a>
          <a className={`${styles.button} ${styles.delete}`}><FaSignOutAlt/></a>
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