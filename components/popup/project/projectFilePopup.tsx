import styles from "@/styles/components/popup/project/projectFilePopup.module.scss";
import React from "react";
import { MdOutlineCancel, MdFileUpload } from "react-icons/md";
import { MuiFileInput } from 'mui-file-input'

interface ProjectFileInputProps {
    onClose: () => void;
}

const ProjectFileInput: React.FC<ProjectFileInputProps> = ({ onClose }) => {
    const [file, setFile] = React.useState<File | null>(null);

    const handleChange = (newFile: File | File[] | null) => {
        if (newFile instanceof File || newFile === null) {
            setFile(newFile);
        } else {
            setFile(null);
        }
    };

    return (
        <div className={styles.popupBG}>
            <div className={styles.mainShow}>
                <section className={styles.title}>
                    <h4>學生文件或檔案</h4>
                    <a onClick={onClose} className={styles.closeButton}>
                        <MdOutlineCancel />
                    </a>
                </section>
                <section className={styles.inputArea}>
                    <MdFileUpload className={styles.donloadicon}/>
                    <MuiFileInput value={file} onChange={handleChange} />
                </section>
            </div>
        </div>
    );
}

export default ProjectFileInput;