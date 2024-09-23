import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/teacher.module.scss'
import React, { useState, useEffect } from 'react';
import { FaCheck, FaSignOutAlt,FaTimes } from "react-icons/fa";
import { useRouter } from 'next/router';
import PrivateRoute from '@/pages/privateRoute';
import userI from '@/type/userI';

function SetTeacher({ user }: { user: userI | undefined }) {
  const router = useRouter();
  const { prono } = router.query;
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);

  const teachers = [
    { 'name': '李明', 'teacherid': 0 },
    { 'name': '張華', 'teacherid': 1 },
    { 'name': '陳秀', 'teacherid': 2 },
    { 'name': '王偉', 'teacherid': 3 },
    { 'name': '林芳', 'teacherid': 4 },
    { 'name': '劉勇', 'teacherid': 5 },
    { 'name': '楊靜', 'teacherid': 6 },
    { 'name': '黃強', 'teacherid': 7 },
    { 'name': '趙敏', 'teacherid': 8 },
    { 'name': '周磊', 'teacherid': 9 },
    { 'name': '吳丹', 'teacherid': 10 },
    { 'name': '鄭偉', 'teacherid': 11 },
    { 'name': '徐麗', 'teacherid': 12 },
    { 'name': '何志', 'teacherid': 13 },
    { 'name': '郭英', 'teacherid': 14 },
    { 'name': '朱浩', 'teacherid': 15 },
    { 'name': '謝君', 'teacherid': 16 },
    { 'name': '蔡虹', 'teacherid': 17 },
    { 'name': '洪亮', 'teacherid': 18 },
    { 'name': '潘雲', 'teacherid': 19 }
  ];
  
  const handleCheckboxChange = (teacherID:number) => {
    setSelectedTeachers((prevSelected) => {
      if (prevSelected.includes(teacherID)) {
        // 如果已經選擇，則取消選擇
        console.log(selectedTeachers);
        return prevSelected.filter((name) => name !== teacherID);
      } else {
        // 如果未選擇，則新增到選擇列表中
        console.log(selectedTeachers);
        return [...prevSelected, teacherID];
      }
    });
  };
  return (
    <Layout user={user}>
      <main className={styles.teacherArea}>
        <h2>編輯專案 - 選擇協作老師</h2>
        <div className={styles.allArea}>
          {teachers.map((teacher, index) => (
            <div key={index} className={styles.nameArea}>
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={selectedTeachers.includes(teacher.teacherid)}
                onChange={() => handleCheckboxChange(teacher.teacherid)}
              />
              <label htmlFor={`checkbox-${index}`} className={`${styles.name}
               ${selectedTeachers.includes(teacher.teacherid) ? styles.colorTRUE : styles.colorFALSE}`}>
                {selectedTeachers.includes(teacher.teacherid) ? <FaTimes/> : ''}
                {teacher.name}
              </label>
            </div>
          ))}
        </div>
        <section className={styles.chooseArea}>
          <p>建議選擇教師人數:20位</p>
          <h5>已選擇教師:{selectedTeachers.length}位</h5>
          <h6>每位教師分配學生:{selectedTeachers.length}位</h6>
        </section>
        <section className={styles.setingButton}>
          <a className={`${styles.button} ${styles.check}`}><FaCheck /></a>
          <a onClick={() => router.push(`/projectManage/${prono}/edit`)} className={`${styles.button} ${styles.delete}`}><FaSignOutAlt /></a>
        </section>
      </main>
    </Layout>
  );
}
export default function Init() {
  const [user, setUser] = useState<userI>();

  return (
    <PrivateRoute>
      <SetTeacher user={user} />
    </PrivateRoute>
  );
}