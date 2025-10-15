// types/auth.ts
export interface User {
    id: number;
    email: string;
    name: string;
    profileImageUrl: string;
}

export interface TokenResponse {
    token: string;
    refreshToken?: string; // 백엔드에서 제공할 수 있는 refreshToken
    user: User;
}

export async function getToken(code: string): Promise<TokenResponse> {
    try {
        console.log('🔍 구글 OAuth 콜백 요청 시작:', code);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/google/callback?code=${code}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('🔍 백엔드 응답 데이터:', data);

        // 응답 데이터 검증
        if (!data) {
            throw new Error('백엔드에서 빈 응답을 받았습니다');
        }

        if (!data.token) {
            throw new Error('토큰이 응답에 포함되지 않았습니다');
        }

        if (!data.user) {
            throw new Error('사용자 정보가 응답에 포함되지 않았습니다');
        }

        // 사용자 정보 검증
        if (!data.user.id) {
            throw new Error('사용자 ID가 없습니다');
        }

        // 토큰을 쿠키와 localStorage에 모두 저장
        if (data.token && typeof window !== 'undefined') {
            // 쿠키 저장 (HttpOnly가 아닌 일반 쿠키)
            document.cookie = `accessToken=${data.token}; Path=/; SameSite=Lax`;
            // localStorage 저장
            localStorage.setItem("access_token", data.token);

            // refreshToken이 있다면 저장
            if (data.refreshToken) {
                document.cookie = `refreshToken=${data.refreshToken}; Path=/; SameSite=Lax`;
                localStorage.setItem("refresh_token", data.refreshToken);
            }

            console.log('✅ 토큰 저장 완료:', {
                cookieSet: !!document.cookie.includes('accessToken'),
                localStorageSet: !!localStorage.getItem("access_token"),
                refreshTokenSet: !!data.refreshToken
            });
        } else {
            console.error('❌ 토큰이 없어서 저장할 수 없습니다:', data.token);
        }

        return {
            token: data.token,
            refreshToken: data.refreshToken,
            user: data.user,
        };
    } catch (error) {
        console.error('❌ 토큰 교환 실패:', error);
        throw new Error(`Token exchange failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}