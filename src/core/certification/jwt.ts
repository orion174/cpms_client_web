/* 📁 jwt.ts */
import axios from "axios";

import type { ResRefreshTokenDTO } from '@/types/auth/types';
import type { ApiResponse } from '@/types/cmmn';

const ACCESS_KEY = 'accessToken';
const LOGIN_HISTORY_KEY = 'loginHistoryId';

// AccessToken 조회
export const getAccessToken = (): string | null => sessionStorage.getItem(ACCESS_KEY);

// 토큰 갱신
export const refreshAccessToken = async (): Promise<string | null> => {

    const loginHistoryId = sessionStorage.getItem(LOGIN_HISTORY_KEY);

    if (!loginHistoryId) return null;

    try {
        const response
            = await axios.post<ApiResponse<ResRefreshTokenDTO>>(
            `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`,
                { loginHistoryId: Number(loginHistoryId) },
                { withCredentials: true }
            );

        const { success, data } = response.data;

        if (success && data?.accessToken) {
            sessionStorage.setItem(ACCESS_KEY, data.accessToken);
            return data.accessToken;
        }

        return null;

    } catch (error) {
        console.error('refreshAccessToken failed: ', error);
        return null;
    }
};
