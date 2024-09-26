
import styles from "@/styles/components/popup/project/projectTimeSetPopup.module.scss";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const ProjectTimeSet = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const today = new Date().toISOString().split('T')[0];

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
    return (
        <div className={styles.popupBG}>
            <div className={styles.mainShow}>
                <section className={styles.title}>
                    <h4>輸入基本日期設定</h4>
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
            </div>
        </div>
    );
}

export default ProjectTimeSet;
