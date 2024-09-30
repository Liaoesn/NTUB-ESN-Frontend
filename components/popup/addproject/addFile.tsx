import styles from "@/styles/components/popup/project/projectFilePopup.module.scss";
import React, { useState } from "react";
import { MdArrowRight, MdArrowLeft, MdFileUpload } from "react-icons/md";

interface ProjectFilePopupProps {
  File: (value: FileList | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProjectFileInput: React.FC<ProjectFilePopupProps> = ({File, onNext, onBack }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [filesName, setFilesName] = useState<string>('點擊或拖動文件到這裡上傳');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
    setFilesName(event.target.files ? event.target.files[0].name : '');
  };

  const handleClick = () => {
    File(files);
    onNext();
  };

  return (
    <div className={styles.popupBG}>
      <div className={styles.mainShow}>
        <section className={styles.title}>
          <h4>學生文件檔案(請壓成.zip檔案)</h4>
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
        <section className={styles.showStep}>
          <a onClick={onBack}><MdArrowLeft /></a>
          <p>3/5</p>
          <a onClick={handleClick}><MdArrowRight /></a>
        </section>
      </div>
    </div>
  );
}

export default ProjectFileInput;