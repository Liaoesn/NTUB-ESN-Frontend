import Image from "next/image";
import Link from "next/link";
import { VscSignOut } from "react-icons/vsc";

import styles from "@/styles/components/common/navbar.module.scss";
import logo from "@/public/img/navLogo.png";
import photo from "@/public/img/head.jpg";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Link href={"/"}>
        <Image src={logo} alt={"logo"} className={styles.navLogo}/>
      </Link>
      <div className={styles.right}>
        <div className={styles.triangleArea}>
          <span className={styles.lTriangle}></span>
          <span className={styles.rTriangle}></span>
        </div>
        <div className={styles.buttonArea}>
          <Link href={"/AboutUser"} className={styles.linkUser}>
            <Image src={photo} alt={"user"} />
            <p>LiaoYiChen</p>
          </Link>
          <Link href={"/AboutUser"} className={styles.linkLogout}>
            <VscSignOut />
          </Link>
        </div>
      </div>
    </nav>
  );
}
