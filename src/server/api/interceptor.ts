import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { openErrorModal } from '@/utils/modal'
import { getAccessToken, refreshAccessToken } from '@/server/utils/jwt';
import type { ApiResponse } from '@/types/cmmn';

// 상태 변수: refresh 중 여부
let isRefreshing = false;

// 재시도할 요청들을 저장할 큐
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
    failedQueue.forEach((cb) => cb(token));
    failedQueue = [];
};

// 요청 인터셉터: accessToken 삽입
export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {

    const token = getAccessToken();

    if (token) {
        config.headers = (config.headers ?? {}) as AxiosRequestHeaders;
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

// 응답 인터셉터: success=false 처리 (blob등 예외는 통과)
export const responseInterceptor = async (response: AxiosResponse) => {

    const contentType = response.headers['content-type'] || '';

    // blob 등 해당 예외는 통과
    if (contentType.includes('application/octet-stream')
        || contentType.includes('application/pdf')
        || contentType.includes('image/')
        || response.request?.responseType === 'blob') {

        return response;
    }

    // 그 외 응답
    const { success, message, errorCode } = response.data;

    if (!success) {
        openErrorModal({
            errorCode: errorCode ?? '0000',
            message: message ?? 'API 오류'
        });

        return Promise.reject(new Error(message || 'API 오류'));
    }

    return response;
};

// 에러 인터셉터: '401'시 토큰 재발급 (중복 요청 방지 포함)
export const errorInterceptor = async (error: any) => {

    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // 현재 토큰을 갱신 중인지 여부 확인
        if (!isRefreshing) {
            // 동시 여러 요청에서 401이 발생해도 한번만 refresh 요청을 보냄
            isRefreshing = true;

            const newToken = await refreshAccessToken();
            isRefreshing = false;

            if (newToken) {
                processQueue(newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                originalRequest.withCredentials = true;

                return axios.request(originalRequest);
            }
        }

        return new Promise((resolve) => {

            failedQueue.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                originalRequest.withCredentials = true;

                resolve(axios.request(originalRequest));
            });
        });
    }

    // 어떠한 이유로든지 토큰 갱신이 실패
    const response: ApiResponse | undefined = error.response?.data;

    openErrorModal({
        errorCode: response?.errorCode ?? '0000',
        message: response?.message ?? 'API 오류'
    });

    return Promise.reject(error);
};