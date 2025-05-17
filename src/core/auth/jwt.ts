/* 📁 jwt.ts */
import axios from 'axios';
import { ApiResponse, ResRefreshTokenDTO } from '@/definition/common.types';
import {deleteCookie} from "@/core/auth/cookie.ts";

const API_URL = import.meta.env.VITE_API_URL;
const ACCESS_KEY = 'accessToken';
const LOGIN_HISTORY_KEY = 'loginHistoryId';

// AccessToken 조회
export const getAccessToken = (): string | null => sessionStorage.getItem(ACCESS_KEY);

// 토큰 갱신
export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const loginHistoryId = sessionStorage.getItem(LOGIN_HISTORY_KEY);
        if (!loginHistoryId) return null;

        const endPoint = `${API_URL}/api/auth/refresh-token`;

        const { data } = await axios.post<ApiResponse<ResRefreshTokenDTO>>(
            endPoint,
            { loginHistoryId: Number(loginHistoryId) },
            { withCredentials: true }
        );

        if (data.success && data.data?.accessToken) {
            const { accessToken } = data.data;
            sessionStorage.setItem(ACCESS_KEY, accessToken);

            return accessToken;
        }

        tokenError();
        return null;
    } catch (err) {
        console.error('refreshAccessToken error:', err);
        tokenError();
        return null;
    }
};

export const tokenError = () => {
    sessionStorage.clear();

    deleteCookie()
        .catch(err => console.warn('deleteCookie failed:', err))
        .finally(() => {
            window.location.replace('/auth/login');
        });
};