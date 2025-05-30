'use client'

import React, { useEffect, useState } from "react";
import { isSession } from "@lib/session/useAuthCheck";
import styles from "./UserState.module.scss";
import Link from "next/link";

export default function UserStateomponent() {
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
        <div className={`${styles.user_state} ${session ? styles.on : styles.off}`}>
            <div className={styles.state_logout}>
                <button type="button" onClick={logout}>
                    <i className={styles.ico_logout}></i><span>로그아웃</span>
                </button>

            </div>
            <div className={styles.state_mypage}>
                <Link href={'/userpage'}>
                    <i className={styles.ico_mypage}></i><span>마이페이지</span>
                </Link>
            </div>
        </div>
    )
}


