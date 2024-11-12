import userInterface from '../../type/userInterface';
import styles from '@/styles/page/user/list.module.scss';
import React, { useState, useEffect } from 'react';
import { FaMinusCircle } from "react-icons/fa";
import { TbProgressBolt } from "react-icons/tb";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router';

interface proProps {
  user: userInterface;
  permissionNames: Record<string, string>;
  editable: boolean;
  onUpdate: (updatedUser: userInterface) => void;
  onEnable: (user_no: number, user_name: string) => void;
  onDisable: (user_no: number, user_name: string) => void;
}

function User({ user, permissionNames, editable, onUpdate, onEnable, onDisable }: proProps) { // 改为大写的 User
  const router = useRouter();
  const [userData, setUserData] = useState<userInterface>({
    user_no: 0,
    user_name: '',
    email: '',
    avatar_url: '',
    permissions: '',
    permissionsName: '',
    state: ''
  });

  useEffect(() => {
    onUpdate(userData);
    setUserData(user);
  }, [userData]);

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    if (name === 'permission' && router.isReady && userData) {
      setUserData((userData) => ({
        ...userData,
        permissions: value,
        permissionsName: permissionNames[value]
      }));
    }
  };

  const toggleState = (state: string) => {
    if (state === '0') {
      onDisable(userData.user_no, userData.user_name);
    } else {
      onEnable(userData.user_no, userData.user_name);
    }
  };

  return (
    <div className={styles.userItem}>
      <article>
        <div className={styles.userLogo}>
          <img src={userData.avatar_url} alt="User Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
        </div>
        <div className={styles.userContent}>
          <b>{userData.user_name}</b>
        </div>
        <div className={styles.userMail}>
          <b>{userData.email}</b>
        </div>
        <div className={styles.itemRadius}>
          <p>{user?.permissionsName}</p>
        </div>
        {editable ? (
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
        ) : (
          <div className={styles.marginRight}></div>
        )}
        <div> {editable && userData.state === '1' ? <FaMinusCircle onClick={() => toggleState('0')} /> : ''} </div>
        <div> {editable && userData.state === '0' ? <TbProgressBolt onClick={() => toggleState('1')} /> : ''} </div>
      </article>
    </div>
  );
}

export default User;