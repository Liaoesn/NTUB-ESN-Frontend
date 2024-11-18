import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/add.module.scss';
import React, { useState } from 'react';
import PrivateRoute from '../privateRoute';
import userI from '../../type/userI';
import { FaCheck, FaFolder, FaPen, FaRegCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import FailPopup from '@/components/popup/failPopup';
import { MdArrowLeft, MdFileUpload } from 'react-icons/md';
import axios from 'axios';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

function CreateProject({ user }: { user: userI | undefined }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('')
  const router = useRouter();
  const [college, setCollege] = useState('');
  const [people, setPeople] = useState<number>();
  const [projectName, setProjectName] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [filesName, setFilesName] = useState<string>('點擊或拖動文件到這裡上傳');
  const [files, setFiles] = useState<FileList | null>(null);
  const [type, setType] = useState('');
  const handleStartDateChange = (e: any) => {
      setStartDate(e.target.value);
      // 清空第二個日期選擇器，防止選擇不符合規則的日期
      if (endDate && e.target.value > endDate) {
          setEndDate('');
      }
  };

  const handleEndDateChange = (e: any) => {
      setEndDate(e.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
    setFilesName(event.target.files ? event.target.files[0].name : '');
  };

  const handleSubmit = () => {
    if (college.length < 1 || projectName.length < 1) {
      setPopupTitle('第一步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if (startDate.length < 1 || endDate.length < 1) {
      setPopupTitle('第二步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if (files == null) {
      setPopupTitle('第三步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if (people < 1) {
      setPopupTitle('第四步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else if (type.length < 1) {
      setPopupTitle('第五步驟有空值')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else {
      setShowPopup(true);
    }
    console.log([college, projectName, startDate, endDate, files, people, type])
    console.log({
      college,
      projectName,
      type,
      people,
      startDate,
      endDate,
    });
  };
  return (
    <>
      <Layout>
        <main className={styles.addArea}>
          <h2>新增專案設定(請注意設定後將不能更改)</h2>
          <section className={styles.add}>
            <div className={styles.setingArea}>
              <Autocomplete
                sx={{ mt: 5, height: '54px', border: 'none' }}
                className={styles.addInput}
                id="free-solo-demo"
                freeSolo options={[]}
                value={projectName}
                onInputChange={(e) => setProjectName}
                renderInput={(params) => <TextField className={styles.addInput} {...params} label="輸入專案名稱" />}
              />
            </div>
            <div className={styles.setingArea}>
              <div className={styles.contentShort}>
                <FormControl className={styles.shortInput}>
                  <InputLabel id="demo-simple-select-label">學制</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="academic"
                    name="academic"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  >
                    <MenuItem value="二技">二技</MenuItem>
                    <MenuItem value="四技">四技</MenuItem>
                    <MenuItem value="碩士">碩士</MenuItem>
                    <MenuItem value="博士">博士</MenuItem>
                  </Select>
                </FormControl>
                <div className={styles.shortInput}>
                  <input className={styles.people} placeholder={'錄取人數'} type="input" value={people} onChange={(e) => setPeople(e.target.value as unknown as number)} />
                </div>
              </div>
            </div>
            <div className={styles.setingArea}>
              <div className={styles.contentShort}>
                <div className={`${styles.shortInput} ${styles.dateInput}`}>
                  <p>老師評分截止日期 :</p>
                  <input
                    type="date"
                    id="end-date"
                    value={startDate}
                    onChange={handleEndDateChange}
                  />
                </div>
                <div className={`${styles.shortInput} ${styles.dateInput}`}>
                  <p>專案整體截止日期 :</p>
                  <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={startDate || today} // 第二個日期只能選擇第一個日期之後
                    disabled={!startDate} // 如果未選擇開始日期，禁用第二個日期選擇器
                  />
                </div>
              </div>
            </div>
            <div className={styles.fileArea}>
              <p>學生文件檔案(請壓成.zip檔案)：</p>
              <div className={styles.fileInput}>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  multiple
                  accept=".zip"
                  className={styles.hiddenInput}
                />
                <label htmlFor="file" className={styles.file}>
                  <MdFileUpload className={styles.donloadicon} />
                  {filesName}
                </label>
              </div>
            </div>
          </section>
          <section className={styles.setingButton}>
            <a className={`${styles.button} ${styles.check}`}><FaSignOutAlt /></a>
          </section>
        </main>
      </Layout>
    </>
  );
}

export default function Init() {
  const [user, setUser] = useState<userI>();

  return (
    <PrivateRoute>
      <CreateProject user={user} />
    </PrivateRoute>
  );
}
