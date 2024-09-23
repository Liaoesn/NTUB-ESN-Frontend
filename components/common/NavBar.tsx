import Image from "next/image";
import Link from "next/link";
import { VscSignOut } from "react-icons/vsc";
import styles from "@/styles/components/common/navbar.module.scss";
import logo from "@/public/img/navLogo.png";
import React from 'react';

interface NavbarProps {
  user?: { username: string; avatar_url: string } | undefined;
}

const NavBar = React.memo(({ user }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.buttonList}>
        <Link href={"/"}>
          <Image src={logo} alt={"logo"} className={styles.navLogo} />
        </Link>
        {user && (
          <ul className={styles.button}>
            <li><Link href={"/project/list"}>歷年專案</Link></li>
            <li><Link href={"/projectManage/list"}>專案管理</Link></li>
            <li><Link href={"/userManage/list"}>帳號管理</Link></li>
          </ul>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.triangleArea}>
          <span className={styles.lTriangle}></span>
          <span className={styles.rTriangle}></span>
        </div>
        <div className={styles.buttonArea}>
          {user ? (
            <>
              <Link href={"/aboutUser/list"} className={styles.linkUser}>
                <>
                  <Image src={user.avatar_url} alt={"user"} width={110} height={110} priority />
                  <p>{user.username}</p>
                </>
              </Link>
              <Link href="http://localhost:5000/api/auth/logout" className={styles.linkLogout}>
                <VscSignOut />
              </Link>
            </>
          ) : (
            <Link href={"/api/auth/login"} className={styles.linkLogin}></Link>
          )}
        </div>
      </div>
    </nav>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;
