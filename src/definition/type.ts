// API 응답 인터페이스
export interface ApiRes<T> {
    status: boolean;
    result: T;
    message?: string;
}

// 로그인 응답 DTO
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

// JWT 토큰 DTO
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

// 공통 코드 응답 DTO
export interface ResComCodeDTO {
    codeId: number;
    codeNm: string;
}

// 프로젝트 유지보수 문의 인터페이스
export interface ResSuportListDTO {
    suportCnt: number;
    suportList: SuportList[];
}

// 프로젝트 유지보수 문의 리스트 인터페이스
export interface SuportList {
    suportReqId: number;
    userCompanyNm: string;
    reqProjectNm: string;
    requestCd: number;
    requestCdNm: string;
    statusCd: number;
    statusCdNm: string;
    resUserNm: string;
    reqDate: string;
    suportTitle: string;
    regDt: string;
}

// 프로젝트 유지보수 문의 상세 조회 인터페이스
export interface ResSuportDetailDTO {
    suportReqId: number;
    reqCompanyNm: string;
    userCompanyNm: string;
    reqProjectNm: string;
    requestCd: number;
    requestCdNm: string;
    statusCd: number;
    statusCdNm: string;
    resUserId: number;
    resUserNm: string;
    reqUserNm: string;
    reqDate: string;
    resDate: string;
    suportTitle: string;
    suportEditor: string;
    suportRes : suportRes | null;
    fileList: FileList[];
}

export interface suportRes {
    suportResId: number;
    resTitle: string;
    resEditor: string;
}

// 첨부파일 인터페이스
export interface FileList {
    suportFileId: number;
    fileCategory : string;
    fileType: string;
    filePath: string;
    fileNm: string;
    fileOgNm: string;
}