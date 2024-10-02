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

function CreateProject({ user }: { user: userI | undefined }) {
  const router = useRouter();
  const [college, setCollege] = useState('碩士');
  const [projectName, setProjectName] = useState<string>('好棒棒');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [people, setPeople] = useState<number>(0);
  const [type, setType] = useState('');
  const handleSubmit = () => {
    console.log({
      college,
      projectName,
      type,
      people,
      startDate,
      endDate,
    });
  };
  //popup
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
      default:
        break;
    }
  };
  return (
    <>
      <Layout>
        <main className={styles.coverBg}>
          <section className={styles.projectForm}>
            {showName &&
              <ProjectName
                College={setCollege} ProjectName={setProjectName}
                CollegeValue={college as string} ProjectNameValue={projectName}
                onNext={() => popupNext('Name')} />}
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
                  已完成設定
                </section>
                <a onClick={() => router.push('/projectManage/10112')} className={`${styles.button} ${styles.check}`} >
                  <FaCheck />
                </a>
              </div>
            </div>}
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
