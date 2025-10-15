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
            getToken(code).then(({ token, refreshToken, user }) => {
                console.log('✅ 토큰 교환 성공:', {
                    token: !!token,
                    refreshToken: !!refreshToken,
                    user: !!user
                });
                // getToken 함수에서 이미 토큰을 저장하므로 여기서는 중복 저장하지 않음
                if (user && user.id) {
                    router.push("/")
                } else {
                    console.error('❌ 사용자 정보가 없습니다:', user);
                    router.replace("/login");
                }
            }).catch((error) => {
                console.error("❌ Token exchange failed:", error);
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
                router.replace("/login");
            });
        } else {
            console.error('❌ OAuth 코드가 없습니다');
            router.replace("/login");
        }
    }, [code, router]);

    return <div style={{ textAlign: "center", fontSize: "20px", padding: "100px 0" }}>로그인 처리 중...</div>;
}


