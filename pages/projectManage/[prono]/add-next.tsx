import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/add-next.module.scss';
import React, { useState, useEffect } from 'react';
import { FaCheck, FaSignOutAlt, FaTimes } from "react-icons/fa"; // 引入確認、登出、取消的圖示
import { useRouter } from 'next/router'; // 使用 Next.js 的路由功能
import axios from 'axios'; // 用於進行 HTTP 請求
import CheckPopup from '@/components/popup/checkPopup'; // 引入確認彈出視窗
import { Bs1Circle, Bs2Circle  } from "react-icons/bs";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// 定義教師類型
type userType = {
  col_no?: string; // 教師編號
  user_no?: string; // 使用者編號
  user_name?: string; // 使用者名稱
  permissions?: string; // 權限
}

// SetTeacher 組件，負責設置協作老師
export default function SetTeacher() {

  const router = useRouter();
  const { prono } =router.query;
  const [changeUser, setChangeUser] = useState<string[]>([]); // 儲存被選擇的協作老師 ID
  const [users, setUsers] = useState<userType[]>(); // 儲存所有可選擇的老師
  const [showPopup, setShowPopup] = useState(false); // 控制彈出視窗顯示
  const [type, setType] = useState('');

  // 在組件加載時取得專案數據
  useEffect(() => {
    if (router.isReady) {
      const fetchProjectData = async () => {
        try {
          const response = await axios.get(`/api/project/insert/search/teacher`);

          setUsers(response.data.teacherDB[0]);
        } catch (error) {
          console.error('取得專案資料時出錯:', error);
        }
      };

      fetchProjectData(); // 呼叫函數取得資料
    }
  }, [router]);

  console.log(users)

  // 處理當選擇框狀態變更時的邏輯
  const handleCheckboxChange = (teacherID: string) => {
    setChangeUser(prev =>
      prev.includes(teacherID)
        ? prev.filter(id => id !== teacherID) // 如果已選，則從列表移除
        : [...prev, teacherID] // 如果未選，則將該教師 ID 加入列表
    );
  };

  const handSubmit = async () => {
    try {

      console.log({
        'pro_no': prono,
        'col_no': changeUser,
        'teachersPerStudent' : type,
      }
      )
        const response = await axios.post('/api/project/assign', {
          'pro_no': prono,
          'col_no': changeUser,
          'teachersPerStudent' : type,
        });
        console.log('成功回應:', response.data);
      } catch (error) {
        console.error('未知錯誤');
      }
  }

  return (
    <Layout> {/* 使用 Layout 組件，傳入使用者 */}
      {showPopup && <CheckPopup title={'成功修改'} />} {/* 如果顯示彈出視窗，顯示成功提示 */}
      <main className={styles.teacherArea}>
        <h2>新增專案設定 - (注意確認後不可修改)</h2> {/* 頁面標題 */}
        <p className={styles.itemName}><Bs1Circle />&ensp;選擇協作導師</p>
        <section className={styles.allArea}>
          {users?.map((teacher, index) => (
            <div key={index} className={styles.nameArea}>
              <input
                type="checkbox"
                id={`checkbox-${index}`} // 為每個選擇框指定唯一的 ID
                checked={changeUser.includes(teacher.user_no as string)} // 判斷是否已選擇
                onChange={() => handleCheckboxChange(teacher.user_no as string)} // 點擊時觸發變更
              />
              <label htmlFor={`checkbox-${index}`} className={`${styles.name}
               ${changeUser.includes(teacher.user_no as string) ? styles.colorTRUE : styles.colorFALSE}`}>
                {changeUser.includes(teacher.user_no as string) ? <FaTimes /> : ''} {/* 如果選擇，顯示取消圖示 */}
                {teacher.user_name} {/* 顯示老師的名字 */}
              </label>
            </div>
          ))}
        </section>
        <section className={styles.chooseArea}>
          <h5>已選擇教師: {changeUser.length} 位</h5> {/* 顯示已選擇的教師數量 */}
        </section>
        <p className={styles.itemName}><Bs2Circle />&ensp;選擇分享資料方式</p>
        <section className={styles.typeArea}>
          <FormControl className={styles.input}>
            <InputLabel id="demo-simple-select-label">分配類型</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="academic"
              name="academic"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={changeUser.length}>全部</MenuItem>
              {changeUser.length >= 3 ? changeUser.map((user, index) => (
                    index+1 >= 3 ?
                    <MenuItem key={index} value={index+1}>
                    一位學生至會分散給{index+1}位老師做評分
                    </MenuItem> : ''
                )) : ''}
            </Select>
          </FormControl>
        </section>
        <section className={styles.setingButton}>
          <a className={`${styles.button} ${styles.check}`}
           onClick={handSubmit}
           ><FaCheck /></a> {/* 確認按鈕 */}
        </section>
      </main>
    </Layout>
  );
}