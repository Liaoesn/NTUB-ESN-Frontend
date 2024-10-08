import styles from "@/styles/components/popup/project/projectFilePopup.module.scss";
import React, { useState } from "react";
import { MdOutlineCancel, MdFileUpload } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface ProjectFileInputProps {
  onClose: () => void;
}

const ProjectFileInput: React.FC<ProjectFileInputProps> = ({ onClose }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [filesName, setFilesName] = useState<string>('點擊或拖動文件到這裡上傳');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
    setFilesName(event.target.files ? event.target.files[0].name : '');
  };

  return (
    <div className={styles.popupBG}>
      <div className={styles.mainShow}>
        <section className={styles.title}>
          <h4>學生文件檔案(請壓成.zip檔案)</h4>
          <a onClick={onClose} className={styles.closeButton}>
            <MdOutlineCancel />
          </a>
        </section>
        <section className={styles.inputArea}>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            multiple
            accept=".zip" 
            className={styles.hiddenInput}
          />
          <label htmlFor="file" className={styles.fileArea}>
            <MdFileUpload className={styles.donloadicon} />
            {filesName}
          </label>
        </section>
        <a className={`${styles.button} ${styles.check}`} onClick={onClose}>
          <FaCheck />
        </a>
      </div>
    </div>
  );
}

export default ProjectFileInput;