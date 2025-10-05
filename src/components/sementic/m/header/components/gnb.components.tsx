'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { isSession } from "@lib/session/useAuthCheck";
import styles from "./gnb.module.scss";

export default function GnbComponent() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    setSession(isSession());
  }, []);

  return (
    <div className={styles.nav_menu}>
      <Link href="/blog">기술블로그</Link>
      <Link href="/bookmark" className={session ? styles.on : styles.off}>MY북마크</Link>
    </div>
  );
}