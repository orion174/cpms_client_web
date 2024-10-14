/* API result */
export interface ApiRes<T> {
    status: boolean;
    result: T;
    message?: string;
}

/* 로그인 DTO */
export interface ResLoginDTO {
    userId: number;
    authType: string;
    companyId: number;
    loginId: string;
    loginPw: string;
    useYn: string;
    loginHistoryId: number;
    accessToken: string;
    accessTokenExpiration: number;
    refreshToken: string;
    refreshTokenExpiration: number;
}

/* JWT DTO */
export interface JwtDto {
    grantType?: string;
    accessToken: string;
    accessTokenExpiration?: number;
    refreshToken?: string;
    refreshTokenExpiration?: number;
    userId?: number;
    authType?: string;
    companyId?: number;
    loginId?: string;
    loginPw?: string;
    loginHistoryId?: number;
}

