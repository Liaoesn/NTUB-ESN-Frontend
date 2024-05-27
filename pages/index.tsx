import { FaGoogle } from "react-icons/fa";
import Image from "next/image";

import Layout from '../components/Layout/Layout';
import logo from '@/public/img/logo.png'
import styles from '@/styles/Home.module.scss'

export default function Home() {
  return (
    <Layout>
      <main className={styles.login}>
        <Image src={logo} alt='logo' />
        <a className={styles.loginButtton}><FaGoogle /></a>
      </main>
    </Layout>
  );
}
