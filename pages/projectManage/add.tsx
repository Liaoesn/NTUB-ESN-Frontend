import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/add.module.scss';
import React, { useState } from 'react';
import PrivateRoute from '../privateRoute';
import userI from '../../type/userI';
import { FaCheck, FaFolder, FaPen, FaRegCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import FailPopup from '@/components/popup/failPopup';
import { MdArrowLeft } from 'react-icons/md';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
function CreateProject({ user }: { user: userI | undefined }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('')
  const router = useRouter();
  const [college, setCollege] = useState('');
  const [projectName, setProjectName] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [people, setPeople] = useState<number>(0);
  const [type, setType] = useState('');

  const handleSubmit = () => {
    if (college.length < 1 || projectName.length < 1) {
      setPopupTitle('第一步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if (startDate.length < 1 || endDate.length < 1) {
      setPopupTitle('第二步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if (files == null) {
      setPopupTitle('第三步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if (people < 1) {
      setPopupTitle('第四步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if (type.length < 1) {
      setPopupTitle('第五步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else {
      setShowPopup(true);
    }
    console.log([college, projectName, startDate, endDate, files, people, type])
    console.log({
      college,
      projectName,
      type,
      people,
      startDate,
      endDate,
    });
  };
  return (
    <>
      <Layout>
        <main className={styles.addArea}>
          <h2>新曾專案</h2>
          <section className={styles.add}>
            <div className={styles.setingArea}>
              <Autocomplete
                sx={{ m: 2, height:'54px', backgroundColor: '#e0f7fa', borderRadius: '25px'}}
                className={styles.addInput}
                id="free-solo-demo"
                freeSolo options={[]}
                value={projectName}
                onInputChange={(e) => setProjectName}
                renderInput={(params) => <TextField className={styles.addInput} {...params} label="輸入專案名稱" />}
              />
            </div>
            <div className={styles.setingList}>
              <div className={styles.contentShort}>
                <h3>學制</h3>
                {/* <p>{projectData ? projectData.prodescription : "Loading..."}</p> */}
              </div>
              <a
              //  onClick={() => handlePopup('Name')}
              ><FaPen /></a>
              <div className={styles.contentShort}>
                <h3>審核方式</h3>
                {/* <p>{projectData ? projectData.share_type == '1' ? '全部分配' : '平均分配' : "Loading..."}</p> */}
              </div>
              <a
              //  onClick={() => handlePopup('Chose')}
              ><FaPen /></a>
            </div>
            <div className={styles.setingList}>
              <div className={styles.contentShort}>
                <h3>資料數量</h3>
                {/* <p>{fileNumber ? fileNumber.total_students : "Loading..."}</p> */}
              </div>
              <a
              //  onClick={() => handlePopup('File')}
              ><FaFolder /></a>
              <div className={styles.contentShort}>
                <h3>錄取人數</h3>
                {/* <p>{projectData ? projectData.admissions : "Loading..."}</p> */}
              </div>
              <a
              //  onClick={() => handlePopup('People')}
              ><FaPen /></a>
            </div>
            <div className={styles.setingList}>
              <div className={styles.contentShort}>
                <h3>第一階段</h3>
                <p>2024/09/28</p>
              </div>
              <a
              //  onClick={() => handlePopup('Time')}
              ><FaRegCalendarAlt /></a>
              <div className={styles.contentShort}>
                <h3>結束日期</h3>
                <p>2024/11/11</p>
              </div>
              <a
              //  onClick={() => handlePopup('Time')}
              ><FaRegCalendarAlt /></a>
            </div>
          </section>
          <section className={styles.setingButton}>
            <a className={`${styles.button} ${styles.check}`}><FaSignOutAlt /></a>
          </section>
        </main>
      </Layout>
    </>
  );
}

export default function Init() {
  const [user, setUser] = useState<userI>();

  return (
    <PrivateRoute>
      <CreateProject user={user} />
    </PrivateRoute>
  );
}
