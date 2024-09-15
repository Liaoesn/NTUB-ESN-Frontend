import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/prono.module.scss';
// npm install react-beautiful-dnd
import { DropResult, DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';

// 示例數據
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

export default function About() {
  const [items, setItems] = useState(studentItems);
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
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
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
                              <p className={styles.name}>{item.name}</p>
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