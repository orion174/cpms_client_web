import { AxiosRequestConfig } from 'axios';
import { callAPI } from "@/server/interceptor.ts";
import { ApiResponse } from '@/definition/commonType.ts';

export interface PagedData<T> {
    list: T[];
    total: number;
}

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

const getPaged = async <T>(url: string, config?: AxiosRequestConfig): Promise<PagedData<T>> => {
    const response = await callAPI.get<ApiResponse<PagedData<T>>>(url, config);
    return response.data.data;
};

const postPaged = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<PagedData<T>> => {
    const response = await callAPI.post<ApiResponse<PagedData<T>>>(url, data, config);
    return response.data.data;
};

export const apiClient = { get, post, put, getPaged, postPaged };