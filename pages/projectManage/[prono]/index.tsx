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
  
  // api 取得 permissions 的 mapping 清單
  useEffect(() => {
    const fetchData = async () => {
      var path = window.location.href;
      var prono = path.substring(path.lastIndexOf('/') + 1);
      console.log('userno: ' + user?.userno)
      try {
        await axios.post('/api/score/student/' + prono, {
          userno: user?.userno
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
        router.push(`/projectManage/${prono}/edit`);
      }, 3000);
      
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const showDescription = ( id : string ) => {
    const studentItem = items.find(item => item.evano == id);
    console.log(studentItem?.description);
    var description = studentItem?.type + " " + studentItem?.value + " " + studentItem?.description;

    setDescription(description);
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
                              backgroundColor: 'white',
                              ...provided.draggableProps.style,
                            }}
                            onClick={() => showDescription(item.evano)}
                          >
                            <div className={styles.context}>
                              <p>#{index+1}</p>
                              <p className={styles.name}>{item.stuname}</p>
                              <p>{item.sex}</p>
                              <p className={styles.school}>{item.school}</p>
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