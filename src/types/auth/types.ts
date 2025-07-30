/* 📁 auth interface */

// 로그인 요청 인터페이스
export interface ReqLoginDTO {
    loginId: string;
    loginPw: string;
}

// 로그인 응답 인터페이스
export interface ResLoginDTO {
    loginHistoryId: number;
    accessToken: string;
    accessTokenExpiration: number;
}

// 리프레쉬 토큰 응답 인터페이스
export interface ResRefreshTokenDTO {
    accessToken: string;
    accessTokenExpiration: number;
}

