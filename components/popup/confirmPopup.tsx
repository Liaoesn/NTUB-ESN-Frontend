import React from "react";
import styles from "@/styles/components/popup/confirmPopup.module.scss";
import { Box } from '@mui/material';
import { MdOutlineCancel} from "react-icons/md";
import { FaCheck,} from "react-icons/fa";
import { VscChromeClose  } from "react-icons/vsc";

interface ProjectPeoplePopup {
    content: string | undefined;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmPopup: React.FC<ProjectPeoplePopup> = ({ content, onConfirm, onClose }) => {
    return(
        <div className={styles.popupBG} onClick={onClose}>
            <div className={styles.mainShow} onClick={(e) => e.stopPropagation()}>
                <section className={styles.title}>
                    <h4></h4>
                    <a onClick={onClose} className={styles.closeButton}>
                        <MdOutlineCancel />
                    </a>
                </section>
                <Box className={styles.contentBox}>
                    {content}
                </Box>
                <Box className={styles.btnBox}>
                    <a className={`${styles.btnConfrim}`} onClick={onConfirm}>
                        <FaCheck />
                    </a>
                    <a className={`${styles.btnCancel}`} onClick={onClose}>
                        <VscChromeClose />
                    </a>
                </Box>
            </div>
        </div>
    );
}

export default ConfirmPopup;
