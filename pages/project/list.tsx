import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/list.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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

  return (
    <Layout>
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
                <p>專案建立者:<span>玲冬艦</span></p>
                <p>排序進度:4/6</p>
              </div>
            </article>
            <div className={styles.projectAbout}>
              <p>結案日期：2024/05/24</p>
            </div>
          </div>
          <div className={styles.projectItem}>
            <article>
              <div className={styles.projectLogo}><p>113</p></div>
              <div className={styles.projectContent}>
                <b>113學年度 二技 履歷評分</b>
                <p>專案建立者:<span>玲冬艦</span></p>
                <p>排序進度:4/6</p>
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
                <b>113學年度 二技 履歷評分</b>
                <p>專案建立者:<span>玲冬艦</span></p>
                <p>排序進度:4/6</p>
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
                <b>113學年度 二技 履歷評分</b>
                <p>專案建立者:<span>玲冬艦</span></p>
                <p>排序進度:4/6</p>
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
                <b>113學年度 二技 履歷評分</b>
                <p>專案建立者:<span>玲冬艦</span></p>
                <p>排序進度:4/6</p>
              </div>
            </article>
            <div className={styles.projectTime}>
              <p>結案日期：2024/05/24</p>
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
