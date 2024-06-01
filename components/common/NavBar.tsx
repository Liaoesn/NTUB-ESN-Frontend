import Image from "next/image";
import Link from "next/link";
import { VscSignOut } from "react-icons/vsc";
import styles from "@/styles/components/common/navbar.module.scss";
import logo from "@/public/img/navLogo.png";

export default function NavBar({ user }: { user?: { name: string, picture: string } }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.buttonList}>
        <Link href={"/"}>
          <Image src={logo} alt={"logo"} className={styles.navLogo}/>
        </Link>
        {user && (
          <ul className={styles.button}>
            <li><Link href={"/project/list"}>歷年專案</Link></li>
            <li><Link href={"/project/manageList"}>專案管理</Link></li>
            <li><Link href={"/project/list"}>帳號管理</Link></li>
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
              <Link href={"/AboutUser"} className={styles.linkUser}>
                <>
                  <Image src={user.picture} alt={"user"} width={110} height={110}/>
                  <p>{user.name}</p>
                </>
              </Link>
              <Link href={"/api/auth/logout"} className={styles.linkLogout}>
                <VscSignOut />
              </Link>
            </>
          ) : (
            <Link href={"/api/auth/login"} className={styles.linkLogin}>登入</Link>
          )}
        </div>
      </div>
  </nav>
  );
}
