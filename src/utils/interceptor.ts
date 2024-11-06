import { getAccessToken, refreshAccessToken } from '@/utils/jwtTokenUtils.ts';
import { deleteCookie, getCookie } from '@/utils/cookieUtils.ts';

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

// 응답 인터셉터
callAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config; // 요청 본문

        // 401오류(권한없음)가 발생했을 때
        if(error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            // refreashAccessToken()을 호출하여 토큰 갱신
            const cookies = await getCookie() as Record<string, string | undefined>;
            const newAccessToken = await refreshAccessToken(cookies.refreshToken ?? '', cookies.loginHistoryId ?? '');

            // 새 엑세스 토큰이 있을때
            if(newAccessToken) {
                // 요청본문에 새 토큰을 추가하고, callAPI 재시도
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return callAPI(originalRequest);

            } else {
                // 쿠키 삭제 후, 로그인 페이지 이동
                deleteCookie();
                window.location.href = '/auth/login';
            }
        }

        return Promise.reject(error);
    }
);

export { callAPI };