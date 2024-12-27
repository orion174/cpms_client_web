// API 응답 인터페이스
export interface ApiRes<T> {
    status: boolean;
    result: T;
    message?: string;
}

// 로그인 응답 DTO
export interface ResLoginDTO {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
    authType: string;
    loginHistoryId: number;
    userId: number;
    companyId: number;
    loginId: string;
    loginPw: string;
    useYn: string;
    option: string;
}

// 토큰 DTO
export interface JwtDto {
    grantType?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiration?: number;
    refreshTokenExpiration?: number;
    authType?: string;
    loginHistoryId?: number;
    userId?: number;
    companyId?: number;
    loginId?: string;
    loginPw?: string;
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
    authType: string;
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
    authType: string;
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
    fileList: suportFileList[];
}

export interface suportRes {
    suportResId: number;
    resTitle: string;
    resEditor: string;
}

// 첨부파일 인터페이스
export interface suportFileList {
    suportFileId: number;
    fileCategory : string;
    fileType: string;
    filePath: string;
    fileNm: string;
    fileOgNm: string;
}

// API 파일
export interface ExistingFileItem {
    id: number,
    name: string,
    isNew: false;
}

// 신규 업로드 첨부파일
export interface NewFileItem  {
    id: number;
    file?: File;
    name: string;
    isNew: boolean;
}

export type FileItem = ExistingFileItem | NewFileItem;
