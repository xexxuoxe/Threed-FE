"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import GoogleLoginButtons from "@components/page/login/components/googleLoginButtons.component";
import { isSession } from "@lib/session/useAuthCheck";
import styles from "./login.module.scss";

export default function LoginComponent() {
  const router = useRouter();

  useEffect(() => {
    if (isSession()) {
      alert("이미 로그인되어있습니다.");
      router.replace("/");
    }
  }, [router]);

  return (
    <>
      <main className={styles.main}>
        <section className={styles.login_card}>
          <div className={styles.login_header}>
            <div className={styles.login_img}>
              <Image
                fill={true}
                src="/images/login_logo.png"
                alt="로고"
              />
            </div>
          </div>
          <h2 className={styles.login_title}>소셜 계정 로그인</h2>
          <ul className={styles.social_buttons}>
            <li>
              <GoogleLoginButtons />
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}