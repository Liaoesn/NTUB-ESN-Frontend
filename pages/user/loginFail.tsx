import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import CheckPopup from '@/components/popup/checkPopup';
import { useEffect } from 'react';
import FailPopup from '@/components/popup/failPopup';

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
      <FailPopup title={'請使用學校帳號登入'} />
    </Layout>
  );
}
