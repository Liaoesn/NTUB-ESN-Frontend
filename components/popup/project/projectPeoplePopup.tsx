import styles from "@/styles/components/popup/project/projectPeoplePopup.module.scss";
import axios from "axios";
import router from "next/router";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import FailPopup from "../failPopup";

interface ProjectPeoplePopup {
    onClose: () => void;
    oldNumber?: number;
    prono?: string;
}

const ProjectPeoplePopup: React.FC<ProjectPeoplePopup> = ({ onClose, prono, oldNumber }) => {
    const [num, setNum] = useState<number>(oldNumber || 0); // 設定初始值，避免 undefined
    const [showPopup, setShowPopup] = useState(false);

    const onSubmit = async () => {
        if (num) {
          try {
            // 發送 POST 請求
            await axios.post(`/api/project/update/admissions`, {
              admissions: num, // 記得要傳遞正確的屬性名稱
              prono
            });
            // 提交成功後進行跳轉
            onClose();
            router.push(`/projectManage/${prono}/edit`);
            
          } catch (error) {
            console.error('Error while updating project:', error);
            // 處理錯誤訊息
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
            { showPopup && <FailPopup title={'有資料為空'} /> }
            <div className={styles.mainShow}>
                <section className={styles.title}>
                    <h4>輸入錄取人數</h4>
                    <a onClick={onClose} className={styles.closeButton}>
                        <MdOutlineCancel />
                    </a>
                </section>
                <section className={styles.inputArea}>
                    {/* 將輸入值轉換為數字 */}
                    <input
                      type="number"
                      value={num}
                      onChange={e => setNum(Number(e.target.value))} 
                    />
                    <p>人</p>
                </section>
                <a className={`${styles.button} ${styles.check}`} onClick={onSubmit}><FaCheck /></a>
            </div>
        </div>
    );
}

export default ProjectPeoplePopup;