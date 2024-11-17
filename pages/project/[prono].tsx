import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/memo.module.scss';
import userI from '../../type/userI';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import proItemInterface from '@/type/proItemInterface';

export default function ShowHistory({ user }: { user: userI | undefined }) {

  const [studentItems, setItems] = useState<proItemInterface[]>([]);
  const [description, setDescription] = useState<string>("");
  const [context, setContext] = useState<string>("");
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

    if(studentItem) {

      var context = `
    讀書計畫：${studentItem.studyplan}
    機會：${studentItem.opportunity}
    自我期許：${studentItem.selfexpectation}
    工作背景：${studentItem.work}
    多元學習：${studentItem.learning}
    家庭背景：${studentItem.family}
    教育背景：${studentItem.education}
    求學經歷：${studentItem.studyexperience}
    推薦人：${studentItem.recommender}
    學歷：${studentItem.edu}
    證照：${studentItem.licence}
    工讀：${studentItem.pt}
    服務及學習：${studentItem.servelearn}
    其他資訊：${studentItem.other}
    家庭狀況：${studentItem.home}
    基本資料：${studentItem.basic}
    技能：${studentItem.skill}
    `;

    var description = `
    內容類型：${studentItem.studyplan}
    詳細資料：${studentItem.description}
    實際值：${studentItem.value}
    `;

    setContext(context);
    setDescription(description);
    }
  };
  
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.title}>
          <article className={styles.nameShow}>
          </article>
        </section>
        <section className={styles.mainArea}>
          <article className={styles.nameArea}>
            {studentItems.map((item, index) => (
              <div key={index} className={`${styles.context} ${isVisible == item.final_ranking ? styles.coverBack : ''}`}>
                <p style={{ width: '14%' }}>#{index + 1}</p>
                <p style={{ width: '22%' }}>{item.stu_name}</p>
                <p style={{ width: '22%' }}>{item.sex}</p>
                <p style={{ width: '22%' }}>{item.school}</p>
                <p className={`${item.admit == '錄取' ? styles.acceptance : styles.denial}`}>{item.admit}</p>
              </div>
            ))}
          </article>
        </section>
      </main>
    </Layout>
  );
}