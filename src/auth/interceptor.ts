import { getAccessToken, refreshAccessToken, tokenError } from '@/utils/jwtTokenUtils.ts';
import { getCookie } from '@/utils/cookieUtils.ts';

import axios from 'axios';
import store from '@/store';
import { openModal } from '@/store/modalSlice';
import callbackStore from '@/store/callbackStore';
import { v4 as uuidv4 } from 'uuid';

// Axios 인스턴스 생성
const callAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    , headers : {'Content-Type': 'application/json'}
    , withCredentials: true
});

// 요청 인터셉터 : 모든 요청에 엑세스 토큰을 추가
callAPI.interceptors.request.use(async (config) => {
    const cookies
        = await getCookie() as Record<string, string | undefined>;

    const token = await getAccessToken(cookies);

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
},
(error) => Promise.reject(error));

// 응답 인터셉터 : 비 로그인 사용자의 API 접근 차단 및 응답 에러 처리
callAPI.interceptors.response.use(
    (response) => {
        // API에서 status: false를 반환한 경우 에러 처리
        if (response.data && response.data.status === false) {
            const message = response.data.message || '알 수 없는 오류가 발생했습니다.';
            const description = response.data.description || '';

            // 에러 메시지 처리 (확인 클릭 시 로그인 화면으로 이동)
            openErrorModal('경고', `${message}\n${description}`, () => {
                window.location.href = '/auth/login';
            });

            // 에러를 throw하여 이후 로직 방지
            return Promise.reject(new Error(message));
        }
        return response; // 정상적인 응답일 경우 그대로 반환
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            const status = error.response.status;

            if (status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const cookies = await getCookie() as Record<string, string | undefined>;
                const { refreshToken, loginHistoryId } = cookies;

                if (refreshToken && loginHistoryId) {
                    try {
                        const newAccessToken = await refreshAccessToken(refreshToken, loginHistoryId);

                        if (newAccessToken) {
                            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            return callAPI(originalRequest); // 재요청
                        }
                    } catch {
                        tokenError();
                    }
                } else {
                    tokenError();
                }
            }

            // API 에러 상태 코드 처리
            handleApiError(error.response);
        }

        return Promise.reject(error); // 최종 에러 반환
    }
);

// API 에러 상태 코드 처리
export const handleApiError = (error: any) => {
    const status = error?.status; // 에러 응답 상태 코드

    switch (status) {
        case 403:
            openErrorModal('오류', '접근 권한이 없습니다.' , () => {
                window.location.href = '/auth/login';
            });
            break;

        case 404:
            openErrorModal('오류', '요청하신 리소스를 찾을 수 없습니다.');
            break;

        case 500:
            openErrorModal('오류', '서버에 오류가 발생했습니다.');
            break;

        default:
            console.error('알 수 없는 오류: ', error);
    }
};

/*
 * 커스텀 에러 모달
 * @param title
 * @param message
 * @param callback
 */
const openErrorModal = (title: string, message: string, onConfirm?: () => void) => {
    const modalId = uuidv4(); // 고유 ID 생성

    if (onConfirm) {
        callbackStore.setCallback(modalId, onConfirm);
    }

    // Redux로 모달 열기 액션 디스패치
    store.dispatch(openModal({
        title,
        message,
        isConfirm: !!onConfirm, // 확인 버튼 활성화 여부
        modalId,
    }));
};

export { callAPI };