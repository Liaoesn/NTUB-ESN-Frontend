import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/list.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRouter } from 'next/router';
import Project from './project';
import projectinterface from './projectinterface'
import axios from 'axios';


const getList = async () => {
  const response = await axios.get('/api/project/list');

  console.log(response.data);
  const list = response.data.map((temp:projectinterface) => {
    console.log(temp);
    return temp;
  });
  console.log(list);
}

export default function ProjectList() {
  const [year, setYear] = React.useState('');
  const [academic, setAcademic] = React.useState('');
  const [page, setPage] = React.useState<number>(1);
  const [projects, setProjects] = useState<projectinterface[]>([]);

  
  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axios.get('/api/project/list', {
          params: { year, academic, page }

        });

        console.log(response);
        const list = response.data.map((temp: projectinterface) => {
          return temp;
        });
        
        setProjects(list);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getList();
  }, [year, academic, page]);

  const handleChange = (event: SelectChangeEvent) => {

    if (event.target.name == 'year') {
      const year = event.target.value;
      console.log('setYear: ' + year);
      if(year == 'all') {
        setYear('');
      } else {
        setYear(event.target.value);
      }
    };
    if (event.target.name == 'academic') {
      const academic = event.target.value;
      console.log('academic: ' + academic);
      if(academic == "all" ) {
        setAcademic('');
      } else {
        setAcademic(event.target.value);
      }
    };
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
                <MenuItem value={'01'}>二技</MenuItem>
                <MenuItem value={'02'}>四技</MenuItem>
                <MenuItem value={'03'}>碩士</MenuItem>
                <MenuItem value={'04'}>博士</MenuItem>
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
          {projects.map((project) =>{
            return <Project key={project.prono} project={project} />
          })}
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
