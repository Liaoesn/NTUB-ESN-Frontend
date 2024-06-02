
import styles from "@/styles/components/popup/checkPopup.module.scss";
import { Autocomplete, Stack, TextField } from "@mui/material";

export default function ProjectNamePopup() {
    return (
        <div className={styles.popupBG}>
            <div className={styles.mainShow}>
                <Autocomplete
                    className={styles.Input}
                    id="free-solo-demo"
                    freeSolo options={[]}
                    renderInput={(params) => <TextField {...params} label="freeSolo" />}
                />
            </div>
        </div>
    );
}
