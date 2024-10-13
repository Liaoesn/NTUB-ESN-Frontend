
import styles from "@/styles/components/popup/project/projectNamePopup.module.scss";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import axios from "axios";
import router from "next/router";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import FailPopup from "../failPopup";

interface ProjectNamePopupProps {
    onClose: () => void;
    oldselet?:string;
    oldtitle?:string;
    prono?:string;
  }
const ProjectNamePopup: React.FC<ProjectNamePopupProps> = ({ onClose, prono, oldselet, oldtitle }) => {
    const [title, setTitle] = useState(oldtitle)
    const [prodescription, setProdescription] = useState(oldselet)
    const [showPopup, setShowPopup] = useState(false);


    console.log(prono)
    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.name == 'academic') {
            setProdescription(event.target.value);
        };
    };

    const handleInputChange = (_event: any, newInputValue: any) => {
        setTitle(newInputValue);
    };

    const onSubmit = async () => {
        if (title && prodescription) {
          try {
            // 發送 POST 請求
            await axios.post(`/api/project/update/name`, {
              title,
              prodescription
            }, {
              params: { prono }  // 透過 query 傳遞 prono
            });
      
            // 提交成功後可以進行跳轉或顯示成功訊息
            router.push(`/projectManage/${prono}`);
            
          } catch (error) {
            console.error('Error while updating project:', error);
            // 可以根據情況顯示錯誤訊息給使用者
          }
      
        } else {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            router.push(`/projectManage/${prono}/edit`);
          }, 2000);
        }
      };
      

    return (
        <div className={styles.popupBG}>
            { showPopup ? <FailPopup title={'有資料為空'}/> : '' }
            <div className={styles.mainShow}>
                <p>資料不可為空</p>
                <section className={styles.title}>
                    <h4>輸入名稱和選擇學制與年度</h4>
                    <a onClick={onClose} className={styles.closeButton}>
                        <MdOutlineCancel />
                    </a>
                </section>
                <section className={styles.inputArea}>
                    <Autocomplete
                        sx={{ m: 2, height: 15, }}
                        className={styles.Input}
                        id="free-solo-demo"
                        freeSolo options={[]}
                        value={title}
                        onInputChange = {handleInputChange}
                        renderInput={(params) => <TextField {...params} label="輸入專案名稱" />}
                    />
                    <article className={styles.type}>
                        <FormControl sx={{ minWidth: 575}}>
                            <InputLabel id="demo-simple-select-label">學制</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={prodescription}
                                label="academic"
                                name="academic"
                                onChange={handleChange}
                            >
                                <MenuItem value={'二技'}>二技</MenuItem>
                                <MenuItem value={'四技'}>四技</MenuItem>
                                <MenuItem value={'碩士'}>碩士</MenuItem>
                                <MenuItem value={'博士'}>博士</MenuItem>
                            </Select>
                        </FormControl>
                    </article>
                </section>
                <a className={`${styles.button} ${styles.check}`} onClick={onSubmit}><FaCheck /></a>
            </div>
        </div>
    );
}

export default ProjectNamePopup;
