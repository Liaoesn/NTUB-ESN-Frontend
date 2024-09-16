import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/user/aboutUer.module.scss';
import { FaMinusCircle } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrivateRoute from '../privateRoute';
import userI from '../userI';
import userInterface from './userInterface';


function AboutUser({ user }: { user: userI | undefined }) {
  const [userData, setUserData] = useState<userInterface>({
    userno: 0,
    username: '',
    email: '',
    avatar_url: '',
    permissions: '',
    permissionsName: '',
    state: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = '/api/user/data/' + user?.userno;
        await axios.get(url, {
          // 這裡放參數

        }).then(response => {
          // 這裡處理結果
          console.log(response.data);
          setUserData(response.data);
        });
  
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Layout>
      <main className={styles.area}>
        <div className={`${styles.header}`}>
          <div className={styles.userLogo}>
            <img src={userData.avatar_url} alt="User Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          </div>

          <div className={styles.userName}>
            <p>使用者帳號:&nbsp;{userData.username}</p>
          </div>
        </div>
        <section className={styles.dropdownArea}></section>

        <div className={`${styles.title}`}>
          <p>關於你</p>
        </div>

        <div className={`${styles.row}`}>
          <div className={`${styles.fieldCenter} ${styles.col55}`}>
            <div className={styles.label}>
              <p>使用者帳號:</p>
            </div>
            <div className={styles.value}>
              <p>10956029@ntub.edu.tw</p>
            </div>
          </div>

          <div className={`${styles.fieldItem}`}>
            <div className={styles.label}>
              <p>登入狀態:</p>
            </div>
            <div className={styles.value}>
              <p>GOOGLE</p>
            </div>
          </div>
        </div>
        <div className={`${styles.row}`}>
          <div className={`${styles.fieldItem}`}>
            <div className={styles.label}>
              <p>系統權限:</p>
            </div>
            <div className={styles.value}>
              <p>助教</p>
            </div>
          </div>

          <div className={`${styles.fieldItem} ${styles.col2}`}>
            <div className={styles.label}>
              <p>註冊日期:</p>
            </div>
            <div className={styles.value}>
              <p>2024/00/00</p>
            </div>
          </div>

          <div className={`${styles.fieldButton}`}>
            <FaMinusCircle/>
          </div>
        </div>
      </main>
    </Layout>
  );
}
export default function Init() {
  const [user, setUser] = useState<userI>();

  return (
    <PrivateRoute>
      <AboutUser user={user} />
    </PrivateRoute>
  );
}