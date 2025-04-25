import axios, { AxiosResponse } from 'axios';
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { getAccessToken, refreshAccessToken, tokenError } from '@/utils/jwtTokenUtils';
import { getCookie } from '@/utils/cookieUtils';
import { openModal } from '@/store/modalSlice';
import callbackStore from '@/store/callbackStore';
import store from '@/store';

export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    errorCode?: string;
}

const callAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// 요청 인터셉터: 토큰 삽입
callAPI.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const cookies = await getCookie() as Record<string, string | undefined>;
        const token = await getAccessToken(cookies);

        if (token) {
            config.headers = (config.headers ?? {}) as AxiosRequestHeaders;
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }, (error) => Promise.reject(error)
);

// 응답 인터셉터: success=false 처리, 401 재시도
callAPI.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const { success, message, errorCode } = response.data;

        if (!success) {
            handleErrorByCode(errorCode, message);
            return Promise.reject(new Error(message || 'API 처리 실패'));
        }

        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if (status === 401 && !originalRequest._retry) {
            // 무한 루프 방지
            if (originalRequest.url?.includes('/api/auth/refreshToken')) {
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

                        return callAPI(originalRequest);
                    }
                } catch {
                    tokenError();
                }
            } else {
                tokenError();
            }
        }

        const res = error.response?.data as ApiResponse;
        handleErrorByCode(res?.errorCode, res?.message);

        return Promise.reject(error);
    }
);

// 에러 코드 기반 처리
const handleErrorByCode = (code?: string, msg?: string) => {
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

// 모달 호출
const openErrorModal = (title: string, message: string, onConfirm?: () => void) => {
    const modalId = uuidv4();

    if (onConfirm) callbackStore.setCallback(modalId, onConfirm);

    store.dispatch(openModal({
        title,
        message,
        isConfirm: !!onConfirm,
        modalId,
    }));
};

export { callAPI };
