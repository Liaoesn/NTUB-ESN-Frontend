
import styles from "@/styles/components/popup/project/projectChoosePopup.module.scss";
import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

interface ProjectChoosePopupProps {
  Type: (value: string) => void;
  submit: () => void;
  onNext: () => void;
  onBack: () => void;
}

const ProjectChoosePopup: React.FC<ProjectChoosePopupProps> = ({ Type, submit, onNext, onBack }) => {
  const [type, setType] = React.useState('all');

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: string,
  ) => {
    setType(newType);
  };

  const handleClick = () => {
    Type(type);
    onNext();submit
    console.log(`People: ${type}`);
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
            value={type}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton size="large" value="all">全部分配</ToggleButton>
            <ToggleButton size="large" value="average">平均分配</ToggleButton>

          </ToggleButtonGroup>
        </section>

        <section className={styles.showStep}>
          <a onClick={onBack}><MdArrowLeft /></a>
          <p>5/5</p>
          <a onClick={handleClick}><MdArrowRight /></a>
        </section>
      </div>
    </div>
  );
}

export default ProjectChoosePopup;
