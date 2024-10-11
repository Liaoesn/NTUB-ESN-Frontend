import router from 'next/router.js';
import projectInterface from '../../type/projectinterface.jsx';
import styles from '@/styles/page/project/list.module.scss';
import { useEffect, useState } from 'react';

interface proProps {
  project: projectInterface;
}

function Project({ project }: proProps) {
  const [edate, setEdata] = useState<Date>();
  const [proItem, setProItem] = useState<projectInterface>();
  
  useEffect(() => {
    if (router.isReady) {
      if (project) {
        setEdata(new Date(project?.enddate));
        setProItem(project);
      } else {
        console.log('No project found in query.');
      }
    }
  }, [project]);

  return (
    <div onClick={() => router.push(`/project/${proItem?.prono}`)} className={styles.projectMain}>
      <div className={styles.projectItem}>
        <article>
          <div className={styles.projectLogo}>
            <p>{proItem?.prono_prefix}</p>
          </div>
          <div className={styles.projectContent}>
            <b>{proItem?.proname}</b>
            <p>專案建立者: <span>{proItem?.username}</span></p>
            <p>排序進度: {proItem?.state}</p>
          </div>
        </article>
        <div className={styles.projectTime}>
          <p>結案日期：{formatDate(edate as Date)}</p>
        </div>
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1).padStart(2, '0'); // 月份是從 0 開始的
  const day = String(date?.getDate()).padStart(2, '0');
  const hours = String(date?.getHours()).padStart(2, '0');
  const minutes = String(date?.getMinutes()).padStart(2, '0');
  const seconds = String(date?.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
export default Project;
