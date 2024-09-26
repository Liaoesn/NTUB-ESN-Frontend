
import styles from "@/styles/components/popup/project/projectPeoplePopup.module.scss";
import React from "react";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";


const ProjectPeoplePopup = () => {
    return (
        <div className={styles.popupBG}>
            <div className={styles.mainShow}>
                <section className={styles.title}>
                    <h4>輸入名稱和選擇學制與年度</h4>
                </section>
                <section className={styles.inputArea}>
                    <input type="number" /><p>人</p>
                </section>
            </div>
        </div>
    );
}

export default ProjectPeoplePopup;
