import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/user/list.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import Link from 'next/link';
import { FaAngleLeft, FaAngleRight, FaCog, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import UserRow from './user';
import userInterface from './userInterface';
import axios from 'axios';

interface User {
  username: string;
  avatar_url: string;
}

function ProjectList({ user }: { user: User | undefined }) {

  const [permission, setPermission] = React.useState('');
  const [page, setPage] = React.useState<number>(1);
  const [users, setUsers] = useState<userInterface[]>([]);

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

  return (
    <Layout user={user}>
      <main className={styles.listArea}>
        <h2>人員總覽</h2>
        <section className={styles.dropdownArea}>
          <Box sx={{ minWidth: 120 }}>
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
                <MenuItem value={'01'}>管理者</MenuItem>
                <MenuItem value={'02'}>老師</MenuItem>
                <MenuItem value={'03'}>助教</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </section>

        <section className={styles.userList}>
        {users.map((row, index) => (
            <React.Fragment key={row.userno}>
            <UserRow user={row} />
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
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push('/user/login'); // 如果沒有用戶登錄，導向登錄頁面
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/user/login');
      }
    }
    fetchUser();
  }, [router]);

  return user ? <ProjectList user={user} /> : <p>Loading...</p>;
}