import Layout from '@/components/Layout/Layout';
import ProjectNamePopup from '@/components/popup/project/projectNamePopup';
import ProjectPeoplePopup from '@/components/popup/project/projectPeoplePopup';
import ProjectChoosePopup from '@/components/popup/project/projectChoosePopup';
import ProjectFilePopup from '@/components/popup/project/projectFilePopup';
import ProjectTimePopup from '@/components/popup/project/projectTimeSet';
import styles from '@/styles/page/project/seting.module.scss'
import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaPen, FaFolder, FaRegCalendarAlt } from "react-icons/fa";
import { useRouter } from 'next/router';
import userI from '@/pages/userI';
import PrivateRoute from '@/pages/privateRoute';

function ProjectEdit({ user }: { user: userI | undefined }) {
  const [year, setYear] = React.useState('');
  const [academic, setAcademic] = React.useState('');
  const router = useRouter();
  const [prono, setProno] = React.useState('');
  //PopupShowOut 各種Popup的值
  const [showName, setShowName] = React.useState(false);
  const [showPeople, setShowPeople] = React.useState(false);
  const [showChoose, setShowChoose] = React.useState(false);
  const [showFile, setShowFile] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { prono } = router.query;
      setProno(prono as string);
    }
  }, [router.isReady, router.query]);

  const handlePopup = (popupName: string) => {
    switch (popupName) {
      case 'Chose':
        setShowChoose(prev => !prev);
        break;
      case 'Name':
        setShowName(prev => !prev);
        break;
      case 'People':
        setShowPeople(prev => !prev);
        break;
      case 'File':
        setShowFile(prev => !prev);
        break;
      case 'Time':
        setShowTime(prev => !prev);
        break;
      default:
        break;
    }
  };


  return (
    <Layout user={user}>
      {showName && <ProjectNamePopup onClose={() => handlePopup('Name')} />}
      {showPeople && <ProjectPeoplePopup onClose={() => handlePopup('People')} />}
      {showChoose && <ProjectChoosePopup onClose={() => handlePopup('Chose')} />}
      {showFile && <ProjectFilePopup onClose={() => handlePopup('File')} />}
      {showTime && <ProjectTimePopup onClose={() => handlePopup('Time')} />}
      <main className={styles.listArea}>
        <h2>專案設定</h2>
        <section className={styles.aboutArea}>
          <div className={styles.setingList}>
            <div className={styles.content}>
              <h3>專案名稱</h3>
              <p>金美麗招生</p>
            </div>
            <a onClick={() => handlePopup('Name')}><FaPen /></a>
          </div>
          <div className={styles.setingList}>
            <div className={styles.contentShort}>
              <h3>學制</h3>
              <p>二技</p>
            </div>
            <a onClick={() => handlePopup('Name')}><FaPen /></a>
            <div className={styles.contentShort}>
              <h3>審核方式</h3>
              <p>全部分配</p>
            </div>
            <a onClick={() => handlePopup('Chose')}><FaPen /></a>
          </div>
          <div className={styles.setingList}>
            <div className={styles.contentShort}>
              <h3>資料數量</h3>
              <p>120筆</p>
            </div>
            <a onClick={() => handlePopup('File')}><FaFolder /></a>
            <div className={styles.contentShort}>
              <h3>錄取人數</h3>
              <p>20</p>
            </div>
            <a onClick={() => handlePopup('People')}><FaPen /></a>
          </div>
          <div className={styles.setingList}>
            <div className={styles.contentShort}>
              <h3>第一階段</h3>
              <p>2024/09/28</p>
            </div>
            <a onClick={() => handlePopup('Time')}><FaRegCalendarAlt /></a>
            <div className={styles.contentShort}>
              <h3>結束日期</h3>
              <p>2024/11/11</p>
            </div>
            <a onClick={() => handlePopup('Time')}><FaRegCalendarAlt /></a>
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
            <a onClick={() => router.push(`/projectManage/${prono}/teacher`)}><FaPen /></a>
          </div>
        </section>
        <section className={styles.setingButton}>
          <a className={`${styles.button} ${styles.check}`}><FaSignOutAlt /></a>
        </section>
      </main>
    </Layout>
  );
}
export default function Init() {
  const [user, setUser] = useState<userI>();

  return (
    <PrivateRoute>
      <ProjectEdit user={user} />
    </PrivateRoute>
  );
}