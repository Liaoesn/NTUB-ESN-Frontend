import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/list.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

export default function ProjectList() {
  const [year, setYear] = React.useState('');
  const [academic, setAcademic] = React.useState('');

  const handleChange = (academic?:string, year?:string) => {
    if (year){
      setYear(year);
    };
    if (academic){
      setAcademic(academic);
    };
  };

  return (
    <Layout>
      <main className={styles.listArea}>
        <h2>專案總攬</h2>
        <section className={styles.dropdownArea}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 2, minWidth: 120, height: 20 }} size="small">
              <InputLabel id="demo-simple-select-label">學制</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={academic}
                label="academic"
                onChange={() => handleChange(academic)}
              >
                <MenuItem value={10}>二技</MenuItem>
                <MenuItem value={20}>五專</MenuItem>
                <MenuItem value={30}>四技</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">年度</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="year"
                onChange={() => handleChange(year)}
              >
                <MenuItem value={'112'}>112</MenuItem>
                <MenuItem value={'113'}>113</MenuItem>
                <MenuItem value={'114'}>114</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </section>
        <section>

        </section>
      </main>
    </Layout>
  );
}
