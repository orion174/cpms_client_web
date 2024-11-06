// API result
export interface ApiRes<T> {
    status: boolean;
    result: T;
    message?: string;
}

// 로그인 DTO
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
    option: string;
}

// JWT DTO
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

// 공통 코드 DTO
export interface ResComCodeDTO {
    codeId: string;
    codeNm: string;
}
