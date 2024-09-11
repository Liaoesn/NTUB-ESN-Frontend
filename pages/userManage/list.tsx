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

function UserManageList({ user }: { user: userI | undefined }) {

  const [editable, setEditable] = useState<Boolean>(false);
  const [permission, setPermission] = React.useState('');
  const [page, setPage] = React.useState<number>(1);
  const [users, setUsers] = useState<userInterface[]>([]);
  const [permissionNames, setPermissionNames] = useState<Record<string, string>>({});

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
    const fetchData = async () => {
      try {
        const response: { data: userInterface[] } = await axios.get('/api/user/list', {
          params: { 
            permission: permission === 'all' ? '' : permission, 
            page 
          }
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    fetchData();
  }, [permission, page]);

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
  
    if (name === 'permission') {
      setPermission(value);  // 保持为 'all' 或者具体的年份
      console.log('setPermission:', value);
    }

  };


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log('Current Page:', value);
  };

  const toggleEditable = () => {
    setEditable(prevEditable => !prevEditable);
  };

  return (
    <Layout user={user}>
      <main className={styles.listArea}>
        <h2>人員總覽</h2>
        <section className={styles.dropdownArea}>
          <Box className={styles.leftEndBox}>
            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">職稱</InputLabel>
              <Select
                sx={{ borderRadius: 20 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={permission}
                label="permission"
                name="permission"
                onChange={handleChange}
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
          <Box className={styles.searchBox}>
            <Input 
              id="new-input"
              disableUnderline={true}
            />
            <LuSearch />
          </Box>
          <Box className={styles.buttonBox}>
            <section className={styles.setingButton}>
              {editable ? (
                <>
                  <a className={`${styles.button} ${styles.check} ${styles.close}`} onClick={toggleEditable}><VscChromeClose /></a>
                  <a className={`${styles.button} ${styles.check}`}><FaCheck/></a>

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
            <UserRow user={row} permissionNames={permissionNames} editable={editable}/>
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