
import styles from "@/styles/components/popup/project/projectTimeSetPopup.module.scss";
import axios from "axios";
import router from "next/router";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import FailPopup from "../failPopup";

interface ProjectTimeProps {
    onClose: () => void;
    oldSDate: Date;
    oldEDate: Date;
    prono?:string;
}
const ProjectTimeSet: React.FC<ProjectTimeProps> = ({ onClose, oldSDate, oldEDate, prono }) => {
    const [startDate, setStartDate] = useState(oldSDate.toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(oldEDate.toISOString().split('T')[0]);
    const [showPopup, setShowPopup] = useState(false);
    const today = new Date().toISOString().split('T')[0];
    console.log(startDate)
    const handleStartDateChange = (e: any) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: any) => {
        setEndDate(e.target.value);
    };

    const onSubmit = async () => {
        if (startDate && endDate) {
          try {
            // 發送 POST 請求
            await axios.post(`/api/project/update/date`, {
              'phase1':startDate,
              endDate,
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
                    <h4>輸入基本日期設定</h4>
                    <a onClick={onClose} className={styles.closeButton}>
                        <MdOutlineCancel />
                    </a>
                </section>
                <section className={styles.inputArea}>
                    <div className={styles.time}>
                        <label htmlFor="start-date">第一階段結束日期:</label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            min={today} // 第一個日期只能選今天或之後
                        />
                    </div>
                    <div className={styles.time}>
                        <label htmlFor="end-date">整體專案結束日期:</label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={handleEndDateChange} 
                            min={startDate || today} // 第二個日期只能選擇第一個日期之後
                            disabled={!startDate} // 如果未選擇開始日期，禁用第二個日期選擇器
                        />
                    </div>
                </section>
                <a className={`${styles.button} ${styles.check}`} onClick={onSubmit}><FaCheck /></a>
            </div>
        </div>
    );
}

export default ProjectTimeSet;
