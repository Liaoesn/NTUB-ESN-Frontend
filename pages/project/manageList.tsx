import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/list.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import React from 'react';
import { FaAngleLeft, FaAngleRight, FaPen, FaCog } from "react-icons/fa";


export default function ProjectList() {
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
      creator: "玲冬艦",
      progress: "4/6",
      endDate: "2024/05/24"
    },
    {
      id: 2,
      year: 114,
      title: "114學年度 三技 履歷評分",
      creator: "張三",
      progress: "3/5",
      endDate: "2024/06/15"
    },
  ];

  return (
    <Layout>
      <main className={styles.listArea}>
        <h2>Liao的專案總覽</h2>
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
                <MenuItem value={20}>五專</MenuItem>
                <MenuItem value={30}>四技</MenuItem>
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
            <a className={styles.projectSet}><FaCog /></a>
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
