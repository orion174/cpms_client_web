import { getAccessToken, refreshAccessToken } from '@/utils/jwtTokenUtils.ts';
import { deleteCookie, getCookie } from '@/utils/cookieUtils.ts';

import store from '@/store';
import { openModal } from '@/store/modalSlice';
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';

// Axios 인스턴스 생성
const callAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers : {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// 요청 인터셉터 : 모든 요청에 엑세스 토큰을 추가
callAPI.interceptors.request.use(
    async (config) => {
        const cookies = await getCookie() as Record<string, string | undefined>
        const token = await getAccessToken(cookies);

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 : 비 로그인 사용자의 API 접근 차단 및 응답 에러 처리
callAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            const status = error.response.status;

            // 401 오류 처리 및 토큰 갱신 로직
            if (status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const cookies = await getCookie() as Record<string, string | undefined>;
                const newAccessToken = await refreshAccessToken(cookies.refreshToken ?? '', cookies.loginHistoryId ?? '');

                if (newAccessToken) {
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return callAPI(originalRequest); // 갱신된 토큰으로 재요청
                } else {
                    deleteCookie();
                    window.location.href = '/auth/login';
                }
            }

            // 401 외의 상태 코드 처리
            switch (status) {
                case 404:
                    openErrorModal('오류', '요청하신 리소스를 찾을 수 없습니다.');
                    break;
                case 500:
                    openErrorModal('오류', '서버에 오류가 발생했습니다.');
                    break;
                case 403:
                    openErrorModal('오류', '접근 권한이 없습니다.');
                    break;
            }
        } else {
            console.error('네트워크 오류: ', error);
            openErrorModal('오류', '네트워크 오류가 발생했습니다.');
        }

        return Promise.reject(error);
    }
);

// API 통신 에러모달
const openErrorModal = (title: string, message: string) => {
    const modalId = uuidv4(); // 고유 ID 생성
    // 콜백이 필요 없는 경우, undefined 전달
    store.dispatch(openModal({
        title,
        message,
        isConfirm: false,
        modalId,
    }));
};

export { callAPI };