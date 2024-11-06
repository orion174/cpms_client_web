import { ResLoginDTO} from "@/definition/type.ts";
import { utf8ToBase64 } from "@/utils/common.ts";

import axios from 'axios';

// API URL
const API_URL = import.meta.env.VITE_API_URL;

/**
 * 로그인이 성공했으면, 쿠키를 저장한다.
 * @param userInfo
 */
export const saveCookie = async (userInfo: Partial<ResLoginDTO>): Promise<void> => {
    const jsonData = {
        loginHistoryId: userInfo.loginHistoryId
        , authType: userInfo.authType ? utf8ToBase64(userInfo.authType) : ''
        , accessToken: userInfo.accessToken
        , refreshToken: userInfo.refreshToken
        , accessTokenExpiration: userInfo.accessTokenExpiration
        , refreshTokenExpiration: userInfo.refreshTokenExpiration
        , option : userInfo.option
        , loginStayYn : 'Y' // TODO 로그인 유지 기능
        , ipSecurity : 'N' // TODO 아이피 보안 기능
    }

    const url = API_URL + `/auth/saveCookie`;

    try {
        await axios.post(url, jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
            , withCredentials: true
        });

    } catch (e) {
        console.error(e);
    }
};

/**
 * 특정 쿠키 또는 전체 쿠키를 조회한다.
 * @param key
 */
export const getCookie = async (key?: string): Promise<Record<string, string> | string | null> => {
    try {
        const url = API_URL + `/auth/getCookie`;

        const res
            = await axios.post<Record<string, string>> (
                url
                , null
                , {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                        , withCredentials: true
                    }
                );
        if(key) {
            // 특정 쿠키 조회
            return res.data[key] ?? null;
        } else {
            // 전체 쿠키 조회
            return res.data 
        }
    } catch(error) {
        console.error("쿠키 조회 실패 : ", error);
        return null;
    }
};

/**
 * 쿠키를 삭제한다.
 * @param key
 */
export const deleteCookie = async (key?: string): Promise<void> => {
    try {
        const url = API_URL + `/auth/deleteCookie`;
        const jsonData = key ? {key} : {};

        await axios.post(url, jsonData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    } catch(error) {
        console.error("쿠키 삭제 실패 : ", error);
    }
};

