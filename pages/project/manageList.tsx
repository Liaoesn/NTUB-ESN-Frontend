import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/list.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import Link from 'next/link';
import { FaAngleLeft, FaAngleRight, FaCog, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface User {
  username: string;
  avatar_url: string;
}

function ProjectList({ user }: { user: User | undefined }) {

  const [year, setYear] = React.useState('');
  const [academic, setAcademic] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {

    if (event.target.name == 'year') {
      setYear(event.target.value);
    };
    if (event.target.name == 'academic') {
      setAcademic(event.target.value);
    };
  };
  const projects = [
    {
      id: 1,
      year: 113,
      title: "113學年度 二技 履歷評分",
      creator: "廖翊丞",
      progress: "3/6",
      endDate: "2024/06/30"
    },
    {
      id: 2,
      year: 114,
      title: "113學年度 碩士班 履歷評分",
      creator: "廖翊丞",
      progress: "4/6",
      endDate: "2024/06/10"
    },
  ];

  return (
    <Layout user={user}>
      <main className={styles.listArea}>
        <h2>{user?.username}的專案總覽</h2>
        <section className={styles.dropdownArea}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 2, minWidth: 120, height: 20, }} size="small">
              <InputLabel id="demo-simple-select-label">學制</InputLabel>
              <Select
                sx={{ borderRadius: 20 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={academic}
                label="academic"
                name="academic"
                onChange={handleChange}
              >
                <MenuItem value={10}>二技</MenuItem>
                <MenuItem value={20}>四技</MenuItem>
                <MenuItem value={30}>碩士</MenuItem>
                <MenuItem value={30}>博士</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">年度</InputLabel>
              <Select
                sx={{ borderRadius: 20 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="year"
                name="year"
                onChange={handleChange}
              >
                <MenuItem value={'112'}>112</MenuItem>
                <MenuItem value={'113'}>113</MenuItem>
                <MenuItem value={'114'}>114</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <a><FaRegPlusSquare/></a>
        </section>
        <section className={styles.projectList}>
          {projects.map(project => (
            <div key={project.id} className={styles.projectItem}>
              <article>
                <div className={styles.projectLogo}><p>{project.year}</p></div>
                <div className={styles.projectContent}>
                  <b>{project.title}</b>
                  <p>專案建立者:<span>{project.creator}</span></p>
                  <p>排序進度:{project.progress}</p>
                </div>
              </article>
              <div className={styles.projectAbout}>
                <div className={styles.projectButton}>
                  <Link className={styles.projectSet} href={'/project/seting'}><FaCog /></Link>
                  <Link className={styles.projectDel} href={'/project/seting'}><FaRegTrashAlt /></Link>
                </div>
                <p>結案日期：{project.endDate}</p>
              </div>
            </div>
          ))}
        </section>
        <section className={styles.projectPage}>
          <Stack spacing={2}>
            <Pagination
              count={3}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: FaAngleLeft, next: FaAngleRight }}
                  {...item}
                />
              )}
            />
          </Stack>
        </section>
      </main>
    </Layout>
  );
}
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push('/user/login'); // 如果沒有用戶登錄，導向登錄頁面
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/user/login');
      }
    }
    fetchUser();
  }, [router]);

  return user ? <ProjectList user={user} /> : <p>Loading...</p>;
}