import Image from "next/image";
import Link from "next/link";
import GnbComponent from "@components/sementic/header/components/gnb.components";
import UserBtnComponent from "@components/sementic/header/components/userBtn.components";
import UserStateomponent from '@components/page/user/UserState';
import styles from "./header.module.scss";

export default function HeaderPageComponent() {

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_container}>
          <div className={`${styles.center_area} ${styles.inner}`}>
            <Link
              href={'/'}
              className={styles.logo}
            >
              <Image
                src="/images/main_logo.png"
                width={100}
                height={65}
                alt="메인 로고"
                priority
              />
            </Link>
            <nav className={styles.gnb}>
              <GnbComponent />
              <UserBtnComponent />
            </nav>
          </div>
        </div>
      </header >
      <UserStateomponent />
    </>
  );
}
