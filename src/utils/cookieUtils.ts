import { ResLoginDTO} from "@/definition/type.ts";
import { utf8ToBase64 } from "@/utils/common.ts";

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * 브라우저에 쿠키를 저장한다.
 * @param userInfo
 */
export const saveCookie = async (userInfo: Partial<ResLoginDTO>): Promise<void> => {

    const jsonData = {
        accessToken: userInfo.accessToken
        , refreshToken: userInfo.refreshToken
        , accessTokenExpiration: userInfo.accessTokenExpiration
        , refreshTokenExpiration: userInfo.refreshTokenExpiration
        , authType: userInfo.authType ? utf8ToBase64(userInfo.authType) : ''
        , loginHistoryId: userInfo.loginHistoryId ? utf8ToBase64(userInfo.loginHistoryId) : ''
        , companyId: userInfo.companyId ? utf8ToBase64(userInfo.companyId) : ''
        , userId: userInfo.userId ? utf8ToBase64(userInfo.userId) : ''
    }

    const url = `${API_URL}/cookie/saveCookie`;

    await axios.post(url, jsonData, {
        headers: {'Content-Type': 'application/json'}
        , withCredentials: true
    });
};

/**
 * 특정 쿠키 또는 전체 쿠키를 조회한다.
 * @param key
 */
export const getCookie = async (key?: string): Promise<Record<string, string> | string | null> => {

    const url =`${API_URL}/cookie/getCookie`;

    const response
        = await axios.post(url, null, {headers: {'Content-Type': 'application/json'}, withCredentials: true});

    if (key) {
        return response.data[key] ?? null;

    } else {
        return response.data
    }
};

/**
 * 쿠키를 삭제한다.
 * @param key
 */
export const deleteCookie = async (key?: string): Promise<void> => {

    const url = `${API_URL}/cookie/deleteCookie`;

    const jsonData = key ? {key} : {};

    await axios.post(url, jsonData, {headers: {'Content-Type': 'application/json'}, withCredentials: true});
}

