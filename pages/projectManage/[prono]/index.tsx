import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/prono.module.scss';
// npm install react-beautiful-dnd
import { DropResult, DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import proItemInterface from '@/type/proItemInterface';
import { useRouter } from 'next/router';
import CheckPopup from '@/components/popup/checkPopup';
import userI from '@/type/userI';

export default function ProjectManageMain({ user }: { user: userI | undefined }) {
  const router = useRouter();
  const { prono } = router.query;
  const [items, setItems] = useState<proItemInterface[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [context, setContext] = useState<string>("");

  // api 取得 permissions 的 mapping 清單
  useEffect(() => {
    const fetchData = async () => {
      var path = window.location.href;
      var prono = path.substring(path.lastIndexOf('/') + 1);

      try {
        await axios.post('/api/score/student/' + prono, {
        }).then((response) => {
          setItems(response.data.rows);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[]);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation); // 組件卸載時取消請求的動畫幀，以防止內存洩漏
      setEnabled(false);
    };
  }, []);

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

  const handSubmit = async () => {
    // 將每個 item 的 evano 和 ranking 放入新的陣列
    const sortOrder = items.map((item, index) => ({
      evano: item.evano, // evano 屬性
      ranking: (index + 1).toString() // 排名
    }));
    console.log(sortOrder);

    try {
      await axios.post(`/api/score/sort/submit`, {
        sortOrder
      });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        // 3 秒後跳轉頁面
        router.push(`/projectManage/list`);
      }, 3000);
      
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const showDescription = ( id : string ) => {
    const studentItem = items.find(item => item.evano == id);

    if(studentItem) {
      studentItem.read = true;

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
      {showPopup && <CheckPopup title={'成功排序'} />}
      <main className={styles.main}>
        <section className={styles.title}>
          <article className={styles.nameShow}>
            <p>履歷列表(拖動可以排序)</p>
            <button>展開PDF</button>
          </article>
          <article className={styles.about}>
            <p>摘要</p>
            <button onClick={handSubmit}>完成</button>
          </article>
        </section>
        <section className={styles.mainArea}>
          <article className={styles.nameArea}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable-1" type="PERSON">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className="moveArea"
                    style={{
                      backgroundColor: snapshot.isDraggingOver ? '#849189' : ''
                    }}
                    {...provided.droppableProps}
                  >
                    {items?.map((item, index) => (
                      <Draggable key={item.evano} draggableId={item.evano ? item.evano.toString():index.toString()}
                        index={index}>
                        {(provided) => (
                          <div className={styles.item}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: 10,
                              backgroundColor: item.read? '#A3B8C0' : 'white',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div className={styles.context}>
                              <p style={{ width: '16%' }}>#{index+1}</p>
                              <p style={{ width: '24%' }} className={styles.name}>{item.stuname}</p>
                              <p style={{ width: '24%' }}>{item.sex}</p>
                              <p style={{ width: '24%' }} className={styles.school}>{item.school}</p>
                              <button onClick={() => showDescription(item.evano)}>展示內容</button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </article>
          <article className={styles.aboutArea}>
            <p className={styles.aboutContext}>
              {context}
            </p>
            <p className={styles.aboutDescription}>
              {description}
            </p>
            <div className={styles.aboutProject}>
              <div className={styles.title}>
                <h5>專案狀態</h5>
                <h5>其餘教師完成進度</h5>
                <h5>截止日期</h5>
              </div>
              <div className={styles.context}>
                <p>未完成</p>
                <p>10/20</p>
                <p>2024/10/25</p>
              </div>
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}