/* 📁 cookie.ts */
import axios from 'axios';

import { utf8ToBase64 } from "@/utils/common.ts";
import { ResLoginDTO} from "@/definition/common.types.ts";

const API_URL = import.meta.env.VITE_API_URL;

// 쿠키를 저장한다.
export const saveCookie = async (userInfo: Partial<ResLoginDTO>): Promise<void> => {
    const endPoint = `${API_URL}/api/cookie/save`;

    const jsonData = {
        accessToken: userInfo.accessToken,
        refreshToken: userInfo.refreshToken,
        accessTokenExpiration: userInfo.accessTokenExpiration,
        refreshTokenExpiration: userInfo.refreshTokenExpiration,
        authType: userInfo.authType ? utf8ToBase64(userInfo.authType) : '',
        loginHistoryId: userInfo.loginHistoryId ? utf8ToBase64(userInfo.loginHistoryId) : '',
        companyId: userInfo.companyId ? utf8ToBase64(userInfo.companyId) : '',
        userId: userInfo.userId ? utf8ToBase64(userInfo.userId) : '',
    };

    await axios.post(endPoint, jsonData, {
        headers: {'Content-Type': 'application/json'}
        , withCredentials: true
    });
};

// 쿠키를 조회한다.
export const getCookie = async (key?: string): Promise<Record<string, string> | string | null> => {
    const endPoint = `${API_URL}/api/cookie/get`;

    const response = await axios.post(endPoint, null, {
        headers: {'Content-Type': 'application/json'}
        , withCredentials: true
    });

    return key ? response.data[key] ?? null : response.data;
};

// 쿠키를 삭제한다.
export const deleteCookie = async (key?: string): Promise<void> => {
    const endPoint = `${API_URL}/api/cookie/delete`;

    const jsonData = key ? { key } : {};

    await axios.post(endPoint, jsonData, {
        headers: {'Content-Type': 'application/json'}
        , withCredentials: true
    });
};
