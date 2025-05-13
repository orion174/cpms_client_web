/* 📁 client.ts */
import axios, { AxiosRequestConfig } from 'axios';

import { requestInterceptor, responseInterceptor, errorInterceptor } from './interceptor.ts';
import { ApiResponse } from '@/definition/common.types.ts';

// 📌 일반 JSON 요청용 인스턴스
const callAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// 📌 FormData/raw 요청용 인스턴스 (예: 파일 업로드)
const rawAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// 요청 인터셉터 등록
callAPI.interceptors.request.use(requestInterceptor, errorInterceptor);
rawAPI.interceptors.request.use(requestInterceptor, errorInterceptor);

// 응답 인터셉터 등록
callAPI.interceptors.response.use(responseInterceptor, errorInterceptor);
rawAPI.interceptors.response.use(responseInterceptor, errorInterceptor);

/* 📌 API 호출 헬퍼 */
const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await callAPI.get<ApiResponse<T>>(url, config);
    return response.data.data;
};

const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await callAPI.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
};

const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await callAPI.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
};

const postForm = async <T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> => {
    const response = await rawAPI.post<ApiResponse<T>>(url, formData, {
        ...config,
        headers: {
            ...(config?.headers ?? {}),
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.data;
};

export const apiClient = { get, post, put, postForm };
export { callAPI, rawAPI };
