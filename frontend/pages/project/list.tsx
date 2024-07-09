import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/list.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRouter } from 'next/router';

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

  return (
    <Layout user={user}>
      <main className={styles.listArea}>
        <h2>歷年專案</h2>
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
        </section>
        <section className={styles.projectList}>
          <div className={styles.projectItem}>
            <article>
              <div className={styles.projectLogo}><p>113</p></div>
              <div className={styles.projectContent}>
                <b>113學年度 二技 履歷評分</b>
                <p>專案建立者:<span>廖翊丞</span></p>
                <p>排序進度:3/6</p>
              </div>
            </article>
            <div className={styles.projectAbout}>
              <p>結案日期：2024/06/30</p>
            </div>
          </div>
          <div className={styles.projectItem}>
            <article>
              <div className={styles.projectLogo}><p>113</p></div>
              <div className={styles.projectContent}>
                <b>113學年度 碩士班 履歷評分</b>
                <p>專案建立者:<span>廖翊丞</span></p>
                <p>排序進度:4/6</p>
              </div>
            </article>
            <div className={styles.projectTime}>
              <p>結案日期：2024/06/10</p>
            </div>
          </div>
          <div className={styles.projectItem}>
            <article>
              <div className={styles.projectLogo}><p>113</p></div>
              <div className={styles.projectContent}>
                <b>113學年度 四技績優 履歷評分</b>
                <p>專案建立者:<span>張安志</span></p>
                <p>排序進度:5/6</p>
              </div>
            </article>
            <div className={styles.projectTime}>
              <p>結案日期：2024/05/24</p>
            </div>
          </div>
          <div className={styles.projectItem}>
            <article>
              <div className={styles.projectLogo}><p>113</p></div>
              <div className={styles.projectContent}>
                <b>113學年度 特殊選才 履歷評分</b>
                <p>專案建立者:<span>林明志</span></p>
                <p>排序進度:6/6</p>
              </div>
            </article>
            <div className={styles.projectTime}>
              <p>結案日期：2024/04/30</p>
            </div>
          </div>
          <div className={styles.projectItem}>
            <article>
              <div className={styles.projectLogo}><p>113</p></div>
              <div className={styles.projectContent}>
                <b>113學年度 技優推甄 履歷評分</b>
                <p>專案建立者:<span>林明志</span></p>
                <p>排序進度:6/6</p>
              </div>
            </article>
            <div className={styles.projectTime}>
              <p>結案日期：2024/04/30</p>
            </div>
          </div>
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