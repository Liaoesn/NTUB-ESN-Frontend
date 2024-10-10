import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/prono.module.scss';
// npm install react-beautiful-dnd
import { DropResult, DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import proItemInterface from '@/type/proItemInterface';

export default function ProjectManageMain() {
  const [items, setItems] = useState<proItemInterface[]>([]);
  const [description, setDescription] = useState<string>("");

  // api 取得 permissions 的 mapping 清單
  useEffect(() => {
    const fetchData = async () => {
      var path = window.location.href;
      var prono = path.substring(path.lastIndexOf('/') + 1);
      
      try {
        await axios.post('/api/score/student/' + prono, {
          userno: 11305001
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

  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.title}>
          <article className={styles.nameShow}>
            <p>履歷列表(拖動可以排序)</p>
            <button>展開PDF</button>
          </article>
          <article className={styles.about}>
            <p>摘要</p>
            <button>完成</button>
          </article>
        </section>
        <section className={styles.mainArea}>
          <article className={styles.nameArea}>
            <DragDropContext
              onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable-1" type="PERSON">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={styles.moveArea}
                    style={{
                      backgroundColor: snapshot.isDraggingOver ? '#849189' : ''
                    }}
                    {...provided.droppableProps}
                  >
                    {items?.map((item, index) => (
                      <Draggable key={item.evano} draggableId={item.evano?.toString()} index={index}>
                        {(provided) => (
                          <div
                            className={styles.item}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: 10,
                              backgroundColor: 'white',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div className={styles.context}>
                              <p>#{index}</p>
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
              姓名：湖尾號
              性別：男
              學校：國立台北商業大學

              湖尾號是一位來自國立台北商業大學的優秀學生。他在校內不僅在學業上表現突出，還積極參與各類校內活動。作為商業學院的一員，湖尾號對於商業管理和市場行銷充滿熱情，他的專業知識和實踐經驗都使他在同學中脫穎而出。

              在課堂上，湖尾號對於每一個課題都能投入充分的精力，並且總能以積極的態度解決問題。他的批判性思維和分析能力使他在各項商業案例研究中表現出色。此外，他還熱衷於參與商業比賽和校內研討會，並曾多次獲得優異的成績。

              湖尾號在校外也積極尋求實習機會，通過實踐進一步提升自己的專業技能。他的職業目標是成為一名成功的企業顧問，並且致力於幫助企業實現增長和創新。他的努力和毅力使他在未來的職業生涯中充滿了希望和潛力。
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