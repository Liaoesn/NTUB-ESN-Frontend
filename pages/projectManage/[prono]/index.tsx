import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/prono.module.scss';
// npm install react-beautiful-dnd
import { DropResult, DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';
import proItemInterface from '@/type/proItemInterface';
import axios from 'axios';
import { useRouter } from 'next/router';
import CheckPopup from '@/components/popup/checkPopup';
import userI from '@/type/userI';
import { Input } from '@mui/material';


export default function ProjectManageMain({ user }: { user: userI | undefined }) {
  const router = useRouter();
  const { prono } = router.query;
  const [showPopup, setShowPopup] = useState(false);
  const [items, setItems] = useState<proItemInterface[]>([]);
  const [target, setTarget] = useState<proItemInterface>();
  const [description, setDescription] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [context, setContext] = useState<string>("");
  const [completed_count, setCompletedCount] = useState<number>(0);
  const [total_count, setTotalCount] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [completion_rate, setCompletionRate] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  
  // api 取得 permissions 的 mapping 清單
  useEffect(() => {
    const fetchData = async () => {
      var path = window.location.href;
      var prono = path.substring(path.lastIndexOf('/') + 1);

      try {
        await axios.post('/api/score/student/' + prono, {
        }).then((response) => {
          console.log(response.data)
          setItems(response.data.rows);
          setCompletionRate(parseFloat(response.data.completion_rate));
          setComplete(response.data.complete);
          setCompletedCount(response.data.completed_count);
          setTotalCount(response.data.total_count);
          setDate(formatDate(response.data.date));
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[]);

  // 格式化日期函數
  function formatDate(dateString: string) {
    // 若 dateString 不是有效的日期字串，返回空字串
    var date = new Date(dateString);
    if(date instanceof Date) {
      const year = date.getFullYear(); // 獲取年份
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 獲取月份，月份是從 0 開始的，所以需要加 1，並補足兩位數
      const day = String(date.getDate()).padStart(2, '0'); // 獲取日期，並補足兩位數
      const hours = String(date.getHours()).padStart(2, '0'); // 獲取小時，並補足兩位數
      const minutes = String(date.getMinutes()).padStart(2, '0'); // 獲取分鐘，並補足兩位數
      const seconds = String(date.getSeconds()).padStart(2, '0'); // 獲取秒數，並補足兩位數

      // 返回格式化後的日期字串
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    } else {
      return "";
    }
  }

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation); // 組件卸載時取消請求的動畫幀，以防止內存洩漏
      setEnabled(false);
    };
  }, []);

  useEffect(() => {
    if(target) {
      target.read = true;

      var context = `
    讀書計畫：${target.studyplan}
    機會：${target.opportunity}
    自我期許：${target.selfexpectation}
    工作背景：${target.work}
    多元學習：${target.learning}
    家庭背景：${target.family}
    教育背景：${target.education}
    求學經歷：${target.studyexperience}
    推薦人：${target.recommender}
    學歷：${target.edu}
    證照：${target.licence}
    工讀：${target.pt}
    服務及學習：${target.servelearn}
    其他資訊：${target.other}
    家庭狀況：${target.home}
    基本資料：${target.basic}
    技能：${target.skill}
    `;

    var description = `
    內容類型：${target.studyplan}
    詳細資料：${target.description}
    實際值：${target.value}
    `;

    setContext(context);
    setDescription(description);
    setMemo(target.memo);
    setScore(target.score);
    }

  }, [target]);

  if (!enabled) {
    return null;
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const showDescription = ( index : number ) => {
    setTarget(items[index]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (target) {
      if(name == 'memo') {
        target.memo = value; 
        setMemo(value);
      } else if(name == 'score') {
        target.score = Number(value); 
        setScore(Number(value));
      }
    }
  };

  const save = async () => {
    try {
      const data = items.map((item : proItemInterface) => ({
        id: item.eva_no,
        score: item.score,
        memo: item.memo,
      }));
  

      console.log(data);
      const response = await axios.post('/api/score/score', {
        data
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  /* TODO 調整complete參數 */
  const completed = async () => {
    try {
      const evaluations = items.map((item) => ({
        evano: item.eva_no,
        score: item.score,
        memo: item.memo,
      }));
  
      console.log(evaluations);
      const response = await axios.post('/api/score/sort/complete', {
        evaluations
      });

      // 顯示彈出視窗並在3秒後跳轉頁面
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        router.push(`/projectManage/list`);
      }, 3000);

    } catch (error) {
      console.error('儲存資料時出錯:', error);
    }
  };


  return (
    <Layout>
      {showPopup && <CheckPopup title={'成功排序'} />}
      <main className={styles.main}>
        <section className={styles.title}>
          <article className={styles.nameShow}>
            <p>履歷列表(拖動可以排序)</p>
          </article>
          <article className={styles.about}>
            <p>摘要</p>
            <button onClick={completed}>完成</button>
          </article>
        </section>
        <section className={styles.mainArea}>
          <article className={styles.nameArea}>
            {items?.map((item, index) => (
              <div className={styles.item}
                key={item.stu_name}
                style={{
                  userSelect: 'none',
                  padding: 10,
                  backgroundColor: item.read? '#A3B8C0' : 'white',
                }}
                >
                <div className={styles.context}>
                  <p style={{ width: '16%' }}>#{index+1}</p>
                  <p style={{ width: '20%' }} className={styles.name}>{item.stu_name}</p>
                  <p style={{ width: '20%' }}>{item.sex}</p>
                  <p style={{ width: '15%' }} className={styles.school}>{item.school}</p>

                  <button style={{ width: '15%',marginInline: '20px'}} onClick={() => showDescription(index)}>展示內容</button>
                  <button style={{ width: '15%',marginInline: '20px'}}>展開PDF</button>
                </div>
              </div>
            ))}
          </article>
          <article className={styles.aboutArea}>
            <p className={styles.aboutContext}>
              {context}
            </p>
            <p className={styles.aboutDescription}>
              {description}
            </p>
            <Input 
                name="memo"
                disableUnderline={true}
                onChange={handleChange}
                onBlur={save}
                value={memo ? memo : ''}
                />
            <div className={styles.aboutProject}>
              <div className={styles.title}>
                <h5>專案狀態</h5>
                <h5>其餘教師完成進度</h5>
                <h5>評分</h5>
              </div>
              <div className={styles.context}>
                <p>{completion_rate == 100 ? '完成' : '未完成'}</p>
                <p>{completed_count}/{total_count}</p>

                {/*<input  onChange={() => updateScore()}></input>*/}

                {/* onBlur={save} 當輸入框失焦時觸發保存 */}

                <Input
                  name="score"
                  disableUnderline
                  onChange={handleChange}
                  onBlur={save}
                  value={score || ''}
                />

              </div>
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}