import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import CheckPopup from '@/components/popup/checkPopup';
import { useEffect } from 'react';

export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <CheckPopup title={'成功登入'} />
    </Layout>
  );
}
