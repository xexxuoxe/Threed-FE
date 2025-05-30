// lib/api.ts
import { apiClient, RequestOptions } from './api.client';

export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        apiClient<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
        apiClient<T>(endpoint, { ...options, method: 'POST', data }),

    put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
        apiClient<T>(endpoint, { ...options, method: 'PUT', data }),

    patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
        apiClient<T>(endpoint, { ...options, method: 'PATCH', data }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};
