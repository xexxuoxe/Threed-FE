// types/auth.ts
export interface User {
    id: number;
    email: string;
    name: string;
    profileImageUrl: string;

}
export interface TokenResponse {
    token: string;
    user: User;
}

export async function getToken(code: string): Promise<TokenResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/google/callback?code=${code}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    const data = await response.json();

    // 토큰을 쿠키와 localStorage에 모두 저장
    if (data.token && typeof window !== 'undefined') {
        document.cookie = `accessToken=${data.token}; Path=/`;
        localStorage.setItem("access_token", data.token);
    }

    return {
        token: data.token,
        user: data.user,
    };
}