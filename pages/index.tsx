import { FaGoogle } from "react-icons/fa";
import Image from "next/image";

import Layout from '../components/Layout/Layout';
import logo from '@/public/img/logo.png'
import styles from '@/styles/Home.module.scss'

export default function Home() {

  const handleGoogleLogin = () => {
    // 將這個URL發送給前端，用戶點擊後將重定向到Google登入頁面
    window.location.href = '/api/login';
  };

  return (
    <Layout>
      <main className={styles.login}>
        <Image src={logo} alt='logo' />
        <a className={styles.loginButtton} onClick={handleGoogleLogin}><FaGoogle/></a>
      </main>
    </Layout>
  );
}
