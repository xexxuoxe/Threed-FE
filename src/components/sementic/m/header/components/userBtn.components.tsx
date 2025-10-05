'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { isSession } from "@lib/session/useAuthCheck";
import styles from "./userBtn.module.scss";

export default function UserBtnComponent() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    setSession(isSession());
  }, []);

  const logout = () => {
    document.cookie = "accessToken=; Path=/; Max-Age=0";
    setSession(false);
    window.location.reload();
  };

  return (
    <div className={styles.nav_icons}>
      <Link href="/post/write" className={session ? styles.on : styles.off}>
        <div className={`${styles.icon} ${styles.write_icon}`}></div>
      </Link>
      <Link href="/login" className={session ? styles.off : styles.on}>
        <div className={`${styles.icon} ${styles.login_icon}`}></div>
      </Link>
      <button type="button" onClick={logout} className={session ? styles.on : styles.off}>
        <div className={`${styles.icon} ${styles.ico_logout}`}></div>
      </button>
      <Link href={'/userpage'} className={session ? styles.on : styles.off}>
        <div className={`${styles.icon} ${styles.ico_mypage}`}></div>
      </Link>
    </div>
  );
}
