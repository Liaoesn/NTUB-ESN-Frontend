import styles from "@/styles/components/popup/project/projectNamePopup.module.scss";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from 'react';
import { MdArrowRight, MdOutlineCancel } from "react-icons/md";
import router from "next/router";

interface ProjectNamePopupProps {
  College: (value: string) => void;
  ProjectName: (value: string) => void;
  CollegeValue: string | undefined;
  ProjectNameValue: string | undefined;
  onNext: () => void;
}

const ProjectName: React.FC<ProjectNamePopupProps> = ({
  College, CollegeValue, ProjectName, ProjectNameValue, onNext }) => {

  const [projectNameValue, setProjectNameValue] = useState<string>(ProjectNameValue as string);
  const [collegeValue, setCollegeValue] = useState<string>(CollegeValue as string);

  const handleProjectNameChange = (_event: any, newInputValue: any) => {
    setProjectNameValue(newInputValue);
  };

  const handlecollegeChange = (value: string | null) => {
    if (value) setCollegeValue(value);
  };

  const handleClick = () => {
    // 更新父組件中的 college 和 projectName
    College(collegeValue);
    ProjectName(projectNameValue);
    console.log(projectNameValue)
    console.log(collegeValue)
    onNext();
  };

  return (
    <div className={styles.popupBG}>
      <div className={styles.mainShow}>
        <section className={styles.title}>
          <h4>輸入名稱和選擇學制與年度</h4>
          <a onClick={() => router.push('/projectManage/list')} className={styles.closeButton}>
            <MdOutlineCancel />
          </a>
        </section>
        <section className={styles.inputArea}>
          <Autocomplete
            sx={{ m: 2, height: 15, }}
            className={styles.Input}
            id="free-solo-demo"
            freeSolo options={[]}
            value={projectNameValue}
            onInputChange={handleProjectNameChange}
            renderInput={(params) => <TextField {...params} label="輸入專案名稱" />}
          />
          <article className={styles.type}>
            <FormControl sx={{ minWidth: 575 }}>
              <InputLabel id="demo-simple-select-label">學制</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="academic"
                name="academic"
                value={collegeValue}
                onChange={(e) => handlecollegeChange(e.target.value)}
              >
                <MenuItem value="二技">二技</MenuItem>
                <MenuItem value="四技">四技</MenuItem>
                <MenuItem value="碩士">碩士</MenuItem>
                <MenuItem value="博士">博士</MenuItem>
              </Select>
            </FormControl>
          </article>
        </section>
        <section className={styles.showStep}>
          <p>1/5</p>
          <a onClick={handleClick}><MdArrowRight /></a>
        </section>
      </div>
    </div>
  );
};

export default ProjectName;
