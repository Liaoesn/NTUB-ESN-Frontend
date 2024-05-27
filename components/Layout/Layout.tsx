import Head from "next/head";

import NavBar from "@/components/common/NavBar";
import styles from "@/styles/components/layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>履人</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="NTUB IMD ESN" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={styles.layout}>
        {children}
      </div>
    </>
  );
}
