import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/add.module.scss';
import React, { useEffect, useState } from 'react';
import PrivateRoute from '../privateRoute';
import userI from '../../type/userI';
import { FaCheck, FaSignOutAlt } from 'react-icons/fa';
import { MdFileUpload } from 'react-icons/md';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import FailPopup from '@/components/popup/failPopup';

function CreateProject({ user }: { user: userI | undefined }) {
  const router = useRouter();
  const [college, setCollege] = useState('');
  const [people, setPeople] = useState<number>();
  const [projectName, setProjectName] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [filesName, setFilesName] = useState<string>('點擊或拖動文件到這裡上傳');
  const [files, setFiles] = useState<FileList | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('')
  const [id, setId] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const fetchProjectData = async () => {
        try {
          const response = await axios.get(`/api/project/insert/projectid`);

          setId(response.data[0][0].max_score);
        } catch (error) {
          console.error('取得專案資料時出錯:', error);
        }
      };

      fetchProjectData(); // 呼叫函數取得資料
    }
  }, [router]);

  const handleStartDateChange = (e: any) => {
    setStartDate(e.target.value);
    // 清空第二個日期選擇器，防止選擇不符合規則的日期
    if (endDate && e.target.value > endDate) {
      setEndDate('');
    }
  };
console.log(files);
  const handleEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
    setFilesName(event.target.files ? event.target.files[0].name : '');
  };

  const handleSubmit = async () => {
    console.log([college, projectName, startDate, endDate, files, people])
    if (projectName.length < 1) {
      setPopupTitle('專案名稱不可為空')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3500);
    } else if (college.length < 1) {
      setPopupTitle('學制型態不可為空')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3500);
    } else if (!people) {
      setPopupTitle('錄取人數不可為空')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3500);
    } else if (people < 1) {
      setPopupTitle('錄取人數不可為0')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3500);
    } else if (startDate.length < 1) {
      setPopupTitle('評分截止日期不可為空')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3500);
    } else if (endDate.length < 1) {
      setPopupTitle('專案截止日期不可為空')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3500);
    } else if (filesName == '點擊或拖動文件到這裡上傳') {
      setPopupTitle('上傳資料不可為空')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3500);
    } else if (!user){
      setPopupTitle('重整網頁確認登入狀態')
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2500);
    } else if (files) {
      // console.log('123456')
      const formData = new FormData();
        formData.append('file', files[0]); // 假設只有單檔案
        formData.append('proname', projectName);
        formData.append('prodescription', college);
        formData.append('admissions', people!.toString());
        formData.append('phase1', startDate);
        formData.append('enddate', endDate);
        formData.append('user_no', user.user_no.toString() );
        formData.append('pro_no', (id + 1).toString());
      try {
        const response = await axios.post('/api/project/insert', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
        console.log('專案新增成功：', response.data);
        alert('專案新增成功');
        router.push(`/projectManage/${id+1}/add-next`)
      } catch (error) {
        alert('新增專案失敗，請檢查輸入資料！');
      }
    }
  };

  return (

    <>
      <Layout>
        {showPopup ? <FailPopup title={popupTitle} /> : ''}
        <main className={styles.addArea}>
          <h2>新增專案</h2>
          <section className={styles.add}>
            <div className={styles.setingArea}>
              <Autocomplete
                sx={{ mt: 5, height: '54px', border: 'none' }}
                className={styles.addInput}
                id="free-solo-demo"
                freeSolo options={[]}
                value={projectName}
                onInputChange={(event, newValue) => setProjectName(newValue)}
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
                    <MenuItem value="二技進修">二技進修</MenuItem>
                    <MenuItem value="二技">二技</MenuItem>
                    <MenuItem value="碩士">碩士</MenuItem>
                    <MenuItem value="四技">四技</MenuItem>
                    <MenuItem value="四技進修">四技進修</MenuItem>
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
                    onChange={handleStartDateChange}
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
            <a className={`${styles.button} ${styles.check}`} onClick={handleSubmit}><FaCheck /></a>
            <a className={`${styles.button} ${styles.delete}`} onClick={() => router.push('/projectManage/list')}><FaSignOutAlt /></a>
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
