/* 📁 jwt.ts */
import axios from 'axios';
import { saveCookie, deleteCookie } from '@/core/auth/cookie.ts';

const API_URL = import.meta.env.VITE_API_URL;

// 어세스 토큰을 조회한다.
export const getAccessToken = async (cookies: Record<string, string | undefined>): Promise<string | null> => {
    let accessToken = cookies?.accessToken ?? null;
    const refreshToken = cookies?.refreshToken ?? null;
    const loginHistoryId = cookies?.loginHistoryId ?? null;

    if (!loginHistoryId || !refreshToken) {
        tokenError();
        return null;
    }

    if (!accessToken) {
        accessToken = await refreshAccessToken(refreshToken, loginHistoryId);
    }

    return accessToken;
};

// 토큰을 갱신한다.
export const refreshAccessToken = async (refreshToken: string, loginHistoryId: string): Promise<string | null> => {
    try {
        const endPoint = `${API_URL}/api/auth/refresh-token`;

        const jsonData = {
            loginHistoryId: loginHistoryId
        };

        const response
            = await axios.post(endPoint, jsonData, {
                headers: {
                    'X-Refresh-Token': refreshToken
                    , 'Content-Type': 'application/json'
                }, withCredentials: true
            }
        );

        const { success, data } = response.data;

        if (success && data?.accessToken) {
            await saveCookie({
                accessToken: data.accessToken,
                accessTokenExpiration: data.accessTokenExpiration
            });

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

export const tokenError = () => {
    deleteCookie();
    window.location.href = '/auth/login';
};