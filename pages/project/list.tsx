import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/list.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRouter } from 'next/router';
import Project from './project';
import projectInterface from './projectInterface'
import axios from 'axios';
import PrivateRoute from '../privateRoute';
import userI from '../userI';



function ProjectList({ user }: { user: userI | undefined }) {
  const [year, setYear] = React.useState('');
  const [academic, setAcademic] = React.useState('');
  const [page, setPage] = React.useState<number>(1);
  const [projects, setProjects] = useState<projectInterface[]>([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axios.get('/api/project/list', {
          params: {
            year: year === 'all' ? '' : year,
            academic: academic === 'all' ? '' : academic,
            page
          }
        });
  
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    getList();
  }, [year, academic, page]);
  

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
  
    if (name === 'year') {
      setYear(value);  // 保持为 'all' 或者具体的年份
      console.log('setYear:', value);
    }
  
    if (name === 'academic') {
      setAcademic(value);  // 保持为 'all' 或者具体的学制
      console.log('setAcademic:', value);
    }
  };
  
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log('Current Page:', value);
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
                <MenuItem value={'all'}>全部</MenuItem>
                <MenuItem value={'01'}>博士</MenuItem>
                <MenuItem value={'02'}>二技</MenuItem>
                <MenuItem value={'03'}>碩士</MenuItem>
                <MenuItem value={'04'}>四技</MenuItem>
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
                <MenuItem value={'all'}>全部</MenuItem>
                <MenuItem value={'112'}>112</MenuItem>
                <MenuItem value={'113'}>113</MenuItem>
                <MenuItem value={'114'}>114</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </section>
        <section className={styles.projectList}>
          {projects.map((project, index) => (
            <React.Fragment key={project.prono}>
            <Project project={project} />
            {index < projects.length-1 && <hr/>}
            
          </React.Fragment>
          ))}
        </section>
        <section className={styles.projectPage}>
          <Stack spacing={2}>
            <Pagination
              count={5}
              onChange={handlePageChange}
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
export default function Init() {
  const [user, setUser] = useState<userI>();

  return (
    <PrivateRoute>
      <ProjectList user={user} />
    </PrivateRoute>
  );
}