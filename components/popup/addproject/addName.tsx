
import styles from "@/styles/components/popup/project/projectNamePopup.module.scss";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';

interface ProjectNamePopupProps {
  Alignment: (value:string) => void;
  FilesName: (value:string) => void;
}

const ProjectName: React.FC<ProjectNamePopupProps> = ({ Alignment, FilesName}) => {
  const handleChange = (value:string) => {
    Alignment(value)
  }
  
    return (
        <div className={styles.popupBG}>
            <div className={styles.mainShow}>
                <section className={styles.title}>
                    <h4>輸入名稱和選擇學制與年度</h4>
                </section>
                <section className={styles.inputArea}>
                    <Autocomplete
                        sx={{ m: 2, height: 15, }}
                        className={styles.Input}
                        id="free-solo-demo"
                        freeSolo options={[]}
                        onChange={()=> handleChange}
                        renderInput={(params) => <TextField {...params} label="輸入專案名稱" />}
                    />
                    <article className={styles.type}>
                        <FormControl sx={{ minWidth: 575}}>
                            <InputLabel id="demo-simple-select-label">學制</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="academic"
                                name="academic"
                                onChange={() => FilesName}
                            >
                                <MenuItem value={10}>二技</MenuItem>
                                <MenuItem value={20}>四技</MenuItem>
                                <MenuItem value={30}>碩士</MenuItem>
                                <MenuItem value={30}>博士</MenuItem>
                            </Select>
                        </FormControl>
                    </article>
                </section>
            </div>
        </div>
    );
}

export default ProjectName;
