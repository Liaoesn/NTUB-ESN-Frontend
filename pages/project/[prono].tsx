import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/memo.module.scss';
import React, { useState } from 'react';
import userI from '../userI';

export default function ShowHistory({ user }: { user: userI | undefined }) {
  const studentItems = [
    { "id": "1", "name": "湖尾號", "sex": "男", "school": "國立台北商業大學" },
    { "id": "2", "name": "廳前程", "sex": "男", "school": "湖尾科大" },
    { "id": "3", "name": "志明", "sex": "女", "school": "國立台灣大學" },
    { "id": "4", "name": "小華", "sex": "男", "school": "國立清華大學" },
    { "id": "5", "name": "美玲", "sex": "女", "school": "國立成功大學" },
    { "id": "6", "name": "雅惠", "sex": "女", "school": "國立交通大學" },
    { "id": "7", "name": "志強", "sex": "男", "school": "國立政治大學" },
    { "id": "8", "name": "麗珍", "sex": "女", "school": "國立中興大學" },
    { "id": "9", "name": "志傑", "sex": "男", "school": "國立中山大學" },
    { "id": "10", "name": "婷婷", "sex": "女", "school": "國立中央大學" },
    { "id": "11", "name": "建華", "sex": "男", "school": "國立台北商業大學" },
    { "id": "12", "name": "怡君", "sex": "女", "school": "湖尾科大" },
    { "id": "13", "name": "俊傑", "sex": "男", "school": "國立台灣大學" },
    { "id": "14", "name": "雅婷", "sex": "女", "school": "國立清華大學" },
    { "id": "15", "name": "志玲", "sex": "女", "school": "國立成功大學" },
    { "id": "16", "name": "美君", "sex": "女", "school": "國立交通大學" },
  ];
  const [isVisible, setIsVisible] = useState<string>();

  const handleClick = ( id : string ) => {
    setIsVisible(id); // 切換顯示狀態
  };
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.title}>
          <article className={styles.nameShow}>
            <p>學生列表</p>
            <button>展開PDF</button>
          </article>
          <article className={styles.about}>
            <p>展示區</p>
          </article>
        </section>
        <section className={styles.mainArea}>
          <article className={styles.nameArea}>
            {studentItems.map((item, index) => (
              <div key={index} className={`${styles.context} ${isVisible == item.id ? styles.coverBack : ''}`}>
                <p>#{index + 1}</p>
                <p className={styles.name}>{item.name}</p>
                <p>{item.sex}</p>
                <p className={styles.school}>{item.school}</p>
                <button onClick={() => handleClick(item.id)}>展示內容</button>
              </div>
            ))}
          </article>

          <article className={styles.aboutArea}>
            <p className={styles.aboutContext}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {studentItems.find(item => item.id === isVisible)?.school}
            </p>
            <div className={styles.aboutProject}>
              <div className={styles.title}>
                <h5>專案狀態</h5>
                <h5>其餘教師完成進度</h5>
                <h5>截止日期</h5>
              </div>
              <div className={styles.context}>
                <p>已完成</p>
                <p>20/20</p>
                <p>2024/10/25</p>
              </div>
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}