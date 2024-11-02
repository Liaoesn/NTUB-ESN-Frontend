import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/list.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { FaAngleLeft, FaAngleRight, FaCog, FaRegPlusSquare } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import Project from './project';
import projectManageInterface from '../../type/projectManageInterface'
import axios from 'axios';
import PrivateRoute from '../privateRoute';
import userI from '../../type/userI';
import DelConfirm from '@/components/popup/confirmPopup';

function ProjectManage({ user }: { user: userI | undefined }) {
  const [year, setYear] = React.useState('');
  const [academic, setAcademic] = React.useState('');
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(1);
  const [projects, setProjects] = useState<projectManageInterface[]>([]);

  // 用於修改使用者狀態
  const [confirmMsg, setConfirmMsg] = useState<string>();
  const [targetPro, setTargetPro] = useState<number>();
    // 彈出視窗
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [rePro, setRePro] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listResponse, sizeResponse] = await Promise.all([
          axios.get('/api/project/data', {
            params: {
              year: year === 'all' ? '' : year,
              academic: academic === 'all' ? '' : academic,
              page
            }
          }),
          axios.get('/api/project/dataPage', {
            params: {
              year: year === 'all' ? '' : year,
              academic: academic === 'all' ? '' : academic,
            }
          })
        ]);

        setProjects(listResponse.data);
        setPageSize(Number(sizeResponse.data.page));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    fetchData();
  }, [year, academic, page, rePro]);

  const refleshData = () => {
    setRePro(!rePro);
  }

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

  //Popup 相關
  const showDelPopup = (prono: number, proname: string) => {
    setConfirmMsg('是否確定刪除' + proname + '?');
    setTargetPro(prono);
    setShowConfirm(true);
  }

  const closePopup = () => {
    setTargetPro(0);
    setShowConfirm(false);
  }

  const delProject = async () => {
    const url = '/api/project/delete';
    await axios.put(url, {
        prono: targetPro
    }).then((response) => {
      closePopup();
      refleshData();
    });
  };


  return (
    <Layout user={user}>
      {showConfirm && <DelConfirm content={confirmMsg} onConfirm={delProject} onClose={closePopup}/>}
      <main className={styles.listArea}>
        <h2>{user?.user_name}的專案總覽</h2>
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
          <a href={'/projectManage/add'}><FaRegPlusSquare/></a>
        </section>
        <section className={styles.projectList}>
        {projects.map((project, index) => (
          <React.Fragment key={project.prono}>
            <Project project={project} onDel={showDelPopup} />
            {index < projects.length-1 && <hr/>}
          </React.Fragment>
          ))}
        </section>
        <section className={styles.projectPage}>
          <Stack spacing={2}>
            <Pagination
              count={pageSize}
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
      <ProjectManage user={user} />
    </PrivateRoute>
  );
}