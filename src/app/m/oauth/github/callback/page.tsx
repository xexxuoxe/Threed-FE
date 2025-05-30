'use client'

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getToken } from '@lib/session/useAuth';

export default function LoginRedirectPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (code) {

            console.log('code : ', code)
            getToken(code).then(({ token, user }) => {

                console.log('token :', token)
                console.log('user :', user)

                document.cookie = `accessToken=${token}; Path=/`;
                if (user.id) {
                    router.push("/")
                } else {
                    router.replace("/login");
                }
            }).catch((error) => {
                console.error("Token exchange failed:", error);
            });
        }
    }, [code]);

    return <div style={{ textAlign: "center", fontSize: "20px", padding: "100px 0" }}>로그인 처리 중...</div>;
}