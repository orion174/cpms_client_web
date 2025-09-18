/* 📁 jwt.ts */
import axios from "axios";

import { safeRequest } from '@/server/api/axiosHandler';
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

    const url = `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`;

    const response = await safeRequest<ResRefreshTokenDTO>(
        axios.post<ApiResponse<ResRefreshTokenDTO>>(
            url,
            { loginHistoryId: Number(loginHistoryId) },
            { withCredentials: true }
        )
    );

    if (response.success && response.data?.accessToken) {
        sessionStorage.setItem(ACCESS_KEY, response.data.accessToken);
        return response.data.accessToken;
    }

    return null;
};
