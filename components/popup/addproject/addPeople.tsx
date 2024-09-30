import styles from "@/styles/components/popup/project/projectPeoplePopup.module.scss";
import React, { useState } from "react";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

interface ProjectPeoplePopupProps {
    People: (value: number) => void;
    onNext: () => void;
    onBack: () => void;
}

const ProjectPeoplePopup: React.FC<ProjectPeoplePopupProps> = ({ People, onNext, onBack}) => {

    // 預設為空，或可以設置預設值
    const [peopleValue, setPeopleValue] = useState<number>(0);

    // 取得輸入框的值並更新狀態
    const handleProjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setPeopleValue(value);
        }
    };

    const handleClick = () => {
        People(peopleValue);
        onNext();
    };

    return (
        <div className={styles.popupBG}>
            <div className={styles.mainShow}>
                <section className={styles.title}>
                    <h4>輸入錄取人數</h4>
                </section>
                <section className={styles.inputArea}>
                    <input type="number" value={peopleValue} onChange={handleProjectChange} /><p>人</p>
                </section>
                <section className={styles.showStep}>
                    <a onClick={onBack}><MdArrowLeft /></a>
                    <p>4/5</p>
                    <a onClick={handleClick}><MdArrowRight /></a>
                </section>
            </div>
        </div>
    );
}

export default ProjectPeoplePopup;
