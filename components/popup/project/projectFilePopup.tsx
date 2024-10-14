import styles from "@/styles/components/popup/project/projectFilePopup.module.scss";
import React, { useState } from "react";
import { MdOutlineCancel, MdFileUpload } from "react-icons/md"; // 匯入取消和上傳的圖示
import { FaCheck } from "react-icons/fa"; // 匯入提交確認的圖示

// 定義組件的 props 接口，確保傳遞了 `onClose` 函數
interface ProjectFileInputProps {
  onClose: () => void; // 用於關閉彈出視窗的函數
}

// 主組件
const ProjectFileInput: React.FC<ProjectFileInputProps> = ({ onClose }) => {
  const [files, setFiles] = useState<FileList | null>(null); // 用於儲存上傳的文件
  const [filesName, setFilesName] = useState<string>('點擊或拖動文件到這裡上傳'); // 顯示上傳檔案的名稱或預設文字

  // 處理檔案變更的函數
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files); // 設定上傳的檔案
    setFilesName(event.target.files ? event.target.files[0].name : ''); // 顯示第一個上傳的檔案名稱，若無則顯示空字串
  };

  return (
    <div className={styles.popupBG}> {/* 背景區域 */}
      <div className={styles.mainShow}> {/* 主內容區域 */}
        <section className={styles.title}> {/* 標題區域 */}
          <h4>學生文件檔案(請壓成.zip檔案)</h4> {/* 顯示彈出視窗的標題 */}
          <a onClick={onClose} className={styles.closeButton}> {/* 點擊關閉按鈕 */}
            <MdOutlineCancel /> {/* 取消的圖示 */}
          </a>
        </section>
        <section className={styles.inputArea}> {/* 上傳檔案區域 */}
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange} // 當檔案變更時，呼叫處理檔案變更的函數
            multiple
            accept=".zip"  // 限制只接受 .zip 檔案
            className={styles.hiddenInput} // 隱藏的檔案輸入區域
          />
          <label htmlFor="file" className={styles.fileArea}> {/* 上傳檔案區域的顯示 */}
            <MdFileUpload className={styles.donloadicon} /> {/* 上傳檔案的圖示 */}
            {filesName} {/* 顯示上傳檔案的名稱或預設文字 */}
          </label>
        </section>
        <a className={`${styles.button} ${styles.check}`} onClick={onClose}> {/* 確認按鈕 */}
          <FaCheck /> {/* 確認的圖示 */}
        </a>
      </div>
    </div>
  );
}

export default ProjectFileInput;
3