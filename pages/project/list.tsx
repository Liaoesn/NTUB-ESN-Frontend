import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/list.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRouter } from 'next/router';
import Project from './project';
import projectinterface from './projectinterface'

export default function ProjectList() {
  const [year, setYear] = React.useState('');
  const [academic, setAcademic] = React.useState('');
  const [projects, setProjects] = useState<projectinterface[]>([
    {id:Math.random(), img:'112', tit:'112學年度 三技 履歷部分', proname: 'OOO', state:'3/6', enddate: '112/09'},
    {id:Math.random(), img:'113', tit:'113學年度 二技 履歷部分', proname: 'XXX', state:'2/6', enddate: '113/10'},
    {id:Math.random(), img:'112', tit:'112學年度 五專 履歷部分', proname: 'ZZZ', state:'3/6', enddate: '112/11'},
    {id:Math.random(), img:'113', tit:'113學年度 四技 履歷部分', proname: 'XXX', state:'0/6', enddate: '113/12'},
  ]);

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
          {projects.map((project) =>{
            return <Project project={project} />
          })}
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
