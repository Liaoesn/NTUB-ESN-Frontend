import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/user/aboutUer.module.scss';
import { FaMinusCircle } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrivateRoute from '../privateRoute';
import userI from '../../type/userI';
import DisableConfirm from '@/components/popup/confirmPopup';
import userInterface from '@/type/userInterface';

function AboutUser({ user }: { user: userI | undefined }) {
  const [userData, setUserData] = useState<userInterface>({
    user_no: 0,
    user_name: '',
    email: '',
    avatar_url: '',
    permissions: '',
    permissionsName: '',
    state: '',
    create_at: '',
  });

  const [showConfirm, setShowConfirm] = useState<Boolean>(false);
  const disableConfirmMsg = '確定要停用嗎?';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = '/api/user/data/' + user?.user_no;
        await axios.get(url, {
          // 這裡放參數

        }).then(response => {
          // 這裡處理結果
          console.log(response.data);
          setUserData(response.data)
        });
  
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    fetchData();
  }, []);

  const toggleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  }

  const disableUser = async () => {
    const url = '/api/user/update/' + user?.user_no;
    await axios.put(url, {
      state: "0"
    }).then((response) => {
      if(response.status == 200) {
        window.location.href="http://localhost:5000/api/auth/logout";
      }
    });
  };

  const logout = () => {
    window.location.href="http://localhost:5000/api/auth/logout";
  }

  function formatDate(temp: string) {
    var result = '';

    if(temp.length > 0 ) {
      const date = new Date(temp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是從 0 開始的
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      result = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }
    return result;
  }

  return (
    <Layout>
      {showConfirm && <DisableConfirm content={disableConfirmMsg} onConfirm={disableUser} onClose={toggleShowConfirm}/>}
      <main className={styles.area}>
        <div className={`${styles.header}`}>
          <div className={styles.userLogo}>
            <img src={userData.avatar_url} alt="User Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          </div>

          <div className={styles.userName}>
            <p>使用者名稱:&nbsp;{userData.user_name}</p>
          </div>
        </div>
        <section className={styles.dropdownArea}></section>
        <div className={`${styles.content}`}>
          <div className={`${styles.title}`}>
            <p>關於你</p>
          </div>

          <div className={`${styles.row}`}>
            <div className={`${styles.fieldCenter} ${styles.col55}`}>
              <div className={styles.label}>
                <p>使用者帳號:</p>
              </div>
              <div className={styles.value}>
                <p>{userData.email}</p>
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
                <p>{userData.permissionsName}</p>
              </div>
            </div>

            <div className={`${styles.fieldItem} ${styles.col2}`}>
              <div className={styles.label}>
                <p>註冊日期:</p>
              </div>
              <div className={styles.value}>
                <p>{formatDate(userData.create_at as string)}</p>
              </div>
            </div>

            <div className={`${styles.fieldButton}`} onClick={toggleShowConfirm}>
              <FaMinusCircle/>
            </div>
          </div>
        </div>
        <div className={`${styles.floor}`}>
          <label className={`${styles.logout}`} onClick={logout}>
            <a className={styles.linkLogout}>
              <p>登出</p>
            </a>
          </label>
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