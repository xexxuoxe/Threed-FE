import Image from "next/image";
import Link from "next/link";
import GnbComponent from "@components/sementic/m/header/components/gnb.components";
import UserBtnComponent from "@components/sementic/m/header/components/userBtn.components";
import styles from "./header.module.scss";

export default function HeaderPageComponent() {

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={`${styles.center_area} ${styles.inner}`}>
          <div className={styles.nav}>
            <Link
              href={'/'}
              className={styles.logo}
            >
              <Image
                src="/images/main_logo.png"
                fill={true}
                alt="메인 로고"
                priority
              />
            </Link>
            <UserBtnComponent />
          </div>
          <div className={styles.gnb}>
            <GnbComponent />
          </div>
        </div>
      </div>
    </header >
  );
}
