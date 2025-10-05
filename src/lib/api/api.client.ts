import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestOptions = AxiosRequestConfig;

const token = process.env.NEXT_PUBLIC_TOKEN;

// 쿠키에서 토큰을 가져오는 헬퍼 함수
function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}


// 토큰 갱신 함수
async function refreshAccessToken(): Promise<string | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/refresh`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) throw new Error("토큰 갱신 실패");

        const data = await response.json();
        const newToken = data.token;

        // 새 토큰을 쿠키와 localStorage에 모두 저장
        document.cookie = `accessToken=${newToken}; Path=/`;
        localStorage.setItem("access_token", newToken);

        return newToken;
    } catch (error) {
        console.error("리프레시 토큰 요청 실패:", error);
        return null;
    }
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: true, // 쿠키 전송을 위해 true로 변경
});

axiosInstance.interceptors.request.use(
    (config) => {
        let accessToken = token;

        if (typeof window !== 'undefined') {
            // 쿠키에서 먼저 토큰을 찾고, 없으면 localStorage에서 찾기
            const cookieToken = getCookie("accessToken");
            const storedToken = localStorage.getItem("access_token");

            if (cookieToken) {
                accessToken = cookieToken;
            } else if (storedToken) {
                accessToken = storedToken;
            }
        }

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가 - 401 오류 시 토큰 갱신 시도
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();

                if (newToken) {
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                } else {
                    // 토큰 갱신 실패 시 로그인 페이지로 이동
                    if (typeof window !== 'undefined') {
                        // window.location.replace("/login");
                        console.log("토큰 갱신 실패")
                    }
                }
            } catch (refreshError) {
                console.error("토큰 갱신 중 오류:", refreshError);
                if (typeof window !== 'undefined') {
                    // window.location.replace("/login");
                    console.log("토큰 갱신 중 오류")
                }
            }
        }

        return Promise.reject(error);
    }
);

export async function apiClient<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance({
        url: endpoint,
        ...options,
    });
    return response.data;
}
