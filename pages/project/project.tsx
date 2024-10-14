import router from 'next/router'; // 引入 Next.js 的路由功能
import projectInterface from '../../type/projectinterface'; // 引入專案的 TypeScript 介面
import styles from '@/styles/page/project/list.module.scss'; // 引入樣式
import { useEffect, useState } from 'react'; // 從 React 中引入 useEffect 和 useState hook

// 定義接收的屬性介面
interface proProps {
  project: projectInterface; // 專案屬性，類型為 projectInterface
}

function Project({ project }: proProps) {
  const [edate, setEdata] = useState<Date>(); // 宣告一個 state 來存放專案的結束日期
  const [proItem, setProItem] = useState<projectInterface>(); // 宣告一個 state 來存放專案資料
  
  // 使用 useEffect 來監聽 project 的變化
  useEffect(() => {
    // 當 router 準備好後執行
    if (router.isReady) {
      // 如果 project 存在，則將專案資料設定到 state
      if (project) {
        setEdata(new Date(project?.enddate)); // 將結束日期轉換為 Date 物件並設定
        setProItem(project); // 將 project 設定到 proItem
      } else {
        console.log('No project found in query.'); // 如果沒有找到專案，則在控制台中輸出訊息
      }
    }
  }, [project]); // 當 project 變更時觸發 useEffect

  return (
    // 當使用者點擊專案時，導向到專案的詳細頁面
    <div onClick={() => router.push(`/project/${proItem?.prono}`)} className={styles.projectMain}>
      <div className={styles.projectItem}>
        <article>
          <div className={styles.projectLogo}>
            <p>{proItem?.prono_prefix}</p> {/* 顯示專案編號前綴 */}
          </div>
          <div className={styles.projectContent}>
            <b>{proItem?.proname}</b> {/* 顯示專案名稱 */}
            <p>專案建立者: <span>{proItem?.username}</span></p> {/* 顯示專案建立者名稱 */}
            <p>排序進度: {proItem?.state}</p> {/* 顯示專案目前狀態 */}
          </div>
        </article>
        <div className={styles.projectTime}>
          <p>結案日期：{formatDate(edate as Date)}</p> {/* 格式化後顯示專案結案日期 */}
        </div>
      </div>
    </div>
  );
}

// 格式化日期函數
function formatDate(date: Date) {
  const year = date?.getFullYear(); // 獲取年份
  const month = String(date?.getMonth() + 1).padStart(2, '0'); // 獲取月份，月份是從 0 開始的，所以需要加 1，並補足兩位數
  const day = String(date?.getDate()).padStart(2, '0'); // 獲取日期，並補足兩位數
  const hours = String(date?.getHours()).padStart(2, '0'); // 獲取小時，並補足兩位數
  const minutes = String(date?.getMinutes()).padStart(2, '0'); // 獲取分鐘，並補足兩位數
  const seconds = String(date?.getSeconds()).padStart(2, '0'); // 獲取秒數，並補足兩位數

  // 返回格式化後的日期字串
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export default Project; // 將 Project 元件導出
3