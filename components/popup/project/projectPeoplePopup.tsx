
import styles from "@/styles/components/popup/project/projectPeoplePopup.module.scss";
import React from "react";
import { MdOutlineCancel, MdArrowRight, MdArrowLeft} from "react-icons/md";

interface ProjectPeoplePopup {
    onClose: () => void;
}

const ProjectPeoplePopup: React.FC<ProjectPeoplePopup> = ({ onClose }) => {
    return(
        <div className={styles.popupBG}>
            <div className={styles.mainShow}>
                <section className={styles.title}>
                    <h4>輸入名稱和選擇學制與年度</h4>
                    <a onClick={onClose} className={styles.closeButton}>
                        <MdOutlineCancel />
                    </a>
                </section>
                <section className={styles.inputArea}>
                    <input type="number"/><p>人</p>
                </section>
            </div>
        </div>
    );
}

export default ProjectPeoplePopup;
