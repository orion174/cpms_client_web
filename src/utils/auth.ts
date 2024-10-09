import { ResLoginDTO} from "@/definition/type.ts";
import { utf8ToBase64 } from '@/utils/common.ts'

import axios from 'axios';

export const saveCookie = async (userInfo: ResLoginDTO): Promise<void> => {
    const jsonData = {
        'loginHistoryId': userInfo.loginHistoryId
        , 'authType': utf8ToBase64(userInfo.authType)
        , 'accessToken': userInfo.accessToken
        , 'refreshToken': userInfo.refreshToken
        , 'accessTokenExpiration': userInfo.accessTokenExpiration
        , 'refreshTokenExpiration': userInfo.refreshTokenExpiration
        , 'loginStayYn' : 'Y' // TODO 로그인 유지 기능
        , 'ipSecurity' : 'N' // TODO 아이피 보안 기능
    }

    const url = `${import.meta.env.VITE_API_URL}/auth/saveCookie`;

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
}
