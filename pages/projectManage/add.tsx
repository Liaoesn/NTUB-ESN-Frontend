import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/add.module.scss';
import React, { useState } from 'react';
import PrivateRoute from '../privateRoute';
import userI from '../../type/userI';
import ProjectName from '@/components/popup/addproject/addName';
import ProjectPeople from '@/components/popup/addproject/addPeople';
import ProjectChoose from '@/components/popup/addproject/addChoose';
import ProjectFile from '@/components/popup/addproject/addFile';
import ProjectTime from '@/components/popup/addproject/addTime';
import { FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/router';
import FailPopup from '@/components/popup/failPopup';
import { MdArrowLeft } from 'react-icons/md';
import axios from 'axios';
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
  const [type, setType] = useState('1');
  const handleSubmit = () => {
    if (college.length < 1 || projectName.length < 1 ){
      setPopupTitle('第一步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if (startDate.length < 1 || endDate.length < 1 ){
      setPopupTitle('第二步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if ( files == null ){
      setPopupTitle('第三步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if (people < 1 ){
      setPopupTitle('第四步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if ( type.length < 1 ){
      setPopupTitle('第五步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else {
      setShowPopup(true);
    }
    console.log([college,projectName,startDate,endDate,files,people,type])
    console.log({
      college,
      projectName,
      type,
      people,
      startDate,
      endDate,
    });
  };
  const [showName, setShowName] = React.useState(true);
  const [showTime, setShowTime] = React.useState(false);
  const [showFile, setShowFile] = React.useState(false);
  const [showPeople, setShowPeople] = React.useState(false);
  const [showChoose, setShowChoose] = React.useState(false);
  const [showLast, setShowLast] = React.useState(false);
  const popupNext = (popupName: string) => {
    switch (popupName) {
      case 'Name':
        setShowName(prev => !prev);
        setShowTime(prev => !prev);
        break;
      case 'Time':
        setShowTime(prev => !prev);
        setShowFile(prev => !prev);
        break;
      case 'File':
        setShowFile(prev => !prev);
        setShowPeople(prev => !prev);
        break;
      case 'People':
        setShowPeople(prev => !prev);
        setShowChoose(prev => !prev);
        break;
      case 'Chose':
        setShowChoose(prev => !prev);
        setShowLast(prev => !prev);
        break;
      default:
        break;
    }
  };
  const popupBack = (popupName: string) => {
    switch (popupName) {
      case 'Time':
        setShowName(prev => !prev);
        setShowTime(prev => !prev);
        break;
      case 'File':
        setShowTime(prev => !prev);
        setShowFile(prev => !prev);
        break;
      case 'People':
        setShowFile(prev => !prev);
        setShowPeople(prev => !prev);
        break;
      case 'Chose':
        setShowPeople(prev => !prev);
        setShowChoose(prev => !prev);
        break;
      case 'Last':
        setShowChoose(prev => !prev);
        setShowLast(prev => !prev);
        break;
      case 'ok':
        setShowChoose(prev => !prev);
        setShowLast(prev => !prev);
        break;
      default:
        break;
    }
  };

  const handelWaiting = (popupName: string) => {
    if (router.isReady) {
      popupNext(popupName)
    }
  }

  const onSubmit = () => {
    axios.post('/api/project/insert', {
      'proname': projectName,                  // 專案名稱
      'prodescription': college,     // 專案描述
      'startdate': new Date().toISOString().split('T')[0],             // 開始日期，格式 YYYY-MM-DD
      'phase1': startDate,                // 第一階段日期
      'enddate': endDate,               // 結束日期，格式 YYYY-MM-DD
      'userno': user?.userno,                     // 負責人的使用者編號
      'admissions': 30,                      // 錄取人數
      'share_type': type
    })
    .then(response => {
      console.log('專案新增成功:', response.data);
      router.push('/projectManage/list')
    })
    .catch(error => {
      console.error('新增專案時發生錯誤:', error);
    });
  }

  return (
    <>
      <Layout>
        <main className={styles.coverBg}>
          <section className={styles.projectForm}>
            {showName &&
              <ProjectName
                College={setCollege} ProjectName={setProjectName}
                CollegeValue={college as string} ProjectNameValue={projectName}
                onNext={() => handelWaiting('Name')} />}
            {showTime &&
              <ProjectTime
                StartTime={setStartDate} EndTime={setEndDate}
                StartTimeValue={startDate} EndTimeValue={endDate}
                onNext={() => popupNext('Time')}
                onBack={() => popupBack('Time')} />}
            {showFile &&
              <ProjectFile
                File={setFiles}
                onNext={() => popupNext('File')}
                onBack={() => popupBack('File')} />}
            {showPeople &&
              <ProjectPeople
                People={setPeople}
                onNext={() => popupNext('People')}
                onBack={() => popupBack('People')} />}
            {showChoose &&
              <ProjectChoose
                Type={setType}
                submit={handleSubmit}
                onNext={() => popupNext('Chose')}
                onBack={() => popupBack('Chose')}/>}
            {showLast && <div className={styles.popupBG}>
              <div className={styles.mainShow}>
                <section className={styles.title}>
                  <h4>結束設定</h4>
                </section>
                <section className={styles.inputArea}>
                  請確認都有完成輸入
                </section>
                <div className={styles.bottom}>
                  <a onClick={() => popupBack('ok')} className={styles.left}><MdArrowLeft /></a>
                  <a onClick={onSubmit} className={`${styles.button} ${styles.check}`} >
                    <FaCheck />
                  </a>
                </div>
              </div>
            </div>}
          { showPopup ? <FailPopup title={popupTitle}/> : '' }
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
