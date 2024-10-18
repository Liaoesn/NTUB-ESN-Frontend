import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/teacher.module.scss';
import React, { useState, useEffect } from 'react';
import { FaCheck, FaSignOutAlt, FaTimes } from "react-icons/fa"; // 引入確認、登出、取消的圖示
import { useRouter } from 'next/router'; // 使用 Next.js 的路由功能
import axios from 'axios'; // 用於進行 HTTP 請求
import CheckPopup from '@/components/popup/checkPopup'; // 引入確認彈出視窗

// 定義教師類型
type userType = {
  colno?: string; // 教師編號
  userno?: string; // 使用者編號
  username?: string; // 使用者名稱
  permissions?: string; // 權限
}

// SetTeacher 組件，負責設置協作老師
export default function SetTeacher() {

  const router = useRouter(); // 使用 Next.js 的路由功能
  const { prono } = router.query; // 取得路由參數中的專案編號
  const [ready, setReady] = useState<{ ready: userType[] }>(); // 用來儲存已選擇的協作老師
  const [changeUser, setChangeUser] = useState<string[]>([]); // 儲存被選擇的協作老師 ID
  const [users, setUsers] = useState<{ teacherDB: userType[] }>(); // 儲存所有可選擇的老師
  const [showPopup, setShowPopup] = useState(false); // 控制彈出視窗顯示

  // 在組件加載時取得專案數據
  useEffect(() => {
    if (router.isReady){
      const fetchProjectData = async () => {
        try {
          // 發送 GET 請求，取得該專案的教師資料
          const response = await axios.get(`/api/project/update/search/teacher`, {
            params: { prono }
          });

          // 設定已選擇的老師和所有老師資料
          setReady(response.data[0]);
          setChangeUser(readyID(response.data[0]));
          setUsers(response.data[1]);
        } catch (error) {
          console.error('取得專案資料時出錯:', error);
        }
      };

      setChangeUser(readyID(ready as { ready: userType[] })); // 將已選老師的 ID 設定到 state
      fetchProjectData(); // 呼叫函數取得資料
    }
  }, [prono]);

  // 取得已選擇的老師 ID 列表
  const readyID = (data: { ready: userType[] }) => {
    const readyList: string[] = [];
    data ?
      data.ready.map((readys, index) => (
        readyList.push(readys.userno as string) // 將每位已選老師的 userno 加入列表
      )) : '';
    return readyList;
  };

  // 處理當選擇框狀態變更時的邏輯
  const handleCheckboxChange = (teacherID: string) => {
    setChangeUser(prev =>
      prev.includes(teacherID)
        ? prev.filter(id => id !== teacherID) // 如果已選，則從列表移除
        : [...prev, teacherID] // 如果未選，則將該教師 ID 加入列表
    );
  };

  // 處理提交按鈕的點擊事件
  const handSubmit = async () => {
    try {
      // 發送 POST 請求，將已選的老師提交到伺服器
      await axios.post(`/api/project/update/update/teacher`, {
        changeUser
      }, {
        params: { prono }
      });
      setShowPopup(true); // 顯示提交成功的彈出視窗
      setTimeout(() => {
        setShowPopup(false); // 3 秒後關閉彈出視窗
        router.push(`/projectManage/list`); // 3 秒後跳轉到編輯專案頁面
      }, 3000);

    } catch (error) {
      console.error('提交專案資料時出錯:', error);
    }
  };

  return (
    <Layout> {/* 使用 Layout 組件，傳入使用者 */}
      {showPopup && <CheckPopup title={'成功修改'} />} {/* 如果顯示彈出視窗，顯示成功提示 */}
      <main className={styles.teacherArea}>
        <h2>編輯專案 - 選擇協作老師</h2> {/* 頁面標題 */}
        <div className={styles.allArea}>
          {users?.teacherDB.map((teacher, index) => (
            <div key={index} className={styles.nameArea}>
              <input
                type="checkbox"
                id={`checkbox-${index}`} // 為每個選擇框指定唯一的 ID
                checked={changeUser.includes(teacher.userno as string)} // 判斷是否已選擇
                onChange={() => handleCheckboxChange(teacher.userno as string)} // 點擊時觸發變更
              />
              <label htmlFor={`checkbox-${index}`} className={`${styles.name}
               ${changeUser.includes(teacher.userno as string) ? styles.colorTRUE : styles.colorFALSE}`}>
                {changeUser.includes(teacher.userno as string) ? <FaTimes /> : ''} {/* 如果選擇，顯示取消圖示 */}
                {teacher.username} {/* 顯示老師的名字 */}
              </label>
            </div>
          ))}
        </div>
        <section className={styles.chooseArea}>
          <p>建議選擇教師人數: 5 位</p> {/* 提示建議選擇的教師人數 */}
          <h5>已選擇教師: {changeUser.length} 位</h5> {/* 顯示已選擇的教師數量 */}
          <h6>每位教師分配學生: {changeUser.length} 位</h6> {/* 顯示每位教師分配的學生數量 */}
        </section>
        <section className={styles.setingButton}>
          <a className={`${styles.button} ${styles.check}`} onClick={handSubmit}><FaCheck /></a> {/* 確認按鈕 */}
          <a onClick={() => router.push(`/projectManage/${prono}/edit`)} className={`${styles.button} ${styles.delete}`}><FaSignOutAlt /></a> {/* 取消按鈕 */}
        </section>
      </main>
    </Layout>
  );
}