import styles from "@/styles/components/popup/project/projectFilePopup.module.scss";
import React, { useState } from "react";
import { MdOutlineCancel, MdFileUpload } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface ProjectFileInputProps {
  onClose: () => void;
}

const ProjectFileInput: React.FC<ProjectFileInputProps> = ({ onClose }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [filesName, setFilesName] = useState<number>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files); // 传递文件列表给父组件
    if (files) {
      setFilesName(files.item as number);
    }
  };

  console.log(files);
  console.log(filesName);

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
            點擊或拖動文件到這裡上傳
          </label>
        </section>
        {/* 提交按钮 */}
        <a className={`${styles.button} ${styles.check}`} onClick={onClose}>
          <FaCheck />
        </a>
      </div>
    </div>
  );
}

export default ProjectFileInput;