
import styles from "@/styles/components/popup/project/projectChoosePopup.module.scss";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import router from "next/router";
import FailPopup from "../failPopup";

interface ProjectChoosePopup {
    onClose: () => void;
    oldType?: string;
    prono?: string;
}
const ProjectChoosePopup: React.FC<ProjectChoosePopup> = ({ onClose, oldType, prono }) => {
    const [college, setCollege] = React.useState(oldType);
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newCollege: string,
    ) => {
        setCollege(newCollege);
    };

    const onSubmit = async () => {
        if (college) {
          try {
            // 發送 POST 請求
            await axios.post(`/api/project/update/type`, {
                'type':college,
                prono
            });
      
            // 提交成功後可以進行跳轉或顯示成功訊息
            router.push(`/projectManage/list`);
            
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
                <section className={styles.title}>
                    <h4>審核方式</h4>
                    <a onClick={onClose} className={styles.closeButton}>
                        <MdOutlineCancel />
                    </a>
                </section>
                <section className={styles.inputArea}>
                    <ToggleButtonGroup
                        color="success"
                        value={college}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton size="large" value="1">全部分配</ToggleButton>
                        <ToggleButton size="large" value="2">平均分配</ToggleButton>
                    </ToggleButtonGroup>
                </section>
                <a className={`${styles.button} ${styles.check}`} onClick={onSubmit}><FaCheck /></a>
            </div>
        </div>
    );
}

export default ProjectChoosePopup;
