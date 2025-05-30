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


export async function getToken(provider: string, code: string): Promise<TokenResponse> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/${provider}/callback?code=${code}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    return {
        token: data.token,
        user: data.user,
    };
}
