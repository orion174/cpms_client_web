import type {
    AxiosResponse,
    InternalAxiosRequestConfig,
    AxiosRequestHeaders,
} from 'axios';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import store from '@/store';
import { openModal } from '@/store/modalSlice';
import callbackStore from '@/store/callbackStore';

import { getAccessToken, refreshAccessToken, tokenError } from '@/core/auth/jwt';
import { ApiResponse } from '@/definition/common.types';

// 상태 변수: refresh 중 여부
let isRefreshing = false;

// 재시도할 요청들을 저장할 큐
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
    failedQueue.forEach((cb) => cb(token));
    failedQueue = [];
};

// 요청 인터셉터 – 세션스토리지 accessToken 삽입
export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
        config.headers = (config.headers ?? {}) as AxiosRequestHeaders;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

// 응답 인터셉터 – success=false 처리 (blob 등 예외는 통과)
export const responseInterceptor = async (response: AxiosResponse) => {
    const contentType = response.headers['content-type'] || '';

    if (
        contentType.includes('application/octet-stream') ||
        contentType.includes('application/pdf') ||
        contentType.includes('image/') ||
        response.request?.responseType === 'blob'
    ) {
        return response;
    }

    const { success, message, errorCode } = response.data;

    if (!success) {
        handleErrorByCode(errorCode, message);
        return Promise.reject(new Error(message || 'API 처리 실패'));
    }

    return response;
};

// 에러 인터셉터 – 401 시 토큰 재발급 (중복 요청 방지 포함)
export const errorInterceptor = async (error: any) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
            isRefreshing = true;

            try {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    processQueue(newToken);
                    isRefreshing = false;

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    originalRequest.withCredentials = true;
                    return axios.request(originalRequest);
                } else {
                    tokenError();
                }
            } catch (err) {
                tokenError();
            } finally {
                isRefreshing = false;
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

    const response = error.response?.data as ApiResponse;
    handleErrorByCode(response?.errorCode, response?.message);

    return Promise.reject(error);
};

// 에러 코드별 모달 처리
export const handleErrorByCode = (code?: string, msg?: string) => {
    const errorCode = code ?? '0000';
    const message = msg ?? '알 수 없는 오류가 발생했습니다.';

    switch (errorCode) {
        case '1002': // 권한 없음
        case '1003': // 리프레시 토큰 만료
        case '1004': // 인증되지 않음
            openErrorModal('인증 오류', message, () => {
                window.location.href = '/auth/login';
            });
            break;
        default:
            openErrorModal(`오류_${errorCode}`, message);
            break;
    }
};

// 에러 모달 오픈 헬퍼
const openErrorModal = (
    title: string,
    message: string,
    onConfirm?: () => void,
) => {
    const modalId = uuidv4();
    if (onConfirm) callbackStore.setCallback(modalId, onConfirm);

    store.dispatch(
        openModal({
            title,
            message,
            isConfirm: !!onConfirm,
            modalId,
        }),
    );
};
