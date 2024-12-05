import { saveCookie, deleteCookie } from '@/utils/cookieUtils';
import { base64ToInteger } from "@/utils/common.ts";

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * 브라우저에서 Access Token을 가져온다.
 * @param cookies
 */
export const getAccessToken = async (cookies: Record<string, string | undefined>): Promise<string | null> => {
    let accessToken = cookies?.accessToken ?? null;
    const refreshToken = cookies?.refreshToken ?? null;
    const loginHistoryId = cookies?.loginHistoryId ?? null;

    // 로그인 히스토리 ID 또는 리프레쉬 토큰이 없으면, 로그인 페이지로 리다이렉트
    if(!loginHistoryId || !refreshToken) {
        tokenError();
        return null;
    }

    // AccessToken이 없지만, 로그인 히스토리 ID 또는 리프레쉬 토큰이 존재하면 토큰 갱신시도
    if(!accessToken) {
        accessToken = await refreshAccessToken(refreshToken, loginHistoryId);
    }

    return accessToken;
}

/**
 * Jwt 토큰을 리프레시 한다.
 * @param refreshToken
 * @param loginHistoryId
 */
export const refreshAccessToken = async (refreshToken: string, loginHistoryId: string ): Promise<string | null> => {

    try {

        const jsonData = {
            loginHistoryId : base64ToInteger(loginHistoryId)
        }

        const url =  `${API_URL}/auth/refreshToken`;

        const response
            = await axios.post(url, jsonData,
            {
                    headers: {
                        'X-Refresh-Token': refreshToken
                        , 'Content-Type': 'application/json'
                    }
                    , withCredentials: true
                }
            );

        // 토큰 리프레쉬 성공
        if(response.data.status && response.data.result) {
            const accessToken = response.data.result.accessToken;
            const accessTokenExpiration = response.data.result.accessTokenExpiration;

            // 쿠크에 다시 토큰 저장
            saveCookie({
                accessToken: accessToken
                , accessTokenExpiration: accessTokenExpiration
            });

            return accessToken;

        } else {
            // 토큰 리프레쉬 실패
            tokenError();
            return null;
        }
    } catch (error) {
        console.error("refreashAccessToken : ", error);

        tokenError();
        return null;
    }
}

/* Access Token 갱신 실패 시 쿠키 삭제 및 로그인 페이지로 이동 */
export const tokenError = () => {
    deleteCookie();
    window.location.href = '/auth/login';
};