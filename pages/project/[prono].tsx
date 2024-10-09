import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/memo.module.scss';
import userI from '../../type/userI';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import proItemInterface from '@/type/proItemInterface';

export default function ShowHistory({ user }: { user: userI | undefined }) {

  const [studentItems, setItems] = useState<proItemInterface[]>([]);
  const [description, setDescription] = useState<string>("");
  // api 取得 permissions 的 mapping 清單
  useEffect(() => {
    const fetchData = async () => {
      var path = window.location.href;
      var prono = path.substring(path.lastIndexOf('/') + 1);
      
      try {
        const response = await axios.get('/api/project/item/' + prono);
        console.log('data:', response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[]);

  const [isVisible, setIsVisible] = useState<number>();
  const handleClick = ( id : number ) => {
    setIsVisible(id);

    const studentItem = studentItems.find(item => item.final_ranking === id);
    var description = studentItem?.type + " " + studentItem?.value + " " + studentItem?.description;

    setDescription(description);
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
              <div key={index} className={`${styles.context} ${isVisible == item.final_ranking ? styles.coverBack : ''}`}>
                <p>#{index + 1}</p>
                <p className={styles.name}>{item.stuname}</p>
                <p>{item.sex}</p>
                <p className={styles.school}>{item.school}</p>
                <button onClick={() => handleClick(item.final_ranking)}>展示內容</button>
              </div>
            ))}
          </article>

          <article className={styles.aboutArea}>
            <p className={styles.aboutContext}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {description}
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