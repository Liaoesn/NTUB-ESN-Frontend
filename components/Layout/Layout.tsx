import Head from "next/head";
import { useEffect, useState } from 'react';
import NavBar from "@/components/common/NavBar";
import styles from "@/styles/components/layout.module.scss";

// 定義 Layout 組件的 props 介面，接收 children 以及選擇性的 user 物件
interface LayoutProps {
  children: React.ReactNode; // children 為所有內嵌於此 Layout 中的元件
  user?: { username: string, avatar_url: string } | undefined; // user 是選擇性的參數，包含 username 和 avatar_url
}

// Layout 組件，負責呈現標頭、導覽列以及包裹內容
export default function Layout({ children, user }: LayoutProps) {
  // 使用 useState 儲存使用者資料，如果有提供 user prop 就使用它，否則會是 undefined
  const [userData, setUserData] = useState<{ username: string, avatar_url: string } | undefined>(user);

  // 定義一個非同步函式，從後端 API 獲取當前登入的使用者資訊
  const fetchUser = async () => {
    const res = await fetch('http://localhost:5000/api/auth/user', {
      credentials: 'include', // 確保發送請求時會附帶 cookie（用於認證）
    });
    if (res.ok) {
      const data = await res.json(); // 將回應轉換成 JSON 格式
      setUserData(data.user); // 更新使用者狀態
    }
  };

  // 使用 useEffect 在組件首次載入時執行邏輯
  useEffect(() => {
    // 檢查是否有使用者資料，如果沒有就調用 fetchUser 取得資料
    if (!userData) {
      fetchUser();
    }
  }, []); // 空的依賴陣列表示這個 effect 僅在組件初次渲染時執行一次

  return (
    <>
      <Head>
        <title>履人</title> {/* 設定頁面標題 */}
        <meta charSet="UTF-8" /> {/* 設定網頁的編碼 */}
        <meta name="description" content="NTUB IMD ESN" /> {/* 提供簡單描述 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /> {/* 設定視窗的寬度和縮放比例 */}
        <link rel="icon" href="/favicon.ico" /> {/* 設定網頁的圖標 */}
      </Head>
      <NavBar user={userData} /> {/* 導覽列，會傳入 user 資料供顯示 */}
      <div className={styles.layout}>
        {children} {/* 將子元素呈現在此區域 */}
      </div>
    </>
  );
}
