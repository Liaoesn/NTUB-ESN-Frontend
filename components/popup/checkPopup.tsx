import React, { useEffect, useState } from "react";
import styles from "@/styles/components/popup/checkPopup.module.scss";
import { FaRegGrinSquint } from "react-icons/fa";

interface CheckPopupProps {
  title: string;
}

const CheckPopup: React.FC<CheckPopupProps> = ({ title }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isVisible && (
        <div className={styles.popupBG}>
          <div className={styles.mainShow}>
            <FaRegGrinSquint className={styles.icon} />
            <h3>{title}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckPopup;
