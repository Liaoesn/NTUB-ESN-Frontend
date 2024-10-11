import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/teacher.module.scss'
import React, { useState, useEffect } from 'react';
import { FaCheck, FaSignOutAlt,FaTimes } from "react-icons/fa";
import { useRouter } from 'next/router';
import PrivateRoute from '@/pages/privateRoute';
import userI from '@/type/userI';
import axios from 'axios';
import CheckPopup from '@/components/popup/checkPopup';

type userType = {
  colno?:string;
  userno?:string;
  username?:string;
  permissions?:string;
}

function SetTeacher({ user }: { user: userI | undefined }) {

  const router = useRouter();
  const { prono } = router.query;
  const [ready,setReady] = useState<{ready:userType[]}>();
  const [changeUser,setChangeUser] = useState<string[]>([]);
  const [users,setUsers] = useState<{teacherDB:userType[]}>();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/project/update/search/teacher`, {
          params: { prono }
        });

        setReady(response.data[0])
        setChangeUser(readyID(response.data[0]))
        setUsers(response.data[1])
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    setChangeUser(readyID(ready as {ready:userType[]}))
    fetchProjectData();
  }, [prono,]);


  const readyID = ( data: {ready:userType[]}) => {
   const readyList: string[] = [];
   data ?
    data.ready.map((readys, index) => (
      readyList.push(readys.userno as string)
    )) : ''
    return readyList;
  }

  const handleCheckboxChange = (teacherID: string) => {
    setChangeUser(prev => 
      prev.includes(teacherID)
        ? prev.filter(id => id !== teacherID) 
        : [...prev, teacherID]                
    );
  };

  const handSubmit = async () => {
    try {
      await axios.post(`/api/project/update/update/teacher`, {
        changeUser
      }, {
        params: { prono }
      });
  
      // 顯示成功訊息 3 秒
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        // 3 秒後跳轉頁面
        router.push(`/projectManage/${prono}/edit`);
      }, 3000);
      
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };
  
  return (
    <Layout user={user}>

      {showPopup && <CheckPopup title={'成功修改'} />}
      <main className={styles.teacherArea}>
        <h2>編輯專案 - 選擇協作老師</h2>
        <div className={styles.allArea}>
          {users?.teacherDB.map((teacher, index) => (
            <div key={index} className={styles.nameArea}>
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={changeUser.includes(teacher.userno as string)}
                onChange={() => handleCheckboxChange(teacher.userno as string)} // 使用 onChange
              />
              <label htmlFor={`checkbox-${index}`} className={`${styles.name}
               ${changeUser.includes(teacher.userno as string) ? styles.colorTRUE : styles.colorFALSE}`}>
                {changeUser.includes(teacher.userno as string) ? <FaTimes /> : ''}
                {teacher.username}
              </label>
            </div>
          ))}
        </div>
        <section className={styles.chooseArea}>
          <p>建議選擇教師人數:5位</p>
          <h5>已選擇教師:{changeUser.length}位</h5>
          <h6>每位教師分配學生:{changeUser.length}位</h6>
        </section>
        <section className={styles.setingButton}>
          <a className={`${styles.button} ${styles.check}`} onClick={handSubmit}><FaCheck /></a>
          <a onClick={() => router.push(`/projectManage/${prono}/edit`)} className={`${styles.button} ${styles.delete}`}><FaSignOutAlt /></a>
        </section>
      </main>
    </Layout>
  );  
}
export default function Init() {
  const [user, setUser] = useState<userI>();

  return (
    <PrivateRoute>
      <SetTeacher user={user} />
    </PrivateRoute>
  );
}