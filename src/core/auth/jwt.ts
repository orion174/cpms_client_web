/* 📁 jwt.ts */
import { ApiResponse, ResRefreshTokenDTO } from '@/definition/common.types';
import { deleteCookie } from "@/core/auth/cookie.ts";
import axios from "axios";
import { handleErrorByCode } from "@/core/api/interceptor.ts";

const ACCESS_KEY = 'accessToken';
const LOGIN_HISTORY_KEY = 'loginHistoryId';

// AccessToken 조회
export const getAccessToken = (): string | null => sessionStorage.getItem(ACCESS_KEY);

// 토큰 갱신
export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const loginHistoryId = sessionStorage.getItem(LOGIN_HISTORY_KEY);

        if (!loginHistoryId) return null;

        const response
            = await axios.post<ApiResponse<ResRefreshTokenDTO>>(
            `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`
                , { loginHistoryId: Number(loginHistoryId) }
                , { withCredentials: true }
            );

        const { success, data } = response.data;

        if (success && data?.accessToken) {
            sessionStorage.setItem(ACCESS_KEY, data.accessToken);
            return data.accessToken;
        }

        return null;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleErrorByCode(
                error.response?.data?.errorCode as string | undefined,
                error.response?.data?.message as string | undefined,
            );
        }

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