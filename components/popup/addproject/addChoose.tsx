
import styles from "@/styles/components/popup/project/projectChoosePopup.module.scss";
import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const ProjectChoosePopup = () => {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };


  return (
    <div className={styles.popupBG}>
      <div className={styles.mainShow}>
        <section className={styles.title}>
          <h4>審核方式</h4>
        </section>
        <section className={styles.inputArea}>
          <ToggleButtonGroup
            color="success"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton size="large" value="web">全部分配</ToggleButton>
            <ToggleButton size="large" value="android">平均分配</ToggleButton>

          </ToggleButtonGroup>
        </section>
      </div>
    </div>
  );
}

export default ProjectChoosePopup;
