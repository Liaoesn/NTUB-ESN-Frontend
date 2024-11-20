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
import PrivateRoute from '@/pages/privateRoute';
import userI from '@/type/userI';
import axios from 'axios';

type projectProp = {
  pro_no: string;
  pro_name: string;
  share_type: string;
  pro_academic: string;
  phase1: string;
  end_date: string;
  admissions: number;
}

function ProjectEdit({ user }: { user: userI | undefined }) {
  const router = useRouter();
  const { prono } = router.query;
  const [projectData, setProjectData] = useState<projectProp>();
  const [showName, setShowName] = React.useState(false);
  const [showPeople, setShowPeople] = React.useState(false);
  const [showChoose, setShowChoose] = React.useState(false);
  const [showFile, setShowFile] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);
  const [fileNumber, setFileNumber] = useState<{total_students:''}>();
  const [teachers, setTeachers] = useState<{teachers:[{username:string}]}>();
  const [sdate, setSDate] = useState<string>();
  const [edate, setEDate] = useState<string>();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/project/update/:prono`, {
          params:{prono}
        });

        setProjectData(response.data[0]);
        setFileNumber(response.data[1]);
        setTeachers(response.data[2]);
        setSDate(`
          ${new Date(response.data[0].phase1).getUTCFullYear()}/
          ${new Date(response.data[0].phase1).getUTCMonth()+1}/
          ${new Date(response.data[0].phase1).getUTCDate()+1}
        `);
        setEDate(`
          ${new Date(response.data[0].end_date).getUTCFullYear()}/
          ${new Date(response.data[0].end_date).getUTCMonth()+1}/
          ${new Date(response.data[0].end_date).getUTCDate()+1}
        `);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [prono, router]);

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
      {showName && <ProjectNamePopup prono={prono?.toString()} oldselet={projectData?.pro_academic} oldtitle={projectData?.pro_name } onClose={() => handlePopup('Name')} />}
      {showPeople && <ProjectPeoplePopup prono={prono?.toString()} oldNumber={projectData?.admissions} onClose={() => handlePopup('People')} />}
      {showChoose && <ProjectChoosePopup prono={prono?.toString()} oldType={projectData?.share_type} onClose={() => handlePopup('Chose')} />}
      {showFile && <ProjectFilePopup onClose={() => handlePopup('File')} />}
      {showTime && <ProjectTimePopup oldSDate={new Date(projectData?.phase1 as string)} oldEDate={new Date(projectData?.end_date as string)} prono={prono?.toString()} onClose={() => handlePopup('Time')} />}
      <main className={styles.listArea}>
        <h2>專案設定</h2>
        <section className={styles.aboutArea}>
          <div className={styles.setingList}>
            <div className={styles.content}>
              <h3>專案名稱</h3>
              <p>{projectData ? projectData.pro_name : "Loading..."}</p>
            </div>
            <a onClick={() => handlePopup('Name')}><FaPen /></a>
          </div>
          <div className={styles.setingList}>
            <div className={styles.contentShort}>
              <h3>錄取人數</h3>
              <p>{projectData ? projectData.admissions : "Loading..."}</p>
            </div>
            <a onClick={() => handlePopup('People')}><FaPen /></a>
            <div className={styles.contentShort}>
              <h3>學制</h3>
              <p>{projectData ? projectData.pro_academic : "Loading..."}</p>
            </div>
            <a onClick={() => handlePopup('')}><FaPen /></a>
          </div>
          <div className={styles.setingList}>
            <div className={styles.contentShort}>
              <h3>第一階段</h3>
              <p>{sdate}</p>
            </div>
            <a onClick={() => handlePopup('Time')}><FaRegCalendarAlt /></a>
            <div className={styles.contentShort}>
              <h3>結束日期</h3>
              <p>{edate}</p>
            </div>
            <a onClick={() => handlePopup('Time')}><FaRegCalendarAlt /></a>
          </div>
          <div className={styles.setingList}>
            <div className={styles.showOnly}>
              <h3>資料數量</h3>
              <p>{fileNumber ? fileNumber.total_students : "Loading..."}</p>
            </div>
          </div>
          <div className={styles.setingTeacher}>
            <div className={styles.contentTeacher}>
              <h3>協作老師</h3>
              <div>
                {teachers ? teachers?.teachers.map((teacher, index) => (
                  <p key={index}>{teacher.username}</p>)) : "Loading..."}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.setingButton}>
          <a className={`${styles.button} ${styles.check}`} onClick={() => router.push('/projectManage/list')}><FaSignOutAlt /></a>
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