import userInterface from './userInterface';
import styles from '@/styles/page/user/list.module.scss';
import React, { useState, useEffect } from 'react';
import { FaMinusCircle } from "react-icons/fa";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface proProps{
    user: userInterface;
    permissionNames: Record<string, string>;
    editable: Boolean;
    onUpdate: (updatedUser: userInterface) => void;
}

function user( {user, permissionNames, editable, onUpdate} : proProps) {
    const [userData, setUserData] = useState<userInterface>(user);

    // 編輯的時候重新 setUserData

    useEffect(() => {
        setUserData(user);
    },[]);

    // 將資料 update 回 list
    useEffect(() => {
        onUpdate(userData)
    },[userData]);

    const handleChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        
        if (name === 'permission') {
            setUserData((userData) => ({
                ...userData,
                permissions: value,
                permissionsName: permissionNames[value]
            }));
        }
    };

    return (
        <div className={styles.userItem}>
            <article>
                <div className={styles.userLogo}>
                    <img src={userData.avatar_url} alt="User Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
                <div className={styles.userContent}>
                    <b>{userData.username}</b>  
                </div>
                <div className={styles.userMail}>
                    <b>{userData.email}</b>  
                </div>
                <div className={styles.itemRadius}>
                    <p>{user.permissionsName}</p>
                </div>
                { editable ?
                    <div className={styles.marginRight}>
                        <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
                        <InputLabel id="demo-simple-select-label">職稱</InputLabel>
                        <Select 
                            sx={{ borderRadius: 20 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userData.permissions}
                            label="permission"
                            name="permission"
                            onChange={handleChange}
                        >
                        {Object.entries(permissionNames).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                        </Select>
                        </FormControl>
                    </div>
                :
                    <div className={styles.marginRight}></div>
                }
                <div> { editable ? <FaMinusCircle/> : '' } </div>
            </article>
        </div>
    );
}
export default user;
