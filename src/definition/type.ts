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

// 유지보수 문의 리스트
export interface ResSuportListDTO {
    suportCnt: number;
    suportList: SuportList[];
}

export interface SuportList {
    suportReqId: number;
    userCompanyNm: string;
    reqProjectNm: string;
    requestCd: string;
    requestCdNm: string;
    statusCdNm: string;
    statusCd: string;
    resUserNm: string;
    regDt: string;
    reqDate: string;
    suportTitle: string;
}