import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/user/list.module.scss'
import { Box, FormControl, Input, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import Link from 'next/link';
import { FaAngleLeft, FaAngleRight,FaPen,FaCheck,} from "react-icons/fa";
import { VscChromeClose  } from "react-icons/vsc";
import { LuSearch } from "react-icons/lu";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import UserRow from './user';
import userInterface from './userInterface';
import axios from 'axios';
import PrivateRoute from '../privateRoute';
import userI from '../userI';
import DisableConfirm from '@/components/popup/confirmPopup';

function UserManageList({ user }: { user: userI | undefined }) {
  // 使用者清單
  const [users, setUsers] = useState<userInterface[]>([]);

  // 權限清單
  const [permissionNames, setPermissionNames] = useState<Record<string, string>>({});

  // 查詢參數
  const [term, setTerm] = useState<String>('');
  const [permissions, setPermissions] = useState('');
  const [state, setState] = useState('1');
  const [page, setPage] = useState<number>(1);
  
  // 是否為修改狀態
  const [editable, setEditable] = useState<Boolean>(false);

  // 用於修改使用者狀態
  const [confirmMsg, setConfirmMsg] = useState<string>();
  const [targetUser, setTargetUser] = useState<number>();
  const [targetState, setTargetState] = useState<string>();

  // 彈出視窗
  const [showConfirm, setShowConfirm] = useState<Boolean>(false);
  


  // api 取得 permissions 的 mapping 清單
  useEffect(() => {
    const fetchPermissionNames = async () => {
      try {
        const response = await axios.get('/api/user/getRole');
        setPermissionNames(response.data.roleMap);
        console.log('permissionNames:', response.data.roleMap);

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchPermissionNames();
  },[]);

  // api 取得 user list
  useEffect(() => {
    fetchData();
}, [permissions, state, term, page]);

  const fetchData = async () => {
    try {
      await axios.get('/api/user/list', {
        params: { 
          permissions: permissions === 'all' ? '' : permissions, 
          state: state === 'all' ? '' : state, 
          term: term,
          page 
        }
      }).then((response) => {
        setUsers(response.data);
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // 處理 Selector 變更
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
  
    if (name === 'permissions') {
      setPermissions(value);  // 保持为 'all' 或者具体的年份
    }

    if (name === 'state') {
      setState(value);  // 保持为 'all' 或者具体的年份
    }
  };

  // 處理 Input 變更
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'term') {
      setTerm(value != null ? value : '');
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const toggleEditable = () => {
    setEditable(prevEditable => !prevEditable);
  };

  const handleUpdate = (updatedUser: userInterface) => {
    console.log('Update:' + updatedUser.username + ", permissions: " +updatedUser.permissions);

    setUsers((preUsers) => preUsers.map(preUser => {
      if(preUser.userno == updatedUser.userno) {
        preUser.permissions = updatedUser.permissions;
      }

      return  preUser;
    }));
  }

  //Popup 相關
  const showEnablePopup = (userno: number, username: string) => {
    setConfirmMsg('是否確定停用' + username + '?');
    setTargetUser(userno);
    setTargetState('1');
    setShowConfirm(true);
  }

  const showDisablePopup = (userno: number, username: string) => {
    setConfirmMsg('是否確定啟用' + username + '?');
    setTargetUser(userno);
    setTargetState('0');
    setShowConfirm(true);
  }

  const closeDisablePopup = () => {
    setTargetUser(0);
    setTargetState('0');
    setShowConfirm(false);
  }

  const updateUsers = async () => {
    try {
      const updateUser = users.map(preUser =>{
        const url = '/api/user/update/' + preUser.userno;
        return axios.put(url, {
          permissions: preUser.permissions,
          state: preUser.state
        });
      })

      await Promise.all(updateUser);

      setEditable(false);
      fetchData();

    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const updateUser = async () => {
    const url = '/api/user/update/' + targetUser;
    await axios.put(url, {
      state: targetState
    }).then((response) => {
      closeDisablePopup();
      fetchData();
    });
  };

  return (
    <Layout user={user}>
      {showConfirm && <DisableConfirm content={confirmMsg} onConfirm={updateUser} onClose={closeDisablePopup}/>}
      <main className={styles.listArea}>
        <h2>人員總覽</h2>
        <section className={styles.dropdownArea}>
          <Box>
            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">職稱</InputLabel>
              <Select
                sx={{ borderRadius: 20 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={permissions}
                label="permissions"
                name="permissions"
                onChange={handleSelectChange}
              >
                <MenuItem value={'all'}>全部</MenuItem>
                {Object.entries(permissionNames).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                        {value}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className={styles.leftEndBox}>
            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">狀態</InputLabel>
              <Select
                sx={{ borderRadius: 20 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                label="state"
                name="state"
                onChange={handleSelectChange}
              >
                <MenuItem value={'all'}>全部</MenuItem>
                <MenuItem value={'1'}>啟用</MenuItem>
                <MenuItem value={'0'}>停用</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className={styles.searchBox}>
            <Input 
              id="queryTerm"
              name="term"
              disableUnderline={true}
              onChange={handleInputChange}
            />
            <LuSearch />
          </Box>
          <Box className={styles.buttonBox}>
            <section className={styles.setingButton}>
              {editable ? (
                <>
                  <a className={`${styles.button} ${styles.check} ${styles.close}`} onClick={toggleEditable}><VscChromeClose /></a>
                  <a className={`${styles.button} ${styles.check}`} onClick={updateUsers}><FaCheck/></a>

                </>
              ) : (
                <>
                  <a className={`${styles.button} ${styles.check}`} onClick={toggleEditable}><FaPen/></a>
                </>
              )}
            </section>
          </Box>
        </section>

        <section className={styles.userList}>
        {users.map((row, index) => (
            <React.Fragment key={row.userno}>
            <UserRow user={row} permissionNames={permissionNames} editable={editable} onUpdate={handleUpdate} onEnable={showEnablePopup} onDisble={showDisablePopup}/>
            {index < users.length-1 && <hr/>}
            
          </React.Fragment>
          ))}
        </section>
        
        <section className={styles.userPage}>
          <Stack spacing={2}>
            <Pagination
              count={5}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: FaAngleLeft, next: FaAngleRight }}
                  {...item}
                />
              )}
            />
          </Stack>
        </section>
      </main>
    </Layout>
  );
}
export default function Init() {
  const [user, setUser] = useState<userI>();

  return (
    <PrivateRoute>
      <UserManageList user={user} />
    </PrivateRoute>
  );
}