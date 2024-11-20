
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
    // 日期加一天的函數
    function addOneDay(date: Date): string {
        const newDate = new Date(date); // 創建新日期物件
        newDate.setDate(newDate.getDate() + 1); // 日期加一天
        return newDate.toISOString().split('T')[0]; // 返回 yyyy-MM-dd 格式
    }

    const [startDate, setStartDate] = useState(addOneDay(oldSDate));
    const [endDate, setEndDate] = useState(addOneDay(oldEDate));
    const [showPopup, setShowPopup] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    const handleStartDateChange = (e: any) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: any) => {
        setEndDate(e.target.value);
    };

    const onSubmit = async () => {
        if (startDate && endDate) {
            try {
                await axios.post(`/api/project/update/date`, {
                    'phase1': startDate,
                    'end_date': endDate,
                    'pro_no': prono
                });

                onClose();
                router.push(`/projectManage/${prono}/edit`);
            } catch (error) {
                console.error('Error while updating project:', error);
            }
        } else {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                onClose();
                router.push(`/projectManage/${prono}/edit`);
            }, 2000);
        }
    };

    return (
        <div className={styles.popupBG}>
            {showPopup ? <FailPopup title={'有資料為空'} /> : ''}
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
                            min={today}
                        />
                    </div>
                    <div className={styles.time}>
                        <label htmlFor="end-date">整體專案結束日期:</label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            min={startDate || today}
                            disabled={!startDate}
                        />
                    </div>
                </section>
                <a className={`${styles.button} ${styles.check}`} onClick={onSubmit}><FaCheck /></a>
            </div>
        </div>
    );
}


export default ProjectTimeSet;
