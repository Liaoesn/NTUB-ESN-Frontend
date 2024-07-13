import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import CheckPopup from '@/components/popup/checkPopup';
import { useEffect, useState } from 'react';

interface User {
  username: string;
  avatar_url: string;
}

export default function LoginSuccess({ user }: { user: User | undefined }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <Layout user={user}>
      <CheckPopup title={'成功登入'} />
    </Layout>
  );
}
export async function getServerSideProps() {
  // 模擬從 API 或數據庫獲取 user 資料
  const user: User = {
    username: '張庭瑋',
    avatar_url: 'https://lh3.googleusercontent.com/a/ACg8ocLPmVzoA6nCM2_PuM_BUtg6mroeKngmLY1Vb29dU-2BhJuKTA=s96-c',
  };

  return {
    props: { user }, // 將 user 作為 prop 傳遞給頁面組件
  };
}