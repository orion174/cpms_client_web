/* 📁 jwt.ts */
import axios from 'axios';
import { tokenError, base64ToUtf8 } from '@/utils/common.ts';
import { ApiResponse, ResRefreshTokenDTO } from '@/definition/common.types';

const API_URL = import.meta.env.VITE_API_URL;

// Acess 토큰을 조회한다.
export const getAccessToken = async (cookies: Record<string, string | undefined>): Promise<string | null> => {
    let accessToken = cookies?.accessToken ?? null;
    const refreshToken = cookies?.refreshToken ?? null;
    const loginHistoryId = cookies?.loginHistoryId ?? null;

    if (!loginHistoryId || !refreshToken) return null;

    if (!accessToken) {
        accessToken = await refreshAccessToken(loginHistoryId, refreshToken);
    }

    return accessToken;
};

// 토큰을 갱신한다.
export const refreshAccessToken = async (
    loginHistoryId: string,
    refreshToken: string
): Promise<string | null> => {
    try {
        const endPoint = `${API_URL}/api/auth/refresh-token`;
        const decodedLoginHistoryId = Number(base64ToUtf8(loginHistoryId));

        const response = await axios.post<ApiResponse<ResRefreshTokenDTO>>(
            endPoint,
            { loginHistoryId: decodedLoginHistoryId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Refresh-Token': refreshToken,
                },
                withCredentials: true,
            }
        );

        const { success, data } = response.data;

        if (success && data?.accessToken) {
            return data.accessToken;
        } else {
            tokenError();
            return null;
        }
    } catch (error) {
        console.error('refreshAccessToken error:', error);
        tokenError();
        return null;
    }
};
