
import styles from "@/styles/components/popup/project/projectChoosePopup.module.scss";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FaCheck } from "react-icons/fa";

interface ProjectChoosePopup {
    onClose: () => void;
}
const ProjectChoosePopup: React.FC<ProjectChoosePopup> = ({ onClose }) => {
    const [college, setCollege] = React.useState('web');

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newCollege: string,
    ) => {
        setCollege(newCollege);
    };


    return (
        <div className={styles.popupBG}>
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
                        <ToggleButton size="large" value="web">全部分配</ToggleButton>
                        <ToggleButton size="large" value="android">平均分配</ToggleButton>

                    </ToggleButtonGroup>
                </section>
                <a className={`${styles.button} ${styles.check}`}><FaCheck /></a>
            </div>
        </div>
    );
}

export default ProjectChoosePopup;
