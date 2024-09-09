
import styles from "@/styles/components/popup/project/projectNamePopup.module.scss";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import React from "react";
import { MdOutlineCancel, MdArrowRight, MdArrowLeft} from "react-icons/md";

interface ProjectNamePopupProps {
    onClose: () => void;
  }
const ProjectNamePopup: React.FC<ProjectNamePopupProps> = ({ onClose }) => {
    const [academic, setAcademic] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.name == 'academic') {
            setAcademic(event.target.value);
        };
    };

    return (
        <div className={styles.popupBG}>
            <div className={styles.mainShow}>
                <section className={styles.title}>
                    <h4>輸入名稱和選擇學制與年度</h4>
                    <a onClick={onClose} className={styles.closeButton}>
                        <MdOutlineCancel />
                    </a>
                </section>
                <section className={styles.inputArea}>
                    <Autocomplete
                        sx={{ m: 2, height: 15, }}
                        className={styles.Input}
                        id="free-solo-demo"
                        freeSolo options={[]}
                        renderInput={(params) => <TextField {...params} label="輸入專案名稱" />}
                    />
                    <article className={styles.year}>
                        <Stack spacing={2} sx={{ width: 300 }}>
                            <Autocomplete
                                className={styles.Input}
                                id="free-solo-demo"
                                freeSolo options={[]}
                                renderInput={(params) => <TextField {...params} label="輸入學年度" />}
                            />
                        </Stack>
                        <FormControl sx={{ minWidth: 250 }}>
                            <InputLabel id="demo-simple-select-label">學制</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={academic}
                                label="academic"
                                name="academic"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>二技</MenuItem>
                                <MenuItem value={20}>四技</MenuItem>
                                <MenuItem value={30}>碩士</MenuItem>
                                <MenuItem value={30}>博士</MenuItem>
                            </Select>
                        </FormControl>
                    </article>
                </section>
            </div>
        </div>
    );
}

export default ProjectNamePopup;
