import Layout from '@/components/Layout/Layout'; // 引入頁面佈局組件
import styles from '@/styles/page/project/list.module.scss' // 引入樣式
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material'; // 引入 Material UI 元件
import React, { useEffect, useState } from 'react'; // 引入 React 及其 hooks
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; // 引入左右箭頭圖示
import Project from './project'; // 引入 Project 組件
import projectInterface from '../../type/projectinterface' // 引入專案介面
import axios from 'axios'; // 引入 axios 處理 HTTP 請求
import router from 'next/router';

export default function ProjectList() {
  // 狀態管理
  const [year, setYear] = React.useState(''); // 儲存年度的狀態
  const [academic, setAcademic] = React.useState(''); // 儲存學制的狀態
  const [page, setPage] = React.useState<number>(1); // 儲存當前頁數
  const [pageSize, setPageSize] = React.useState<number>(1); // 儲存頁面大小
  const [projects, setProjects] = useState<projectInterface[]>([]); // 儲存專案列表

  // 當 year, academic, 或 page 改變時，會觸發 useEffect
  useEffect(() => {
    // 定義一個函數以獲取專案列表及頁面大小
    if (router.isReady){
      const getList = async () => {
        try {
          // 同時發送兩個請求，獲取專案列表和頁數
          const [listResponse, sizeResponse] = await Promise.all([
            axios.get('/api/project/list', {
              params: {
                year: year === 'all' ? '' : year, // 如果選擇 "all"，則不過濾年份
                academic: academic === 'all' ? '' : academic, // 如果選擇 "all"，則不過濾學制
                page
              }
            }),
            axios.get('/api/project/page', {
              params: {
                year: year === 'all' ? '' : year, 
                academic: academic === 'all' ? '' : academic, 
              }
            })
          ]);

          // 將回應的數據存入狀態
          setProjects(listResponse.data); // 設定專案列表
          setPageSize(Number(sizeResponse.data.page)); // 設定總頁數
        } catch (error) {
          console.error("Error fetching projects:", error); // 如果發生錯誤，記錄在控制台
        }
      };
    getList();
    }
 // 調用 getList 函數以獲取數據
  }, [year, academic, page]); // 當 year, academic, 或 page 改變時，重新調用 useEffect
  
  // 處理下拉選單的改變事件
  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
  
    if (name === 'year') {
      setYear(value);  // 設定選擇的年份，或 "all"
      console.log('setYear:', value); // 控制台輸出所選年份
    }
  
    if (name === 'academic') {
      setAcademic(value);  // 設定選擇的學制，或 "all"
      console.log('setAcademic:', value); // 控制台輸出所選學制
    }
  };
  
  // 處理頁數改變的事件
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // 設定當前頁數
    console.log('Current Page:', value); // 控制台輸出當前頁數
  };

  return (
    <Layout> 
      {/* 頁面佈局 */}
      <main className={styles.listArea}>
        <h2>歷年專案</h2> {/* 頁面標題 */}
        
        {/* 下拉選單區域 */}
        <section className={styles.dropdownArea}>
          <Box sx={{ minWidth: 120 }}>
            {/* 學制選單 */}
            <FormControl sx={{ m: 2, minWidth: 120, height: 20, }} size="small">
              <InputLabel id="demo-simple-select-label">學制</InputLabel>
              <Select
                sx={{ borderRadius: 20 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={academic}
                label="academic"
                name="academic"
                onChange={handleChange} // 當選擇改變時觸發事件
              >
                <MenuItem value={'all'}>全部</MenuItem>
                <MenuItem value={'01'}>博士</MenuItem>
                <MenuItem value={'02'}>二技</MenuItem>
                <MenuItem value={'03'}>碩士</MenuItem>
                <MenuItem value={'04'}>四技</MenuItem>
              </Select>
            </FormControl>
            
            {/* 年度選單 */}
            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">年度</InputLabel>
              <Select
                sx={{ borderRadius: 20 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="year"
                name="year"
                onChange={handleChange} // 當選擇改變時觸發事件
              > 
                <MenuItem value={'all'}>全部</MenuItem>
                <MenuItem value={'112'}>112</MenuItem>
                <MenuItem value={'113'}>113</MenuItem>
                <MenuItem value={'114'}>114</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </section>

        {/* 專案列表顯示區域 */}
        <section className={styles.projectList}>
          {projects.map((project, index) => (
            <React.Fragment key={project.prono}>
              <Project project={project} /> {/* 顯示每個專案 */}
              {index < projects.length - 1 && <hr />} {/* 在每個專案之間顯示分隔線 */}
            </React.Fragment>
          ))}
        </section>

        {/* 頁面分頁區域 */}
        <section className={styles.projectPage}>
          <Stack spacing={2}>
            <Pagination
              count={pageSize} // 設定總頁數
              onChange={handlePageChange} // 處理頁數改變事件
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: FaAngleLeft, next: FaAngleRight }} // 使用圖示作為前後頁面按鈕
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

