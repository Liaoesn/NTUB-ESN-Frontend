import styles from "@/styles/components/popup/project/projectNamePopup.module.scss";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from 'react';
import { MdArrowRight } from "react-icons/md";

interface ProjectNamePopupProps { 
    College: (value: string) => void;
    ProjectName: (value: string) => void;
    CollegeValue: string | undefined;
    ProjectNameValue : string | undefined;
    onNext: () => void;
}

const ProjectName: React.FC<ProjectNamePopupProps> = ({ 
    College, ProjectName, ProjectNameValue, onNext}) => {

    const [projectNameValue, setProjectNameValue] = useState<string>('');
    const [collegeValue, setCollegeValue] = useState<string>('');
    const handlecollegeChange = (event: React.ChangeEvent<{}>, value: string | null) => {
        if (value) setCollegeValue(value);
    };

    const handleProjectNameChange = (event: SelectChangeEvent) => {
        setProjectNameValue(event.target.value);
    };

    const handleClick = () => {
        // 更新父組件中的 college 和 projectName
        College(collegeValue);
        ProjectName(projectNameValue);
        onNext();
    };

    return (
        <div className={styles.popupBG}>
            <div className={styles.mainShow}>
                <section className={styles.title}>
                    <h4>輸入名稱和選擇學制與年度</h4>
                </section>
                <section className={styles.inputArea}>
                    <Autocomplete
                        sx={{ m: 2, height: 13 }}
                        className={styles.Input}
                        id="free-solo-demo"
                        freeSolo
                        options={[]}
                        value={ProjectNameValue}
                        onChange={() => handleProjectNameChange}
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
                                onChange={() => handlecollegeChange}
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
