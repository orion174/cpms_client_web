/* 📁 interceptor.ts */
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import store from '@/store';
import { openModal } from '@/store/modalSlice';
import callbackStore from '@/store/callbackStore';

import { getAccessToken, refreshAccessToken, tokenError } from '@/core/auth/jwt.ts';
import { getCookie } from '@/core/auth/cookie.ts';
import { ApiResponse } from '@/definition/common.types.ts';

// 요청 인터셉터: 토큰 삽입
export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
    const cookies = await getCookie() as Record<string, string | undefined>;
    const token = await getAccessToken(cookies);

    if (token) {
        config.headers = (config.headers ?? {}) as AxiosRequestHeaders;
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};

// 응답 인터셉터: success=false 처리 및 401 재시도
export const responseInterceptor = async (response: AxiosResponse) => {
    // 응답이 blob일 경우 인터셉터 무시 (파일 다운로드 등)
    const contentType = response.headers['content-type'] || '';

    if (contentType.includes('application/octet-stream') || contentType.includes('application/pdf') || contentType.includes('image/') || response.request?.responseType === 'blob') {
        return response;
    }

    const { success, message, errorCode } = response.data;

    if (!success) {
        handleErrorByCode(errorCode, message);
        return Promise.reject(new Error(message || 'API 처리 실패'));
    }

    return response;
};

export const errorInterceptor = async (error: any) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
        if (originalRequest.url?.includes('/api/auth/refresh-token')) {
            tokenError();
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const cookies = await getCookie() as Record<string, string | undefined>;
        const { refreshToken, loginHistoryId } = cookies;

        if (refreshToken && loginHistoryId) {
            try {
                const newAccessToken = await refreshAccessToken(refreshToken, loginHistoryId);

                if (newAccessToken) {
                    originalRequest.headers = {
                        ...(originalRequest.headers ?? {}),
                        Authorization: `Bearer ${newAccessToken}`,
                    };

                    return await import('@/core/api/client.ts').then(({ callAPI }) => callAPI(originalRequest));
                }
            } catch {
                tokenError();
            }
        } else {
            tokenError();
        }
    }

    const response = error.response?.data as ApiResponse;
    handleErrorByCode(response?.errorCode, response?.message);

    return Promise.reject(error);
};

// 에러 코드별 사용자 친화적 안내 처리
export const handleErrorByCode = (code?: string, msg?: string) => {
    const message = msg ?? '알 수 없는 오류가 발생했습니다.';

    switch (code) {
        case '1002':
            openErrorModal('권한 없음', message, () => {
                window.location.href = '/auth/login';
            });
            break;
        case '4004':
        case '3003':
            openErrorModal('리소스 없음', message);
            break;
        default:
            openErrorModal('서버 오류', message);
            break;
    }
};

// 에러 모달 표시
const openErrorModal = (title: string, message: string, onConfirm?: () => void) => {
    const modalId = uuidv4();

    if (onConfirm) {
        callbackStore.setCallback(modalId, onConfirm);
    }

    store.dispatch(openModal({
        title,
        message,
        isConfirm: !!onConfirm,
        modalId,
    }));
};
