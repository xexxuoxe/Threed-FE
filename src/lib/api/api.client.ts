import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestOptions = AxiosRequestConfig;

const token = process.env.NEXT_PUBLIC_TOKEN;

// if (typeof window !== 'undefined') {
//     localStorage.setItem("access_token", token);
// }

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {

        let accessToken = token;

        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("access_token");
            if (storedToken) {
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

export async function apiClient<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance({
        url: endpoint,
        ...options,
    });
    return response.data;
}
