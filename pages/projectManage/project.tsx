import projectManageInterface from '../../type/projectManageInterface';
import styles from '@/styles/page/project/list.module.scss';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { FaCog, FaRegTrashAlt } from 'react-icons/fa';
import axios from 'axios';

interface proProps {
  project: projectManageInterface;
  onDel: (pro_no: number, pro_name: string) => void;
}

function Manageproject({ project, onDel }: proProps) {
  const [edate, setEdata] = useState<Date>();
  const [phase1, setPhase1] = useState<Date>();
  const [proItem, setProItem] = useState<projectManageInterface>();
  const [pop, setPop] = useState<Boolean>(true);

  useEffect(  () => {
    if (router.isReady) {
      if (project) {
        setEdata(new Date(project?.end_date));
        setPhase1(new Date(project?.phase1));
        setProItem(project);
      } else {
        console.log('No project found in query.');
      }
    }
  }, [project]);

  const Del = () => {
    onDel(project.pro_no, project.pro_name);
  };

  const ViewPage = (pro_no: number) => {
    window.location.href='/projectManage/' + pro_no;
  }

  const EditPage = (pro_no: number) => {
    window.location.href='/projectManage/' + pro_no + '/edit';
  }

  const onMerage = async (pro_no: number) => {
    try {
      const response = await axios.post('/api/score/merge', {
        pro_no
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }


  return (
    <div className={styles.projectMain}>
      {proItem?.status == '已關閉' ?
        <div className={styles.cover} >
          <a onClick={() => router.push(`/project/${project.pro_no}`)}>查看結果</a>
        </div > : checkDate(phase1 as Date) ?
          <div className={styles.cover}>
            <a onClick={() =>  onMerage(project.pro_no)}>合併排序</a>
          </div> : ''
      }
      <div onClick={() => ViewPage(project.pro_no)} className={styles.projectItem}>
        <article>
          <div className={styles.projectLogo}>
            <p>{proItem?.prodescription}</p>
          </div>
          <div className={styles.projectContent}>
            <b>{proItem?.pro_name}</b>
            <p>專案建立者: <span>{proItem?.user_name}</span></p>
            <p>排序進度: {proItem?.status}</p>
          </div>
        </article>
        <div className={styles.projectAbout}>
          <div className={styles.projectButton} onClick={(e) => e.stopPropagation()}>
            <div className={styles.projectSet} onClick={() => EditPage(project.pro_no)}><FaCog /></div>
            <div className={styles.projectDel} onClick={() => Del()}><FaRegTrashAlt /></div>
          </div>
          <p>結案日期：{formatDate(edate as Date)}</p>
        </div>
      </div>
    </div>
  );
}

function checkDate(date: Date) {
  if (date < new Date()) {
    return true;
  } else { return false; }
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
export default Manageproject;
